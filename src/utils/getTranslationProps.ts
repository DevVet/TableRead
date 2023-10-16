import { serverSideTranslations } from "next-i18next/serverSideTranslations";

/**
 * Constants
 */
export const DEFAULT_LOCALE = "en";

/**
 *
 * Helper
 *
 */
const getTranslationProps =
  (fileKeys?: string[]) =>
  async ({ locale = DEFAULT_LOCALE }) => ({
    props: {
      ...(await serverSideTranslations(locale, [
        "common",
        ...(fileKeys || []),
      ])),
    },
  });

export default getTranslationProps;
