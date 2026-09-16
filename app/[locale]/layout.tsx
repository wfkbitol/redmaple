import type { Metadata } from "next";
import Script from "next/script";
import { NextIntlClientProvider } from "next-intl";
import "../globals.css";
import Header from "../components/Header/Header";
import { routing } from "../../i18n/routing";
import { getLocale, getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("app");

  return {
    title: t("title"),
    description: t("description"),
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({ children }: LayoutProps<"/[locale]">) {
  const locale = await getLocale();

  return (
    <html lang={locale} className="h-full antialiased" suppressHydrationWarning>
      <head>
        <Script id="theme-initializer" strategy="beforeInteractive">
          {`
            (() => {
              const theme = localStorage.getItem("theme");
              if (theme === "light" || theme === "dark") {
                document.documentElement.setAttribute("data-theme", theme);
              }
            })();
          `}
        </Script>
      </head>
      <body className="bg-background text-foreground">
        <NextIntlClientProvider>
          <Header />
          <main className="flex-1">{children}</main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
