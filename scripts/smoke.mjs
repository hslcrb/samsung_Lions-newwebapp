import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import path from "node:path";

// Optional browser tooling stays outside the app's runtime dependencies.
// SMOKE_BASE_URL defaults to the production server on port 3187.
// Set SMOKE_CHROMIUM_EXECUTABLE when using an existing Chromium installation.
// SMOKE_SCREENSHOT_DIR and SMOKE_REPORT optionally save review artifacts.
const require = createRequire(import.meta.url);
let chromium;
try {
  ({ chromium } = require("playwright"));
} catch {
  const runtimeModules = process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES;
  if (!runtimeModules) {
    throw new Error("Install Playwright as a local development tool or set CODEX_PRIMARY_RUNTIME_NODE_MODULES to a directory containing playwright.");
  }
  ({ chromium } = require(path.join(runtimeModules, "playwright")));
}

const baseURL = process.env.SMOKE_BASE_URL ?? "http://127.0.0.1:3187";
const screenshotDir = process.env.SMOKE_SCREENSHOT_DIR;
const routes = ["/", "/club", "/matches", "/players", "/history", "/community", "/shop", "/admin"];
const widths = [360, 390, 768, 1440];
const report = {
  startedAt: new Date().toISOString(),
  baseURL,
  routeChecks: [],
  scenarios: [],
  pageErrors: [],
  consoleErrors: [],
  failedRequests: [],
  disabledScriptRequests: [],
  externalRequests: [],
  screenshots: [],
};
const browser = await chromium.launch({
  headless: true,
  ...(process.env.SMOKE_CHROMIUM_EXECUTABLE ? { executablePath: process.env.SMOKE_CHROMIUM_EXECUTABLE } : {}),
  args: ["--no-sandbox"],
});
report.browser = browser.version();

function observePage(page, javaScriptEnabled = true) {
  page.on("pageerror", (error) => report.pageErrors.push({ url: page.url(), message: error.message }));
  page.on("console", (message) => {
    if (message.type() === "error") report.consoleErrors.push({ url: page.url(), message: message.text() });
  });
  page.on("response", (response) => {
    if (response.status() >= 400 && new URL(response.url()).origin === new URL(baseURL).origin) {
      report.failedRequests.push({ url: response.url(), status: response.status() });
    }
  });
  page.on("requestfailed", (request) => {
    const error = request.failure()?.errorText;
    // Chromium reports intentionally disabled scripts as CSP failures in no-JS contexts.
    if (!javaScriptEnabled && request.resourceType() === "script" && error === "csp") {
      report.disabledScriptRequests.push(request.url());
      return;
    }
    if (error !== "net::ERR_ABORTED") report.failedRequests.push({ url: request.url(), error });
  });
  page.on("request", (request) => {
    if (new URL(request.url()).origin !== new URL(baseURL).origin) report.externalRequests.push(request.url());
  });
}

async function newPage(options = {}) {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, ...options });
  const page = await context.newPage();
  observePage(page, options.javaScriptEnabled !== false);
  return { context, page };
}

async function visit(page, route) {
  const response = await page.goto(new URL(route, baseURL).href, { waitUntil: "networkidle" });
  assert.equal(response?.status(), 200, `${route} must return HTTP 200`);
  await page.evaluate(() => document.fonts.ready);
}

async function loadImages(page) {
  await page.evaluate(async () => {
    const root = document.documentElement;
    const originalScrollBehavior = root.style.scrollBehavior;
    root.style.scrollBehavior = "auto";
    for (let y = 0; y < root.scrollHeight; y += Math.max(400, innerHeight * 0.8)) {
      window.scrollTo(0, y);
      await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
    }
    window.scrollTo(0, 0);
    root.style.scrollBehavior = originalScrollBehavior;
  });
  await page.waitForFunction(() => [...document.images].every((image) => image.complete));
  await page.evaluate(() => document.fonts.ready);
}

async function scenario(name, run) {
  try {
    const details = await run();
    report.scenarios.push({ name, passed: true, ...(details ? { details } : {}) });
    console.log(`PASS ${name}`);
  } catch (error) {
    report.scenarios.push({ name, passed: false, error: error.message });
    console.error(`FAIL ${name}: ${error.message}`);
  }
}

