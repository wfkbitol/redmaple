import { useTranslations } from "next-intl";
import Image from "next/image";

export default function Home() {
  const t = useTranslations("home");
  return (
    <h1 className="">{t("navs.blog")}</h1>
  );
}
