import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "Red Maple",
  description: "Red Maple",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh" className="h-full antialiased" suppressHydrationWarning>
      <head>
        <Script
          id="theme-initializer"
          src="/theme.js"
          strategy="beforeInteractive"
        />
      </head>
      <body className="bg-background text-foreground">{children}</body>
    </html>
  );
}