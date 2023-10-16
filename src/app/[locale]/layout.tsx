import GlobalContextProvider from "@/contexts/GlobalContextProvider";
import { ColorSchemeScript } from "@mantine/core";
import { ReactElement } from "react";

const SubLayout = ({
  params: { locale },
  children,
}: {
  params: { locale: string };
  children: ReactElement;
}) => {
  return (
    <html lang={locale}>
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

export default SubLayout;
