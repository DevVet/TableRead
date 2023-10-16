import "@/styles/globals.css";
import theme from "@/theme";
import { MantineProvider } from "@mantine/core";
import { appWithTranslation, withTranslation } from "next-i18next";
import type { AppProps } from "next/app";
import nextI18NextConfig from "../../next-i18next.config";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <MantineProvider theme={theme}>
      <Component {...pageProps} />
    </MantineProvider>
  );
};

export default appWithTranslation(withTranslation()(App), nextI18NextConfig);
