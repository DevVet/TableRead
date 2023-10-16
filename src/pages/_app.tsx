import "@/styles/globals.css";
import theme from "@/theme";
import { MantineProvider } from "@mantine/core";
import { appWithTranslation } from "next-i18next";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import nextI18NextConfig from "../../next-i18next.config";

const App = ({ Component, pageProps }: AppProps) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={theme}>
        <Component {...pageProps} />
      </MantineProvider>
    </QueryClientProvider>
  );
};

export default appWithTranslation(App, nextI18NextConfig);
