import { notFound } from "next/navigation";
import { getContentBySlug, getContentItems, type ContentSection } from "@/lib/content";
import { getTranslation, normalizeLocale, type Locale } from "@/lib/i18n";
import { addLocalePrefix } from "@/lib/locale";
import { MarkdownContent } from "@/components/markdown-content";
import { MapleLeaf, ArrowLeftIcon } from "@/components/icons";
import Link from "next/link";

export async function generateStaticParams() {
  const locales: Locale[] = ["zh", "en"];
  return locales.flatMap((locale) => [
    ...getContentItems("blog", locale).map((item) => ({ lang: locale, section: "blog", slug: item.slug })),
    ...getContentItems("notes", locale).map((item) => ({ lang: locale, section: "notes", slug: item.slug })),
    ...getContentItems("musings", locale).map((item) => ({ lang: locale, section: "musings", slug: item.slug })),
  ]);
}

export default function ArticlePage({ params }: { params: Promise<{ lang: string; section: string; slug: string }> }) {
  return <ArticlePageContent params={params} />;
}

async function ArticlePageContent({ params }: { params: Promise<{ lang: string; section: string; slug: string }> }) {
  const { lang, section, slug } = await params;
  const locale = normalizeLocale(lang) as Locale;
  const content = getContentBySlug(section as ContentSection, slug, locale);

  if (!content) {
    notFound();
  }

  const translation = getTranslation(locale);
  const sectionLabel = translation.article.sectionLabels[section as ContentSection] ?? section;

  return (
    <div className="relative min-h-screen">
      <div className="relative mx-auto max-w-3xl px-6 py-12 sm:px-10 sm:py-16 lg:px-16 lg:py-20">
        {/* Back link */}
        <Link
          href={addLocalePrefix("/", locale)}
          className="inline-flex items-center gap-1.5 text-sm font-medium transition-all duration-200 hover:gap-2 mb-8"
          style={{ color: "var(--color-fg-tertiary)" }}
        >
          <ArrowLeftIcon size={16} /> {translation.article.backHome.replace("← ", "")}
        </Link>

        {/* Article header */}
        <header className="mb-12">
          <div className="flex flex-wrap items-center gap-2 mb-5">
            <span
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium"
              style={{ background: "var(--color-accent-muted)", color: "var(--color-accent)" }}
            >
              <MapleLeaf size={12} />
              {sectionLabel}
            </span>
            <span
              className="text-xs"
              style={{ color: "var(--color-fg-tertiary)" }}
            >
              {content.date}
            </span>
            <span
              className="text-xs"
              style={{ color: "var(--color-fg-tertiary)" }}
            >
              · {content.readTime}
            </span>
          </div>

          <h1
            className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight"
            style={{ color: "var(--color-fg-primary)" }}
          >
            {content.title}
          </h1>

          <p
            className="mt-4 text-lg leading-relaxed"
            style={{ color: "var(--color-fg-secondary)" }}
          >
            {content.description}
          </p>

          <div className="flex flex-wrap gap-1.5 mt-5">
            {content.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex rounded-full px-3 py-1 text-xs"
                style={{
                  border: "1px solid var(--color-border-subtle)",
                  color: "var(--color-fg-tertiary)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </header>

        {/* Article body */}
        <div className="rounded-[28px] p-8 sm:p-10 lg:p-12 card-glass">
          <div className="prose">
            <MarkdownContent content={content.content} />
          </div>
        </div>

        {/* Bottom decoration */}
        <div className="mt-16 text-center">
          <span className="inline-block opacity-20" style={{ color: "var(--color-accent)" }}>
            <MapleLeaf size={32} />
          </span>
        </div>
      </div>
    </div>
  );
}
