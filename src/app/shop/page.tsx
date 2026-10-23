import type { Metadata } from "next";
import Image from "next/image";
import { OFFICIAL, VERIFIED_DATE } from "@/data/lions";

export const metadata: Metadata = {
  title: "스토어 · 일상까지 라이온즈",
  description:
    "삼성 라이온즈 공식 홈페이지가 안내하는 어센틱 스토어와 팀스토어. 유니폼부터 팬 굿즈까지 공식 판매처에서 만나보세요.",
};

export default function ShopPage() {
  return (
    <main id="main-content" className="subpage">
      <section className="page-intro">
        <div className="wrap fan-shop-intro">
          <div>
            <p className="eyebrow">WEAR YOUR PRIDE</p>
            <h1>야구장 밖에서도,<br />라이온즈.</h1>
            <p>같은 색을 입고, 같은 마음을 나누는 방법.<br />당신의 일상에 라이온즈를 더하세요.</p>
          </div>
          <p className="fan-shop-signature" aria-hidden="true">ALWAYS<br />BLUE.</p>
        </div>
      </section>

      <section className="wrap fan-section" aria-labelledby="store-title">
        <div className="fan-section-header">
          <div>
            <p className="eyebrow">OFFICIAL STORES</p>
            <h2 id="store-title" className="section-heading">우리의 블루를 만나는 곳</h2>
          </div>
          <p className="fan-store-intro">삼성 라이온즈 공식 홈페이지에서<br />연결하는 두 스토어를 소개합니다.</p>
        </div>

        <div className="fan-shop-grid">
          <article className="fan-store">
            <div className="fan-store-art fan-store-art-authentic" aria-hidden="true">
              <span className="fan-store-art-label">SAMSUNG LIONS / AUTHENTIC</span>
              <Image className="fan-store-logo" src="/logo.svg" width={260} height={196} alt="" />
              <span className="fan-store-wordmark">ON THE<br />FIELD.</span>
            </div>
            <div className="fan-store-copy">
              <p className="fan-store-kicker">01 / AUTHENTIC STORE</p>
              <h3>어센틱 스토어</h3>
              <p>응원하는 이름과 번호를 더 가까이.<br />유니폼과 팀 의류를 공식 어센틱 스토어에서 만나보세요.</p>
              <a className="button button-blue" href={OFFICIAL.authenticStore} target="_blank" rel="noopener noreferrer">
                어센틱 스토어 가기 <span aria-hidden="true">↗</span>
              </a>
            </div>
          </article>

          <article className="fan-store">
            <div className="fan-store-art fan-store-art-goods" aria-hidden="true">
              <span className="fan-store-art-label">SAMSUNG LIONS / TEAM STORE</span>
              <span className="fan-store-wordmark">IN YOUR<br />EVERYDAY.</span>
              <Image className="fan-store-logo" src="/logo.svg" width={180} height={135} alt="" />
            </div>
            <div className="fan-store-copy">
              <p className="fan-store-kicker">02 / LIONS TEAM STORE</p>
              <h3>라이온즈 팀스토어</h3>
              <p>직관의 설렘을 일상으로.<br />팬 굿즈와 응원 아이템을 공식 팀스토어에서 둘러보세요.</p>
              <a className="button button-blue" href={OFFICIAL.teamStore} target="_blank" rel="noopener noreferrer">
                팀스토어 가기 <span aria-hidden="true">↗</span>
              </a>
            </div>
          </article>
        </div>

        <aside className="fan-store-note" aria-labelledby="shopping-note-title">
          <div>
            <p className="eyebrow">BEFORE YOU SHOP</p>
            <h3 id="shopping-note-title">구매 전, 공식 판매처에서 확인하세요.</h3>
          </div>
          <p>버튼을 누르면 각 공식 스토어가 새 창으로 열립니다. 상품 구성·재고·가격과 배송·교환 안내는 판매처의 최신 정보를 기준으로 확인해 주세요. 주문과 결제는 이동한 스토어에서 진행됩니다.</p>
        </aside>
        <p className="fan-source">스토어 연결 출처: <a href={OFFICIAL.home} target="_blank" rel="noopener noreferrer">삼성 라이온즈 공식 홈페이지 <span aria-hidden="true">↗</span></a> · 확인 {VERIFIED_DATE}</p>
      </section>
    </main>
  );
}
