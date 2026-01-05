import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import * as styles from "./index.module.scss";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";

const IndexPage: React.FC<PageProps> = () => {

    const [theme, setTheme] = React.useState<"light" | "dark">("light");

    const articleRef = React.useRef<HTMLDivElement | null>(null);
    const noteRef = React.useRef<HTMLDivElement | null>(null);
    const exampleRef = React.useRef<HTMLDivElement | null>(null);
    const miscRef = React.useRef<HTMLDivElement | null>(null);

    const { t, i18n } = useTranslation();

    React.useEffect(() => {
        if (typeof window !== "undefined") {
            const theme = window.localStorage.getItem("theme") || "light";
            const lang = window.localStorage.getItem("lang") || window.navigator.language.toLowerCase().startsWith("zh") ? "zh-cn" : "en-us";
            setTheme(theme as "light" | "dark");
        };
    }, []);


    React.useEffect(() => {
        document.body.setAttribute("data-theme", theme);
    }, [theme]);


    function toggleTheme() {
        setTheme(theme => theme === "light" ? "dark" : "light");
        if (typeof window !== "undefined") {
            window?.localStorage.setItem("theme", theme === "light" ? "dark" : "light");
        }
    }

    function toggleLang() {
        i18n.changeLanguage(i18n.language === "zh-CN" ? "en-US" : "zh-CN");
    }

    function scroll(element: HTMLDivElement | null, block: ScrollLogicalPosition) {
        if (element) {
            element.scrollIntoView({ behavior: "smooth", block: block });
        }
    }

    function scrollToArticle() {
        scroll(articleRef.current, "start");
    }

    function scrollToNote() {
        scroll(noteRef.current, "start");
    }

    function scrollToExample() {
        scroll(exampleRef.current, "start");
    }

    function scrollToMisc() {
        scroll(miscRef.current, "start");
    }



    return (
        <>
            <Helmet title="RED MAPLE" />
            <div className={styles["container"]}>
                <section className={styles["main"]}>
                    <div className={styles["header"]}>
                        <svg className={styles["title"]} viewBox="0 0 640 240">
                            <use href="/icons.svg#red-maple" />
                        </svg>
                        <nav className={styles["nav"]}>
                            <button onClick={scrollToArticle}>
                                <svg viewBox="0 0 512 512">
                                    <use href="/icons.svg#article" />
                                </svg>
                                {t("home_menu_blog")}
                            </button>
                            <button onClick={scrollToNote}>
                                <svg viewBox="0 0 512 512">
                                    <use href="/icons.svg#note" />
                                </svg>
                                {t("home_menu_note")}
                            </button>
                            <button onClick={scrollToExample}>
                                <svg viewBox="0 0 512 512">
                                    <use href="/icons.svg#example" />
                                </svg>
                                {t("home_menu_gallery")}
                            </button>
                            <button onClick={scrollToMisc}>
                                <svg viewBox="0 0 512 512">
                                    <use href="/icons.svg#misc" />
                                </svg>
                                {t("home_menu_misc")}
                            </button>
                        </nav>
                    </div>

                    <button className={styles["scrollIndicator"]} type="button" onClick={scrollToArticle}>
                        <svg viewBox="0 0 640 640">
                            <use href="/icons.svg#arrow-down" />
                        </svg>
                    </button>
                </section>
                <section className={styles["category"]} ref={articleRef}>
                    <header className={styles["categoryHeader"]}>
                        <svg viewBox="0 0 640 640">
                            <use href="/icons.svg#article" />
                        </svg>
                        <div>{t("home_menu_blog")}</div>
                    </header>
                    <button className={styles["scrollIndicator"]} type="button" onClick={scrollToNote}>
                        <svg viewBox="0 0 640 640">
                            <use href="/icons.svg#arrow-down" />
                        </svg>
                    </button>
                </section>
                <section className={styles["category"]} ref={noteRef}>
                    <header className={styles["categoryHeader"]}>
                        <svg viewBox="0 0 640 640">
                            <use href="/icons.svg#note" />
                        </svg>
                        <div>{t("home_menu_note")}</div>
                    </header>
                    <button className={styles["scrollIndicator"]} type="button" onClick={scrollToExample}>
                        <svg viewBox="0 0 640 640">
                            <use href="/icons.svg#arrow-down" />
                        </svg>
                    </button>
                </section>
                <section className={styles["category"]} ref={exampleRef}>
                    <header className={styles["categoryHeader"]}>
                        <svg viewBox="0 0 640 640">
                            <use href="/icons.svg#example" />
                        </svg>
                        <div>{t("home_menu_gallery")}</div>
                    </header>
                    <button className={styles["scrollIndicator"]} type="button" onClick={scrollToMisc}>
                        <svg viewBox="0 0 640 640">
                            <use href="/icons.svg#arrow-down" />
                        </svg>
                    </button>
                </section>
                <section className={styles["category"]} ref={miscRef}>
                    <header className={styles["categoryHeader"]}>
                        <svg viewBox="0 0 640 640">
                            <use href="/icons.svg#misc" />
                        </svg>
                        <div>{t("home_menu_misc")}</div>
                    </header>
                </section>
            </div>
            <button type="button" className={styles["btnTheme"]} onClick={toggleTheme}>
                <svg viewBox="0 0 1024 1024">
                    <use href={`/icons.svg#${theme === "dark" ? "dark-theme" : "light-theme"}`} />
                </svg>
            </button>
            <button type="button" className={styles["btnLang"]} onClick={toggleLang}>
                {i18n.language === "zh-CN" ? "中" : "EN"}
            </button>
        </>
    )
}

export default IndexPage

export const Head: HeadFC = () => <title>Home Page</title>
