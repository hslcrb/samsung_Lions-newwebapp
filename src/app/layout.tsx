import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SAMSUNG LIONS | NEW WEB APP",
  description: "대구의 자부심, 삼성 라이온즈 공식 웹사이트",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
