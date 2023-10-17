export const defaultLocale = "en";
export const supportedLocales = [defaultLocale];
export const defaultNS = "common";
export const cookieName = "i18next";

export function getOptions(lng = defaultLocale, ns = defaultNS) {
  return {
    // debug: true,
    supportedLngs: supportedLocales,
    fallbackLng: defaultLocale,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns,
  };
}
