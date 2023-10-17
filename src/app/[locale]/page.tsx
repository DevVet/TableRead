/* eslint-disable react-hooks/rules-of-hooks */
import { apiHello } from "@/utils/api/services";
import { Metadata, NextPage } from "next";
import { useTranslation } from "../i18n";
import LandingPage from "./LandingPage";

interface Props {
  params: { locale: string };
}

export const generateMetadata = async ({
  params: { locale },
}: Props): Promise<Metadata> => {
  const { t } = await useTranslation(locale);
  return { title: t("title") };
};

const IndexPage: NextPage<Props> = async ({ params: { locale } }) => {
  const { t } = await useTranslation(locale, "common");

  // This is fetched on the server and passes the data to the client component
  const { data } = await apiHello<{ name: string }>({});
  return (
    <>
      <h1>{t("hello")}</h1>
      <LandingPage nameFromSSR={data.name} />
    </>
  );
};

export default IndexPage;
