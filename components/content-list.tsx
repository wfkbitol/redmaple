"use client";

import Link from "next/link";
import { useMemo, useState, type ComponentType } from "react";
import type { ContentItem } from "@/lib/content";
import { PenIcon, NoteIcon, ChatIcon, SearchIcon, ArrowRightIcon } from "@/components/icons";

const sectionIconMap: Record<string, ComponentType<{ size?: number }>> = {
  blog: PenIcon,
  notes: NoteIcon,
  musings: ChatIcon,
};

export function ContentList({
  items,
  basePath,
  placeholder,
  allLabel,
}: {
  items: ContentItem[];
  basePath: string;
  placeholder: string;
  allLabel: string;
}) {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const tags = useMemo(() => {
    const allTags = items.flatMap((item) => item.tags);
    return Array.from(new Set(allTags)).sort();
  }, [items]);

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesQuery = `${item.title} ${item.description} ${item.tags.join(" ")}`
        .toLowerCase()
        .includes(query.toLowerCase());
      const matchesTag = !activeTag || item.tags.includes(activeTag);
      return matchesQuery && matchesTag;
    });
  }, [activeTag, items, query]);

  return (
    <div className="space-y-8">
      {/* Search & Filter Bar */}
      <div
        className="rounded-2xl p-1"
        style={{
          background: "var(--color-bg-overlay)",
          border: "1px solid var(--color-border-subtle)",
        }}
      >
        <div className="p-4">
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: "var(--color-fg-tertiary)" }}>
              <SearchIcon size={16} />
            </span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={placeholder}
              className="w-full rounded-xl border-none bg-transparent py-3 pl-10 pr-4 text-sm outline-none placeholder:opacity-50"
              style={{
                color: "var(--color-fg-primary)",
                background: "var(--color-bg-base)",
              }}
            />
          </div>
          <div className="mt-3 flex flex-wrap gap-1.5">
            <button
              type="button"
              onClick={() => setActiveTag(null)}
              className="rounded-full px-3.5 py-1.5 text-xs font-medium transition-all duration-200"
              style={
                activeTag === null
                  ? { background: "var(--color-accent)", color: "white" }
                  : { background: "transparent", color: "var(--color-fg-tertiary)" }
              }
            >
              {allLabel}
            </button>
            {tags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setActiveTag(tag)}
                className="rounded-full px-3.5 py-1.5 text-xs font-medium transition-all duration-200"
                style={
                  activeTag === tag
                    ? { background: "var(--color-accent)", color: "white" }
                    : {
                        color: "var(--color-fg-tertiary)",
                        border: "1px solid var(--color-border-subtle)",
                      }
                }
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid gap-5">
        {filteredItems.map((item, idx) => {
          const SectionIcon = sectionIconMap[item.section] ?? NoteIcon;
          return (
            <Link
              key={item.slug}
              href={`${basePath}/${item.slug}`}
              className="card p-6 sm:p-8 group"
              style={{ animation: `fadeInUp 0.5s var(--ease-out-expo) ${idx * 0.06}s both` }}
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div className="flex-1 min-w-0">
                  {/* Meta row */}
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span
                      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium"
                      style={{
                        background: "var(--color-accent-muted)",
                        color: "var(--color-accent)",
                      }}
                    >
                      <SectionIcon size={12} />
                      {item.section}
                    </span>
                    {item.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex rounded-full px-2.5 py-0.5 text-xs"
                        style={{
                          border: "1px solid var(--color-border-subtle)",
                          color: "var(--color-fg-tertiary)",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                    {item.tags.length > 2 && (
                      <span className="text-xs" style={{ color: "var(--color-fg-tertiary)" }}>
                        +{item.tags.length - 2}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h2
                    className="text-xl sm:text-2xl font-semibold leading-snug mb-2 transition-colors duration-200"
                    style={{ color: "var(--color-fg-primary)" }}
                  >
                    {item.title}
                  </h2>

                  {/* Description */}
                  <p className="text-sm leading-relaxed line-clamp-2" style={{ color: "var(--color-fg-secondary)" }}>
                    {item.description}
                  </p>
                </div>

                {/* Date & time on the right */}
                <div
                  className="flex sm:flex-col items-center sm:items-end gap-2 sm:gap-1 text-xs shrink-0"
                  style={{ color: "var(--color-fg-tertiary)" }}
                >
                  <span>{item.date}</span>
                  <span className="hidden sm:inline">·</span>
                  <span>{item.readTime}</span>
                </div>
              </div>

              {/* Read more indicator */}
              <div className="mt-4 flex items-center gap-1.5">
                <span
                  className="text-sm font-medium transition-all duration-300 group-hover:gap-2"
                  style={{ color: "var(--color-accent)" }}
                >
                  Read more
                </span>
                <span className="transition-transform duration-300 group-hover:translate-x-1" style={{ color: "var(--color-accent)" }}>
                  <ArrowRightIcon size={14} />
                </span>
              </div>
            </Link>
          );
        })}

        {filteredItems.length === 0 && (
          <div className="text-center py-16" style={{ color: "var(--color-fg-tertiary)" }}>
            <p className="text-lg">No results found</p>
            <p className="text-sm mt-2">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
}
