const path = require("path");
const isDevelopment = process.env.NODE_ENV !== "production";

// These dependencies are only available in dev so we have to verify what
// environment we are in before importing them.
let HttpBackend;
let HMRPlugin;
if (isDevelopment) {
  /* eslint-disable import/no-extraneous-dependencies, global-require */
  HttpBackend = require("i18next-http-backend/cjs");
  ({ HMRPlugin } = require("i18next-hmr/plugin"));
  /* eslint-enable import/no-extraneous-dependencies */
}

/** @type import("next").I18NConfig */
const i18n = {
  defaultLocale: "en",
  locales: ["en"],
};

/** @type import("next-i18next").UserConfig */
const next18nextConfig = {
  i18n,
  compatibilityJSON: "v3",
  reloadOnPrerender: isDevelopment,
  localePath: path.resolve("./public/locales"),
  react: {
    bindI18nStore: "added",
  },
  // Allow hot-reload of translation .json files in development
  // Source: https://github.com/felixmosh/i18next-hmr/blob/e300f5b/examples/next-with-next-i18next-v13/next-i18next.config.js
  ...(typeof window !== "undefined"
    ? {
        backend: {
          loadPath: "/locales/{{lng}}/{{ns}}.json'",
        },
      }
    : {}),
  serializeConfig: false,
  use:
    // eslint-disable-next-line no-nested-ternary
    isDevelopment
      ? typeof window !== "undefined"
        ? [HttpBackend, new HMRPlugin({ client: true })]
        : [new HMRPlugin({ server: true })]
      : [],
};

module.exports = next18nextConfig;
