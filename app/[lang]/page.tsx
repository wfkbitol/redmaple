import { getContentItems } from "@/lib/content";
import { getTranslation, normalizeLocale, type Locale } from "@/lib/i18n";
import { HomePage } from "@/components/locale-pages";

export async function generateStaticParams() {
  return [{ lang: "zh" }, { lang: "en" }];
}

export default async function LocaleHomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = normalizeLocale(lang) as Locale;
  const latestEntries = [
    ...getContentItems("blog", locale).slice(0, 2),
    ...getContentItems("notes", locale).slice(0, 1),
    ...getContentItems("musings", locale).slice(0, 1),
  ].sort((a, b) => b.date.localeCompare(a.date));
  const translation = getTranslation(locale);

  return <HomePage locale={locale} latestEntries={latestEntries} translation={translation} />;
}
