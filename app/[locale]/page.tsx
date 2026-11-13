import { getTranslations } from "next-intl/server";
import { Link } from "../../i18n/navigation";

export default async function HomePage() {
  const t = await getTranslations("home");

  return (
    <>
      <section aria-labelledby="home-title" className="flex min-h-[calc(100svh-4rem)] items-center bg-linear-to-br from-background via-secondary/40 to-background px-6 py-10 sm:px-10 sm:py-12">
        <div className="mx-auto w-full max-w-6xl">
          <p className="mb-5 flex items-center gap-3 text-xs font-semibold tracking-[0.3em] text-primary sm:mb-7 sm:text-sm">
            <span className="h-px w-8 bg-primary" />
            {t("eyebrow")}
          </p>

          <h1 id="home-title" className="max-w-4xl text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-6xl lg:text-7xl">
            {t("title")}
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-muted-foreground sm:mt-5 sm:text-base sm:leading-7">
            {t("description")}
          </p>

          <blockquote className="mt-6 border-l-2 border-accent pl-5 text-sm leading-6 text-secondary-foreground sm:mt-8 sm:text-base sm:leading-7">
            <p>“{t("motto")}”</p>
            <cite className="mt-1 block text-xs not-italic tracking-wider text-muted-foreground">
              {t("attribution")}
            </cite>
          </blockquote>

          <nav aria-label={t("navigation")} className="mt-6 flex gap-3 sm:mt-8 sm:gap-4">
            <Link
              href="/blog"
              className="group flex min-h-14 flex-1 items-center justify-between gap-3 rounded-full bg-primary px-5 py-3 font-medium text-primary-foreground transition-transform hover:-translate-y-0.5 sm:min-w-56 sm:flex-none sm:gap-10 sm:px-7 sm:py-4"
            >
              <span>{t("blog")}</span>
              <span aria-hidden="true" className="text-xl transition-transform group-hover:translate-x-1">↗</span>
            </Link>
            <Link
              href="/gallery"
              className="group flex min-h-14 flex-1 items-center justify-between gap-3 rounded-full border border-border bg-background/70 px-5 py-3 font-medium text-foreground transition-colors hover:border-primary hover:text-primary sm:min-w-56 sm:flex-none sm:gap-10 sm:px-7 sm:py-4"
            >
              <span>{t("gallery")}</span>
              <span aria-hidden="true" className="text-xl transition-transform group-hover:translate-x-1">↗</span>
            </Link>
          </nav>
        </div>
      </section>

      <section aria-labelledby="recent-updates-title" className="px-6 py-16 sm:px-10 sm:py-24">
        <div className="mx-auto w-full max-w-6xl">
          <div className="mb-8 flex flex-col gap-3 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-3 flex items-center gap-3 text-xs font-semibold tracking-[0.3em] text-primary sm:text-sm">
                <span className="h-px w-8 bg-primary" />
                {t("updates.eyebrow")}
              </p>
              <h2 id="recent-updates-title" className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                {t("updates.title")}
              </h2>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <article className="flex min-h-64 flex-col rounded-3xl border border-border bg-secondary/35 p-6 sm:p-7">
              <div className="flex items-center justify-between gap-3 text-xs font-medium">
                <span className="rounded-full bg-background px-3 py-1.5 text-primary">{t("updates.first.category")}</span>
                <time dateTime="2026-11-12" className="text-muted-foreground">{t("updates.first.date")}</time>
              </div>
              <h3 className="mt-7 text-xl font-semibold leading-snug text-foreground">{t("updates.first.title")}</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{t("updates.first.description")}</p>
            </article>

            <article className="flex min-h-64 flex-col rounded-3xl border border-border bg-background p-6 sm:p-7">
              <div className="flex items-center justify-between gap-3 text-xs font-medium">
                <span className="rounded-full bg-secondary/60 px-3 py-1.5 text-secondary-foreground">{t("updates.second.category")}</span>
                <time dateTime="2026-11-09" className="text-muted-foreground">{t("updates.second.date")}</time>
              </div>
              <h3 className="mt-7 text-xl font-semibold leading-snug text-foreground">{t("updates.second.title")}</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{t("updates.second.description")}</p>
            </article>

            <article className="flex min-h-64 flex-col rounded-3xl border border-border bg-linear-to-br from-accent/15 to-secondary/40 p-6 sm:p-7">
              <div className="flex items-center justify-between gap-3 text-xs font-medium">
                <span className="rounded-full bg-background/80 px-3 py-1.5 text-primary">{t("updates.third.category")}</span>
                <time dateTime="2026-11-04" className="text-muted-foreground">{t("updates.third.date")}</time>
              </div>
              <h3 className="mt-7 text-xl font-semibold leading-snug text-foreground">{t("updates.third.title")}</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{t("updates.third.description")}</p>
            </article>

            <article className="flex min-h-64 flex-col rounded-3xl border border-border bg-secondary/35 p-6 sm:p-7">
              <div className="flex items-center justify-between gap-3 text-xs font-medium">
                <span className="rounded-full bg-background px-3 py-1.5 text-primary">{t("updates.fourth.category")}</span>
                <time dateTime="2026-11-01" className="text-muted-foreground">{t("updates.fourth.date")}</time>
              </div>
              <h3 className="mt-7 text-xl font-semibold leading-snug text-foreground">{t("updates.fourth.title")}</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{t("updates.fourth.description")}</p>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
