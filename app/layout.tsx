import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/Header/Header";


export const metadata: Metadata = {
  title: "RED MAPLE",
  description: "BlueRocks' sweet home",
};


export default function RootLayout({ children }: LayoutProps<"/">) {

  return (
    <html lang="en" className="h-full antialiased">
      <body className="bg-background text-foreground">
        <Header/>
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
