import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import "./globals.css";
import "./home.css";
import "./fan-pages.css";
import "./matches.css";

export const metadata: Metadata = {
  title: { default: "SAMSUNG LIONS — BLUE IS OUR HOME", template: "%s | SAMSUNG LIONS FAN CONCEPT" },
  description: "우리의 봄, 여름, 가을은 파랗다. 삼성 라이온즈를 사랑하는 팬을 위한 독립 리디자인 프로젝트. 경기 일정, 선수, 우승의 역사와 라팍의 순간을 만나보세요.",
  icons: { icon: "/logo.svg" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body><a className="skip-link" href="#main-content">본문 바로가기</a><Header />{children}<Footer /></body>
    </html>
  );
}
