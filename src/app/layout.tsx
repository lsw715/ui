import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PayKKa收单运营平台",
  description: "PayKKa Card OPS — 网关退款订单列表",
  icons: {
    icon: "/seo/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