async function screenshot(page, filename, fullPage = true) {
  if (!screenshotDir) return;
  await mkdir(screenshotDir, { recursive: true });
  const target = path.resolve(screenshotDir, filename);
  await page.screenshot({ path: target, fullPage, type: "jpeg", quality: 78, animations: "disabled" });
  report.screenshots.push(target);
}

async function waitForDetails(page) {
  await page.waitForFunction(() => {
    const panel = document.getElementById("selected-match");
    const bounds = panel.getBoundingClientRect();
    const headerBottom = document.querySelector(".site-header").getBoundingClientRect().bottom;
    return document.activeElement === panel && bounds.top >= headerBottom - 1 && bounds.bottom <= innerHeight;
  });
  return page.locator("#selected-match").evaluate((panel) => ({
    focused: document.activeElement === panel,
    top: Math.round(panel.getBoundingClientRect().top),
    bottom: Math.round(panel.getBoundingClientRect().bottom),
    viewportHeight: innerHeight,
  }));
}

try {
  const { context, page } = await newPage();
  const routeIDs = new Map();
  const internalLinks = new Set();
  for (const width of widths) {
    await page.setViewportSize({ width, height: width === 1440 ? 1000 : 844 });
    for (const route of routes) {
      await scenario(`route ${route} at ${width}px`, async () => {
        await visit(page, route);
        await loadImages(page);
        const state = await page.evaluate(() => ({
          title: document.title,
          h1Count: document.querySelectorAll("main h1").length,
          mainLength: document.querySelector("main")?.innerText.length ?? 0,
          scrollWidth: document.documentElement.scrollWidth,
          viewportWidth: innerWidth,
          brokenImages: [...document.images].filter((image) => !image.naturalWidth).map((image) => image.currentSrc || image.src),
          ids: [...document.querySelectorAll("[id]")].map((element) => element.id),
          links: [...document.querySelectorAll("a[href]")].map((anchor) => anchor.href).filter((href) => new URL(href).origin === location.origin),
        }));
        assert.ok(state.title.length > 0);
        assert.equal(state.h1Count, 1, "Each route has one main H1");
        assert.ok(state.mainLength > 200, "The route has substantive content");
        assert.ok(state.scrollWidth <= state.viewportWidth + 1, `Horizontal overflow: ${state.scrollWidth} > ${state.viewportWidth}`);
        assert.deepEqual(state.brokenImages, [], "Every image loads");
        routeIDs.set(route, new Set(state.ids));
        state.links.forEach((href) => internalLinks.add(href));
        report.routeChecks.push({ route, width, title: state.title, scrollWidth: state.scrollWidth, imagesLoaded: true });
        if (route === "/" && width === 1440) {
          await screenshot(page, "home-desktop.jpg");
          await screenshot(page, "home-desktop-hero.jpg", false);
        }
        if (route === "/" && width === 390) await screenshot(page, "home-mobile.jpg");
        if (route === "/matches" && width === 390) await screenshot(page, "matches-mobile.jpg");
        if (route === "/players" && width === 1440) await screenshot(page, "players-desktop.jpg");
      });
    }
  }

  await scenario("all internal links and fragment targets resolve", () => {
    for (const href of internalLinks) {
      const url = new URL(href);
      assert.ok(routeIDs.has(url.pathname), `Unverified internal route ${url.pathname}`);
      if (url.hash) assert.ok(routeIDs.get(url.pathname).has(decodeURIComponent(url.hash.slice(1))), `Missing fragment ${href}`);
    }
    return { uniqueInternalLinks: internalLinks.size };
  });

  await page.setViewportSize({ width: 390, height: 844 });
  await scenario("mobile menu traps focus and Escape restores focus and scrolling", async () => {
    await visit(page, "/");
    await page.getByRole("button", { name: "메뉴 열기" }).click();
    await page.waitForFunction(() => document.body.style.overflow === "hidden");
    assert.equal(await page.locator("dialog").evaluate((dialog) => dialog.open), true);
    let browserChromeTransitions = 0;
    for (let index = 0; index < 12; index += 1) {
      await page.keyboard.press("Tab");
      const focus = await page.evaluate(() => ({
        insideDialog: Boolean(document.activeElement.closest("dialog")),
        browserChrome: document.activeElement === document.body && !document.hasFocus(),
      }));
      // Native modal dialogs may include browser chrome in keyboard traversal.
      // The page background must never receive focus.
      assert.ok(focus.insideDialog || focus.browserChrome, "Tab must not reach a page element behind the dialog");
      if (focus.browserChrome) browserChromeTransitions += 1;
    }
    await page.keyboard.press("Escape");
    await page.waitForFunction(() => document.body.style.overflow !== "hidden");
    assert.equal(await page.locator("dialog").evaluate((dialog) => dialog.open), false);
    assert.equal(await page.evaluate(() => document.activeElement.getAttribute("aria-label")), "메뉴 열기");
    return { browserChromeTransitions };
  });

  await scenario("mobile route selection closes the menu and restores scrolling", async () => {
    await visit(page, "/");
    await page.getByRole("button", { name: "메뉴 열기" }).click();
    await page.locator('dialog a[href="/players"]').click();
    await page.waitForURL("**/players");
    await page.waitForFunction(() => document.body.style.overflow !== "hidden");
    assert.equal(await page.locator("dialog").evaluate((dialog) => dialog.open), false);
  });

  await scenario("player search accepts the displayed number #05 and Korean names", async () => {
    await visit(page, "/players");
    const search = page.getByRole("searchbox", { name: "이름 또는 등번호로 검색" });
    for (const query of ["#05", "05", "구자욱"]) {
      await search.fill(query);
      assert.equal(await page.locator(".fan-player-card").count(), 1, query);
      assert.match(await page.locator(".fan-player-card").innerText(), /구자욱/);
    }
    await search.fill("");
    await page.getByRole("button", { name: "투수", exact: true }).click();
    assert.equal(await page.locator(".fan-player-card").count(), 1);
    assert.match(await page.locator(".fan-player-card").innerText(), /원태인/);
    await search.fill("구자욱");
    assert.equal(await page.locator(".fan-player-card").count(), 0);
    await page.getByRole("button", { name: "검색 조건 초기화" }).click();
    assert.equal(await page.locator(".fan-player-card").count(), 4);
  });

  await scenario("calendar rolls into a new year and qualifies unknown-month empty states", async () => {
    await visit(page, "/matches");
    for (let index = 0; index < 3; index += 1) await page.getByRole("button", { name: "다음 달 보기", exact: true }).click();
    assert.match(await page.locator("#calendar-month").innerText(), /2027\.01/);
    assert.match(await page.locator(".schedule-month-empty").innerText(), /확인한 일정만/);
    await page.getByRole("button", { name: "이전 달 보기", exact: true }).click();
    assert.match(await page.locator("#calendar-month").innerText(), /2026\.12/);
    await page.getByRole("button", { name: "확인한 달", exact: true }).click();
    assert.match(await page.locator("#calendar-month").innerText(), /2026\.10/);
    assert.equal(await page.locator(".schedule-list-game").count(), 14);
  });

  await scenario("calendar home/away filters and day selection update the detail", async () => {
    await visit(page, "/matches");
    await page.getByRole("button", { name: "원정 경기", exact: true }).click();
    assert.equal(await page.locator(".schedule-list-game").count(), 5);
    assert.ok((await page.locator(".schedule-list-badge").allTextContents()).every((text) => text === "원정"));
    await page.getByRole("button", { name: "홈 경기", exact: true }).click();
    assert.equal(await page.locator(".schedule-list-game").count(), 9);
    await page.getByRole("button", { name: "전체 경기", exact: true }).click();
    await page.locator('.schedule-day[aria-label^="2026년 10월 28일"]').click();
    assert.match(await page.locator("#selected-match").innerText(), /10\. 28\./);
    assert.match(await page.locator("#selected-match").innerText(), /원정 경기/);
    await page.locator('.schedule-day[aria-label^="2026년 10월 23일"]').click();
    assert.match(await page.locator("#selected-match").innerText(), /경기 미편성을 뜻하지 않습니다/);
  });

  for (const motion of ["no-preference", "reduce"]) {
    await scenario(`October 31 list selection focuses visible detail (${motion})`, async () => {
      await page.emulateMedia({ reducedMotion: motion });
      await visit(page, "/matches");
      await page.locator(".schedule-list-game").last().click();
      await page.waitForFunction(() => document.getElementById("selected-match-title").textContent.includes("10. 31."));
      return waitForDetails(page);
    });
  }

  await scenario("informative metadata meets 4.5:1 contrast after review fixes", async () => {
    const checks = [];
    await page.setViewportSize({ width: 1440, height: 1000 });
    for (const [route, selectors] of [
      ["/matches", [".schedule-day-time", ".schedule-selected-date > span", ".schedule-selected-time > span:last-child", ".schedule-list-opponent small"]],
      ["/community", [".fan-channel-handle", ".fan-checklist-footer p"]],
    ]) {
      await visit(page, route);
      for (const selector of selectors) {
        const colors = await page.locator(selector).first().evaluate((element) => {
          const rgb = (color) => color.match(/[\d.]+/g).map(Number);
          const foreground = rgb(getComputedStyle(element).color).slice(0, 3);
          const ancestors = [];
          for (let current = element; current; current = current.parentElement) ancestors.unshift(current);
          let background = [255, 255, 255];
          for (const current of ancestors) {
            const color = rgb(getComputedStyle(current).backgroundColor);
            const alpha = color[3] ?? 1;
            background = background.map((channel, index) => color[index] * alpha + channel * (1 - alpha));
          }
          return { foreground, background };
        });
        const luminance = (channels) => channels.map((channel) => {
          const value = channel / 255;
          return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
        }).reduce((sum, value, index) => sum + value * [0.2126, 0.7152, 0.0722][index], 0);
        const [darker, lighter] = [luminance(colors.foreground), luminance(colors.background)].sort((a, b) => a - b);
        const ratio = (lighter + 0.05) / (darker + 0.05);
        assert.ok(ratio >= 4.5, `${selector}: ${ratio.toFixed(2)}:1`);
        checks.push({ selector, contrast: Number(ratio.toFixed(2)) });
      }
    }
    return checks;
  });

  await scenario("checklist recovers corrupt storage and persists valid checks", async () => {
    await visit(page, "/community");
    await page.evaluate(() => localStorage.setItem("lions-game-day-checklist-v1", "not valid JSON"));
    await page.reload({ waitUntil: "networkidle" });
    assert.equal(await page.getByRole("checkbox").count(), 6);
    assert.equal(await page.locator('input[type="checkbox"]:checked').count(), 0);
    await page.getByRole("checkbox").first().check();
    await page.reload({ waitUntil: "networkidle" });
    assert.equal(await page.getByRole("checkbox").first().isChecked(), true);
    await page.getByRole("button", { name: "다시 준비하기" }).click();
    assert.equal(await page.locator('input[type="checkbox"]:checked').count(), 0);
  });

  await scenario("checklist still works when browser storage is denied", async () => {
    const { context: deniedContext, page: deniedPage } = await newPage();
    try {
      await deniedContext.addInitScript(() => Object.defineProperty(window, "localStorage", {
        get() { throw new DOMException("Storage denied by smoke test", "SecurityError"); },
      }));
      await visit(deniedPage, "/community");
      await deniedPage.getByRole("checkbox").first().check();
      assert.equal(await deniedPage.getByRole("checkbox").first().isChecked(), true);
      assert.match(await deniedPage.locator(".fan-checklist-progress").innerText(), /01/);
      await deniedPage.getByRole("button", { name: "다시 준비하기" }).click();
      assert.equal(await deniedPage.getByRole("checkbox").first().isChecked(), false);
    } finally {
      await deniedContext.close();
    }
  });

  await scenario("history deep link clears the sticky header and details expand", async () => {
    await page.setViewportSize({ width: 390, height: 844 });
    await visit(page, "/history#season-2014");
    await page.waitForFunction(() => {
      const bounds = document.getElementById("season-2014").getBoundingClientRect();
      return bounds.top >= 71 && bounds.top < 200;
    });
    await page.locator("#season-2014 summary").click();
    assert.equal(await page.locator("#season-2014 details").getAttribute("open"), "");
    assert.match(await page.locator("#season-2014 p").innerText(), /통합 4연패/);
  });

  await scenario("home remains readable and navigable without JavaScript", async () => {
    const { context: noJSContext, page: noJSPage } = await newPage({ javaScriptEnabled: false });
    try {
      // Do not await page animation callbacks when script execution is disabled.
      const response = await noJSPage.goto(new URL("/", baseURL).href, { waitUntil: "networkidle" });
      assert.equal(response?.status(), 200);
      const state = await noJSPage.evaluate(() => ({
        fonts: document.fonts.status,
        title: document.querySelector("main h1").innerText,
        sections: document.querySelectorAll("main section").length,
        iframes: document.querySelectorAll("iframe").length,
        footerLinks: [...document.querySelectorAll(".site-footer a")].filter((link) => link.getClientRects().length).length,
        hiddenSections: [...document.querySelectorAll("main section")].filter((section) => getComputedStyle(section).opacity === "0" || getComputedStyle(section).visibility === "hidden").length,
      }));
      assert.match(state.title, /BLUE IS/);
      assert.equal(state.fonts, "loaded");
      assert.equal(state.sections, 6);
      assert.equal(state.iframes, 0);
      assert.equal(state.hiddenSections, 0);
      assert.ok(state.footerLinks >= 6);
      await noJSPage.locator('.site-footer a[href="/players"]').click();
      await noJSPage.waitForURL("**/players");
      assert.equal(await noJSPage.locator(".fan-player-card").count(), 4);
      return state;
    } finally {
      await noJSContext.close();
    }
  });

  await scenario("reduced-motion home disables smooth scrolling and long animation", async () => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await visit(page, "/");
    const state = await page.locator(".hero-title").evaluate((title) => ({
      animationSeconds: parseFloat(getComputedStyle(title).animationDuration),
      scrollBehavior: getComputedStyle(document.documentElement).scrollBehavior,
      iframes: document.querySelectorAll("iframe").length,
    }));
    assert.ok(state.animationSeconds < 0.001);
    assert.equal(state.scrollBehavior, "auto");
    assert.equal(state.iframes, 0);
    return state;
  });

  await scenario("admin is a read-only guide without a fake save form", async () => {
    await visit(page, "/admin");
    assert.match(await page.locator("main").innerText(), /이 화면에서는 내용을 수정하거나 저장하지 않습니다/);
    assert.equal(await page.locator("main form, main input, main textarea, main button").count(), 0);
    assert.match(await page.locator('meta[name="robots"]').getAttribute("content"), /noindex/);
  });
  await context.close();

  await scenario("browser has no runtime, console, or local resource failures", () => {
    assert.deepEqual(report.pageErrors, []);
    assert.deepEqual(report.consoleErrors, []);
    assert.deepEqual(report.failedRequests, []);
    assert.deepEqual([...new Set(report.externalRequests)], [], "Initial pages should not request external resources");
  });
} finally {
  await browser.close();
  report.finishedAt = new Date().toISOString();
  report.passed = report.scenarios.filter((result) => result.passed).length;
  report.failed = report.scenarios.filter((result) => !result.passed).length;
  if (process.env.SMOKE_REPORT) {
    const target = path.resolve(process.env.SMOKE_REPORT);
    await mkdir(path.dirname(target), { recursive: true });
    await writeFile(target, `${JSON.stringify(report, null, 2)}\n`);
  }
  console.log(JSON.stringify({ passed: report.passed, failed: report.failed, routeChecks: report.routeChecks.length, screenshots: report.screenshots, pageErrors: report.pageErrors.length, consoleErrors: report.consoleErrors.length, resourceFailures: report.failedRequests.length, intentionallyDisabledScriptRequests: report.disabledScriptRequests.length, externalRequests: new Set(report.externalRequests).size }, null, 2));
  if (report.failed) process.exitCode = 1;
}
