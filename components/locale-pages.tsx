import Link from "next/link";
import { ContentList } from "@/components/content-list";
import { addLocalePrefix } from "@/lib/locale";
import type { ComponentType } from "react";
import { MapleLeaf, PenIcon, NoteIcon, ChatIcon, ImageIcon, ArrowRightIcon } from "@/components/icons";
import type { ContentItem } from "@/lib/content";
import type { Locale, TranslationStrings } from "@/lib/i18n";

type SectionKey = "blog" | "notes" | "musings";

const sectionIconMap: Record<SectionKey, ComponentType<{ size?: number }>> = {
  blog: PenIcon,
  notes: NoteIcon,
  musings: ChatIcon,
};

const sectionColors: Record<SectionKey, string> = {
  blog: "var(--color-accent)",
  notes: "var(--color-amber)",
  musings: "var(--color-accent-soft)",
};

/* ═══════════════════════════ HomePage ═══════════════════════════ */

export function HomePage({
  translation,
  latestEntries,
  locale,
}: {
  translation: TranslationStrings;
  latestEntries: ContentItem[];
  locale: Locale;
}) {
  const localePrefix = addLocalePrefix("", locale);

  return (
    <div className="hero-section">
      {/* Background maple decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute opacity-[0.03]" style={{ left: "8%", top: "20%", transform: "rotate(-20deg) scale(2)", color: "var(--color-accent)" }}>
          <MapleLeaf size={180} />
        </div>
        <div className="absolute opacity-[0.02]" style={{ right: "5%", top: "55%", transform: "rotate(15deg) scale(1.5)", color: "var(--color-accent)" }}>
          <MapleLeaf size={160} />
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl px-6 pt-24 pb-16 sm:px-10 sm:pt-32 sm:pb-20 lg:px-16 lg:pt-40 lg:pb-28">
        {/* ─── Hero ─── */}
        <div className="max-w-3xl animate-fade-in-up">
          <div className="flex items-center gap-2 mb-6">
            <span style={{ color: "var(--color-accent)" }}>
              <MapleLeaf size={20} />
            </span>
            <span className="badge badge-accent">Red Maple Journal</span>
          </div>
          <h1 className="text-display gradient-text mb-6">
            {translation.home.tagline}
          </h1>
          <p className="text-lg sm:text-xl leading-relaxed max-w-2xl" style={{ color: "var(--color-fg-secondary)" }}>
            {translation.home.description}
          </p>
          <div className="flex flex-wrap gap-3 mt-8">
            <Link href={`${localePrefix}/blog`} className="btn-primary">
              {translation.home.buttons.blog}
              <ArrowRightIcon size={16} />
            </Link>
            <Link href={`${localePrefix}/gallery`} className="btn-secondary">
              {translation.home.buttons.gallery}
            </Link>
          </div>
        </div>

        {/* ─── Latest entries ─── */}
        <div className="mt-20 sm:mt-28 animate-fade-in-up delay-200">
          <div className="flex items-center gap-2 mb-8">
            <span style={{ color: "var(--color-accent)" }}>
              <MapleLeaf size={16} />
            </span>
            <p className="text-sm font-medium tracking-[0.12em] uppercase" style={{ color: "var(--color-accent)" }}>
              Latest Updates
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {latestEntries.slice(0, 4).map((entry, idx) => {
              const SectionIcon = sectionIconMap[entry.section as SectionKey] ?? PenIcon;
              return (
                <Link
                  key={entry.slug + entry.section}
                  href={`${localePrefix}/${entry.section}/${entry.slug}`}
                  className={`card p-6 flex flex-col gap-3 animate-fade-in-scale ${idx > 0 ? "delay-" + ((idx + 1) * 100) : ""}`}
                >
                  <span className="flex items-center gap-1.5 text-xs font-medium tracking-[0.1em] uppercase" style={{ color: sectionColors[entry.section as SectionKey] ?? "var(--color-accent)" }}>
                    <SectionIcon size={14} />
                    {entry.section}
                  </span>
                  <h3 className="text-base font-semibold leading-snug" style={{ color: "var(--color-fg-primary)" }}>
                    {entry.title}
                  </h3>
                  <p className="text-sm leading-relaxed line-clamp-2" style={{ color: "var(--color-fg-secondary)" }}>
                    {entry.description}
                  </p>
                  <div className="mt-auto pt-2 flex items-center gap-3 text-xs" style={{ color: "var(--color-fg-tertiary)" }}>
                    <span>{entry.date}</span>
                    <span>·</span>
                    <span>{entry.readTime}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* ─── Section cards ─── */}
        <div className="mt-20 sm:mt-28 animate-fade-in-up delay-300">
          <div className="flex items-center gap-2 mb-8">
            <span style={{ color: "var(--color-accent)" }}>
              <MapleLeaf size={16} />
            </span>
            <p className="text-sm font-medium tracking-[0.12em] uppercase" style={{ color: "var(--color-accent)" }}>
              Explore
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {translation.sectionCards.map((card, idx) => {
              const icons = [PenIcon, NoteIcon, ChatIcon, ImageIcon];
              const Icon = icons[idx % icons.length];
              return (
                <Link
                  key={card.title}
                  href={addLocalePrefix(card.href, locale)}
                  className="card p-6 flex flex-col gap-3 group"
                  style={{ animation: `fadeInScale 0.5s var(--ease-out-expo) ${0.4 + idx * 0.1}s both` }}
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "var(--color-bg-overlay)", color: "var(--color-accent)" }}>
                    <Icon size={20} />
                  </div>
                  <h2 className="text-lg font-semibold" style={{ color: "var(--color-fg-primary)" }}>
                    {card.title}
                  </h2>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--color-fg-secondary)" }}>
                    {card.description}
                  </p>
                  <span className="mt-auto pt-2 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all duration-300" style={{ color: "var(--color-accent)" }}>
                    {card.accent}
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      <ArrowRightIcon size={14} />
                    </span>
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════ SectionPage ═══════════════════════════ */

export function SectionPage({
  translation,
  items,
  basePath,
  section,
  locale,
}: {
  translation: TranslationStrings;
  items: ContentItem[];
  basePath: string;
  section: SectionKey;
  locale: Locale;
}) {
  const pageMeta = {
    blog: translation.blogPage,
    notes: translation.notesPage,
    musings: translation.musingsPage,
  }[section];

  const SectionIcon = sectionIconMap[section] ?? PenIcon;

  return (
    <div className="relative min-h-screen">
      <div className="relative mx-auto max-w-6xl px-6 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-24">
        <div className="max-w-3xl mb-12 animate-fade-in-up">
          <div className="flex items-center gap-2 mb-3">
            <span style={{ color: "var(--color-accent)" }}>
              <SectionIcon size={20} />
            </span>
            <span className="text-sm font-medium tracking-[0.12em] uppercase" style={{ color: "var(--color-accent)" }}>
              {section}
            </span>
          </div>
          <h1 className="text-display" style={{ fontSize: "clamp(2.25rem, 5vw, 3.5rem)" }}>
            {pageMeta.title}
          </h1>
          <p className="mt-4 text-lg leading-relaxed" style={{ color: "var(--color-fg-secondary)" }}>
            {pageMeta.description}
          </p>
        </div>

        <ContentList
          items={items}
          basePath={addLocalePrefix(basePath, locale)}
          placeholder={translation.contentList.searchPlaceholder}
          allLabel={translation.contentList.allLabel}
        />
      </div>
    </div>
  );
}

