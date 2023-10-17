"use client";

import { apiHello } from "@/utils/api/services";
import { useQuery } from "@tanstack/react-query";
import { FC } from "react";
import { useTranslation } from "../i18n/client";

interface Props {
  nameFromSSR: string;
}

const LandingPage: FC<Props> = ({ nameFromSSR }) => {
  const { t } = useTranslation("ComponentLandingPage");

  // This fetch occurs on the client and uses the server data as initial data
  const { data } = useQuery({
    queryKey: ["ben", "winchester"],
    queryFn: async ({ queryKey: [first, last] }) => {
      const { data } = await apiHello<{ name: string }>({
        method: "POST",
        payload: { first, last },
      });
      return data.name;
    },
    initialData: nameFromSSR,
  });

  return (
    <div>
      <h1>{nameFromSSR}</h1>
      <h2>{t("common:title") + t("description") + t("content")}</h2>
      {data && <p>{data}</p>}
    </div>
  );
};

export default LandingPage;
