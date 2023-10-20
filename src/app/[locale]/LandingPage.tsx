"use client";

import { apiHello } from "@/utils/api/services";
import { useQuery } from "@tanstack/react-query";
import { signIn, signOut, useSession } from "next-auth/react";
import { FC } from "react";
import { useTranslation } from "../../i18n/client";

interface Props {
  nameFromSSR: string;
}

const LandingPage: FC<Props> = ({ nameFromSSR }) => {
  const { t } = useTranslation("ComponentLandingPage");
  const { data: sessionData, status } = useSession();

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

      {status === "loading" ? (
        <p>Loading</p>
      ) : status === "authenticated" ? (
        <>
          <button onClick={() => signOut()}>Sign out</button>
          <pre>{JSON.stringify(sessionData, null, 2)}</pre>
        </>
      ) : (
        <button onClick={() => signIn("auth0")}>Sign in with Auth0</button>
      )}
    </div>
  );
};

export default LandingPage;
