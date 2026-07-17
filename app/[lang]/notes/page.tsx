import { getContentItems } from "@/lib/content";
import { normalizeLocale, getTranslation, type Locale } from "@/lib/i18n";
import { SectionPage } from "@/components/locale-pages";

export async function generateStaticParams() {
  return [{ lang: "zh" }, { lang: "en" }];
}

export default async function LocaleNotesPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = normalizeLocale(lang) as Locale;
  const items = getContentItems("notes", locale);
  const translation = getTranslation(locale);

  return <SectionPage translation={translation} items={items} basePath="/notes" section="notes" locale={locale} />;
}
