"use client";

import theme from "@/theme";
import { I18nProviderClient } from "@/utils/i18n/client";
// import getQueryClient from "@/utils/getQueryClient";
import { MantineProvider } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React, { useRef } from "react";

const GlobalContextProvider = ({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale: string;
}) => {
  const { current: client } = useRef(new QueryClient());
  return (
    <I18nProviderClient locale={locale}>
      <MantineProvider theme={theme}>
        <QueryClientProvider client={client}>
          {children}
          {process.env.NODE_ENV !== "production" && (
            <ReactQueryDevtools initialIsOpen={false} />
          )}
        </QueryClientProvider>
      </MantineProvider>
    </I18nProviderClient>
  );
};

export default GlobalContextProvider;
