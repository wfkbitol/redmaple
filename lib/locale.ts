import { type Locale } from "@/lib/i18n";

export function localeFromPath(pathname: string): Locale {
  const firstSegment = pathname.split("/")[1];
  return firstSegment === "en" ? "en" : "zh";
}

export function addLocalePrefix(pathname: string, locale: Locale): string {
  const normalizedPath = pathname === "" ? "/" : pathname;
  const targetPrefix = locale === "en" ? "/en" : "/zh";

  if (normalizedPath === "/") {
    return targetPrefix;
  }

  const currentPrefix = normalizedPath.startsWith("/en") ? "/en" : normalizedPath.startsWith("/zh") ? "/zh" : null;
  if (currentPrefix) {
    if (currentPrefix === targetPrefix) {
      return normalizedPath;
    }

    return `${targetPrefix}${normalizedPath.slice(currentPrefix.length) || ""}`;
  }

  return `${targetPrefix}${normalizedPath}`;
}

