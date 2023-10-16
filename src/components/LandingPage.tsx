"use client";

import { useScopedI18n } from "@/utils/i18n/client";
import { useQuery } from "@tanstack/react-query";
import { FC } from "react";

interface Props {
  nameFromSSR: string;
}

export const LandingPage: FC<Props> = ({ nameFromSSR }) => {
  // This fetch occurs on the client and uses the server data as initial data
  const { data } = useQuery({
    queryKey: ["ben", "winchester"],
    queryFn: async ({ queryKey: [first, last] }) => {
      const res = await fetch("/api/hello", {
        method: "POST",
        body: JSON.stringify({ first, last }),
      });
      return (await res.json()).name;
    },
    initialData: nameFromSSR,
  });

  const t = useScopedI18n("hello");
  return (
    <div>
      <h1>{nameFromSSR}</h1>
      <h2>{data || t("world")}</h2>
    </div>
  );
};
