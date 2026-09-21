import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import Header from "../components/Header/Header";
import { routing } from "../../i18n/routing";
import { getTranslations } from "next-intl/server";

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
  return (
    <NextIntlClientProvider>
      <Header />
      <main className="flex-1">{children}</main>
    </NextIntlClientProvider>
  );
}
