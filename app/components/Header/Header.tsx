"use client";
import { useReducer } from "react";
import { init, reducer } from "./Header.reducer";
import { useDismiss, useFloating, useInteractions } from "@floating-ui/react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "../../../i18n/navigation";
import { useTheme } from "next-themes";

function Header() {
    const [state, dispatch] = useReducer(reducer, init);
    const { theme, resolvedTheme, setTheme } = useTheme();
    const locale = useLocale();
    const pathname = usePathname();
    const router = useRouter();
    const t = useTranslations("header");
    const menuFloating = useFloating({
        open: state.isMenuOpen,
        onOpenChange: handleIsMenuOpenChange,
        placement: "bottom"
    });

    const menuInteraction = useInteractions([useDismiss(menuFloating.context)]);


    function handleIsMenuOpenChange(value: boolean) {
        dispatch({ type: "changeIsMenuOpen", payload: value });
    }

    function handleMenuToggleClick() {
        dispatch({ type: "changeIsMenuOpen", payload: !state.isMenuOpen });
    }

    function handleChangeLocaleClick() {
        const nextLocale = locale === "zh" ? "en" : "zh";
        router.replace(pathname, { locale: nextLocale });
    }

    function handleChangeThemeClick() {
        if (theme === resolvedTheme) {
            setTheme("system");
        } else if (resolvedTheme === "light") {
            setTheme("dark");
        } else if (resolvedTheme === "dark") {
            setTheme("light");
        }
    }

    function menuClass(href: string) {
        const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);
        const result = isActive ? "px-4 py-1.5 rounded-full bg-primary text-primary-foreground" : "px-4 py-1.5 rounded-full text-secondary-foreground transition-colors hover:bg-muted hover:text-foreground";
        return result;
    }

    return (
        <>
            <header ref={menuFloating.refs.setReference} {...menuInteraction.getReferenceProps()} className="h-16 bg-secondary border-b border-border flex flex-row items-center justify-center">
                <div className="grow max-w-6xl grid grid-cols-[auto_1fr_auto] items-center justify-items-center">
                    <div className="col-start-1 row-start-1 flex flex-row items-center gap-2 pl-8">
                        <svg viewBox="0 0 14 14" className="w-8 h-8 text-primary">
                            <use href="/icons.svg#maple" fill="currentColor" />
                        </svg>
                        <h1 className="text-lg font-bold text-primary">{t("title")}</h1>
                    </div>
                    <div className="col-start-1 col-span-3 row-start-1 flex flex-row items-center justify-center gap-3 max-[800px]:hidden">
                        <Link href="/" className={menuClass("/")}>{t("blog")}</Link>
                        <Link href="/gallery" className={menuClass("/gallery")}>{t("gallery")}</Link>
                        <Link href="/note" className={menuClass("/note")}>{t("notes")}</Link>
                        <Link href="/musing" className={menuClass("/musing")}>{t("musing")}</Link>
                    </div>
                    <div className="col-start-3 row-start-1 flex flex-row items-center justify-end gap-4 pr-8">
                        <button className="h-8 w-8 border border-border rounded-full text-muted-foreground flex flex-row justify-center items-center cursor-pointer hover:bg-background hover:text-foreground transition-colors" onClick={handleChangeThemeClick}>
                            <svg viewBox="0 0 32 32" className="w-5 h-5 dark:hidden">
                                <use href="/icons.svg#moon" fill="currentColor" />
                            </svg>
                            <svg viewBox="0 0 32 32" className="w-5 h-5 hidden dark:block">
                                <use href="/icons.svg#sun" fill="currentColor" />
                            </svg>
                        </button>
                        <button className="h-8 w-8 border border-border rounded-full text-muted-foreground flex flex-row justify-center items-center cursor-pointer hover:bg-background hover:text-foreground transition-colors" onClick={handleChangeLocaleClick}>
                            {locale === "zh" ? "EN" : "中"}
                        </button>
                        <button onClick={handleMenuToggleClick} className="h-8 w-8 border border-border rounded-full text-muted-foreground flex flex-row justify-center items-center cursor-pointer hover:bg-background hover:text-foreground transition-colors min-[800px]:hidden">
                            <svg viewBox="0 0 32 32" className="w-5 h-5">
                                <use href="/icons.svg#menu" fill="currentColor" />
                            </svg>
                        </button>
                    </div>
                </div>
            </header>
            {
                state.isMenuOpen &&
                <div ref={menuFloating.refs.setFloating} style={menuFloating.floatingStyles} {...menuInteraction.getFloatingProps()} className="w-full bg-secondary flex flex-col justify-start items-stretch gap-1 py-4 px-8 min-[800px]:hidden">
                    <Link href="/" onClick={() => handleIsMenuOpenChange(false)} className={menuClass("/")}>{t("home")}</Link>
                    <Link href="/blog" onClick={() => handleIsMenuOpenChange(false)} className={menuClass("/blog")}>{t("blog")}</Link>
                    <Link href="/gallery" onClick={() => handleIsMenuOpenChange(false)} className={menuClass("/gallery")}>{t("gallery")}</Link>
                    <Link href="/note" onClick={() => handleIsMenuOpenChange(false)} className={menuClass("/note")}>{t("notes")}</Link>
                    <Link href="/musing" onClick={() => handleIsMenuOpenChange(false)} className={menuClass("/musing")}>{t("musing")}</Link>
                </div>
            }
        </>
    )
}

export default Header;