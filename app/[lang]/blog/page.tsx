import BlogPageServer from "@/components/blog-page-server";
import { normalizeLocale, type Locale } from "@/lib/i18n";
import { addLocalePrefix } from "@/lib/locale";

export async function generateStaticParams() {
  return [{ lang: "zh" }, { lang: "en" }];
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = normalizeLocale(lang) as Locale;
  const basePath = addLocalePrefix("/blog", locale);
  return <BlogPageServer locale={locale} basePath={basePath} />;
}
