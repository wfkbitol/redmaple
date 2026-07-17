"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { addLocalePrefix, localeFromPath } from "@/lib/locale";
import { locales, getTranslation, normalizeLocale, type Locale } from "@/lib/i18n";
import { MapleLeaf, SunIcon, MoonIcon } from "@/components/icons";

const NAV_HEIGHT = 64;

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const locale = useMemo(() => localeFromPath(pathname ?? "/"), [pathname]);
  const translation = useMemo(() => getTranslation(locale), [locale]);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("redmaple-theme") as "dark" | "light" | null;
    const nextTheme = savedTheme ?? "dark";
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reading initial theme from localStorage on mount
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;

    const savedLocale = window.localStorage.getItem("redmaple-locale");
    const nextLocale = normalizeLocale(savedLocale ?? locale);

    const isEnglishPath = pathname?.startsWith("/en");
    if (!isEnglishPath && nextLocale === "en") {
      router.replace(addLocalePrefix(pathname ?? "/", "en"));
    }

    setMounted(true);
  }, [locale, pathname, router]);

  useEffect(() => {
    document.documentElement.lang = locale === "en" ? "en" : "zh-CN";
  }, [locale]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const switchTheme = useCallback((nextTheme: "dark" | "light") => {
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem("redmaple-theme", nextTheme);
  }, []);

  const switchLocale = useCallback((nextLocale: Locale) => {
    window.localStorage.setItem("redmaple-locale", nextLocale);
    router.push(addLocalePrefix(pathname ?? "/", nextLocale));
  }, [pathname, router]);

  return (
    <div className="min-h-screen flex flex-col text-[var(--color-fg-primary)]" style={{ background: "var(--color-bg-base)" }}>
      {/* Falling leaves */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
        {Array.from({ length: 9 }).map((_, i) => (
          <span key={i} className="falling-leaf" style={{ opacity: 0.12 + (i % 3) * 0.06 }}>
            <MapleLeaf size={20 + (i % 3) * 8} />
          </span>
        ))}
      </div>

      {/* Header */}
      <header
        className="sticky top-0 z-50 transition-all duration-300"
        style={{
          height: NAV_HEIGHT,
          background: scrolled ? "var(--color-bg-raised)" : "transparent",
          borderBottom: scrolled ? "1px solid var(--color-border-subtle)" : "1px solid transparent",
        }}
      >
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6 sm:px-10 lg:px-16">
          {/* Logo */}
          <Link href={addLocalePrefix("/", locale)} className="flex items-center gap-2.5 group">
            <span className="transition-transform duration-300 group-hover:rotate-12" style={{ color: "var(--color-accent)" }}>
              <MapleLeaf size={24} />
            </span>
            <span className="text-lg font-bold tracking-[0.15em]" style={{ color: "var(--color-accent)" }}>
              RED MAPLE
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {translation.navItems.map((item) => {
              const href = addLocalePrefix(item.href, locale);
              const isActive = pathname === href;
              return (
                <Link
                  key={item.href}
                  href={href}
                  className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-[var(--color-accent-muted)] text-[var(--color-accent)]"
                      : "text-[var(--color-fg-secondary)] hover:text-[var(--color-fg-primary)] hover:bg-[var(--color-bg-overlay)]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right controls */}
          <div className="flex items-center gap-2">
            {/* Locale toggle */}
            <div className="hidden sm:flex rounded-full border p-0.5" style={{ borderColor: "var(--color-border-subtle)", background: "var(--color-bg-overlay)" }}>
              {locales.map((loc) => {
                const active = loc === locale;
                return (
                  <button
                    key={loc}
                    onClick={() => switchLocale(loc)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                      active
                        ? "bg-[var(--color-accent)] text-white"
                        : "text-[var(--color-fg-tertiary)] hover:text-[var(--color-fg-primary)]"
                    }`}
                  >
                    {translation.localeLabels[loc]}
                  </button>
                );
              })}
            </div>

            {/* Theme toggle — flat SVG icons */}
            <button
              onClick={() => switchTheme(theme === "dark" ? "light" : "dark")}
              className="w-9 h-9 flex items-center justify-center rounded-full border transition-all duration-200 hover:bg-[var(--color-bg-overlay)]"
              style={{ borderColor: "var(--color-border-subtle)", color: "var(--color-fg-secondary)" }}
              aria-label={translation.themeButton[theme === "dark" ? "light" : "dark"]}
              title={translation.themeButton[theme === "dark" ? "light" : "dark"]}
            >
              {mounted ? (
                theme === "dark" ? <SunIcon size={18} /> : <MoonIcon size={18} />
              ) : (
                <span className="w-4 h-4 rounded-full" style={{ background: "var(--color-border-strong)" }} />
              )}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5 rounded-full border transition-all duration-200 hover:bg-[var(--color-bg-overlay)]"
              style={{ borderColor: "var(--color-border-subtle)" }}
              aria-label="Menu"
            >
              <span className={`block w-4 h-px transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[3px]" : ""}`} style={{ background: "var(--color-fg-primary)" }} />
              <span className={`block w-4 h-px transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} style={{ background: "var(--color-fg-primary)" }} />
              <span className={`block w-4 h-px transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[3px]" : ""}`} style={{ background: "var(--color-fg-primary)" }} />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`md:hidden absolute top-full left-0 right-0 border-b transition-all duration-300 overflow-hidden`}
          style={{
            background: "var(--color-bg-raised)",
            borderColor: "var(--color-border-subtle)",
            maxHeight: menuOpen ? "400px" : "0",
            opacity: menuOpen ? 1 : 0,
          }}
        >
          <nav className="flex flex-col p-4 gap-1">
            {translation.navItems.map((item) => {
              const href = addLocalePrefix(item.href, locale);
              const isActive = pathname === href;
              return (
                <Link
                  key={item.href}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-[var(--color-accent-muted)] text-[var(--color-accent)]"
                      : "text-[var(--color-fg-secondary)] hover:text-[var(--color-fg-primary)]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <div className="flex gap-1 mt-3 px-4">
              {locales.map((loc) => {
                const active = loc === locale;
                return (
                  <button
                    key={loc}
                    onClick={() => { switchLocale(loc); setMenuOpen(false); }}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      active
                        ? "bg-[var(--color-accent)] text-white"
                        : "text-[var(--color-fg-tertiary)] hover:text-[var(--color-fg-primary)]"
                    }`}
                  >
                    {translation.localeLabels[loc]}
                  </button>
                );
              })}
            </div>
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 relative" style={{ zIndex: 1 }}>
        {children}
      </main>

      {/* Footer */}
      <footer
        className="relative mt-20 border-t"
        style={{ borderColor: "var(--color-border-subtle)", background: "var(--color-bg-raised)", zIndex: 1 }}
      >
        <div className="mx-auto max-w-7xl px-6 py-12 sm:px-10 lg:px-16">
          <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
            <Link href={addLocalePrefix("/", locale)} className="flex items-center gap-2 group">
              <span className="transition-transform duration-300 group-hover:rotate-12" style={{ color: "var(--color-accent)" }}>
                <MapleLeaf size={20} />
              </span>
              <span className="text-sm font-semibold tracking-[0.12em]" style={{ color: "var(--color-accent)" }}>
                RED MAPLE
              </span>
            </Link>
            <div className="flex items-center gap-6">
              {translation.navItems.map((item) => (
                <Link
                  key={item.href}
                  href={addLocalePrefix(item.href, locale)}
                  className="text-sm transition-colors duration-200"
                  style={{ color: "var(--color-fg-tertiary)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-fg-primary)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-fg-tertiary)")}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="mt-8 pt-6 border-t text-center text-xs" style={{ borderColor: "var(--color-border-subtle)", color: "var(--color-fg-tertiary)" }}>
            <p>© {new Date().getFullYear()} RED MAPLE. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
