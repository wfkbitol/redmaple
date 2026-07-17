import { getContentItems } from "@/lib/content";
import { getTranslation, type Locale } from "@/lib/i18n";
import { ContentList } from "@/components/content-list";
import { PenIcon, NoteIcon, ChatIcon } from "@/components/icons";

const sectionConfig = {
  blog: { Icon: PenIcon, color: "var(--color-accent)", key: "blogPage" as const },
  notes: { Icon: NoteIcon, color: "var(--color-amber)", key: "notesPage" as const },
  musings: { Icon: ChatIcon, color: "var(--color-accent-soft)", key: "musingsPage" as const },
};

function SectionPageServer({
  locale,
  basePath,
  section,
}: {
  locale: Locale;
  basePath: string;
  section: "blog" | "notes" | "musings";
}) {
  const items = getContentItems(section, locale);
  const translation = getTranslation(locale);
  const config = sectionConfig[section];
  const pageMeta = translation[config.key];
  const { Icon } = config;

  return (
    <div className="relative min-h-screen">
      <div className="relative mx-auto max-w-6xl px-6 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-24">
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 mb-3">
            <span style={{ color: "var(--color-accent)" }}>
              <Icon size={20} />
            </span>
            <span className="text-sm font-medium tracking-[0.12em] uppercase" style={{ color: "var(--color-accent)" }}>
              {section}
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight" style={{ color: "var(--color-fg-primary)" }}>
            {pageMeta.title}
          </h1>
          <p className="mt-4 text-lg leading-relaxed" style={{ color: "var(--color-fg-secondary)" }}>
            {pageMeta.description}
          </p>
        </div>

        <ContentList
          items={items}
          basePath={basePath}
          placeholder={translation.contentList.searchPlaceholder}
          allLabel={translation.contentList.allLabel}
        />
      </div>
    </div>
  );
}

export default function BlogPageServer({ locale, basePath }: { locale: Locale; basePath: string }) {
  return <SectionPageServer locale={locale} basePath={basePath} section="blog" />;
}
