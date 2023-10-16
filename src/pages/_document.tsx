import { ColorSchemeScript } from "@mantine/core";
import { DocumentType } from "next/dist/shared/lib/utils";
import { Head, Html, Main, NextScript } from "next/document";
import i18nextConfig from "../../next-i18next.config";

const Document: DocumentType = (props) => {
  const currentLocale =
    props.__NEXT_DATA__.locale || i18nextConfig.i18n.defaultLocale;

  return (
    <Html lang={currentLocale}>
      <Head>
        <ColorSchemeScript defaultColorScheme="auto" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
