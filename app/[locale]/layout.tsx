import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import "../globals.css";
import Header from "../components/Header/Header";
import { routing } from "../../i18n/routing";
import { getLocale } from "next-intl/server";

export const metadata: Metadata = {
  title: "RED MAPLE",
  description: "BlueRocks' sweet home",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({ children }: LayoutProps<"/[locale]">) {
  const locale = await getLocale();

  return (
    <html lang={locale} className="h-full antialiased">
      <body className="bg-background text-foreground">
        <NextIntlClientProvider>
          <Header />
          <main className="flex-1">{children}</main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
