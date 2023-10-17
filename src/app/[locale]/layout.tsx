import GlobalContextProvider from "@/contexts/GlobalContextProvider";
import { ColorSchemeScript } from "@mantine/core";
import { dir } from "i18next";
import { Metadata, ResolvingMetadata } from "next";
import { useTranslation } from "../i18n";
import { supportedLocales } from "../i18n/settings";

interface Props {
  params: { locale: string };
  searchParams: { [key: string]: string | string[] | undefined };
  children: React.ReactNode;
}

export async function generateStaticParams() {
  return supportedLocales.map((lng) => ({ lng }));
}

export const generateMetadata = async (
  { params: { locale }, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = await useTranslation(locale);
  return {
    title: t("title"),
    description: t("description"),
  };
};

const RootLayout = ({ params: { locale }, children }: Props) => {
  return (
    <html lang={locale} dir={dir(locale)}>
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <GlobalContextProvider locale={locale}>
          {children}
        </GlobalContextProvider>
      </body>
    </html>
  );
};

export default RootLayout;
