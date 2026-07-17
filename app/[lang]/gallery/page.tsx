import { normalizeLocale, type Locale } from "@/lib/i18n";
import GalleryPageServer from "@/components/gallery-page-server";

export async function generateStaticParams() {
  return [{ lang: "zh" }, { lang: "en" }];
}

export default async function LocaleGalleryPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = normalizeLocale(lang) as Locale;

  return <GalleryPageServer locale={locale} />;
}
