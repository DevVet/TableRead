const path = require("path");
const { i18n } = require("./next-i18next.config");

/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n,
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    if (!isServer && config.mode === "development") {
      // eslint-disable-next-line global-require, import/no-extraneous-dependencies
      const { I18NextHMRPlugin } = require("i18next-hmr/webpack");
      config.plugins.push(
        new I18NextHMRPlugin({
          localesDir: path.resolve(__dirname, "public/locales"),
        })
      );
    } else {
      // Prevent Next from trying to bundle the dev-only HMR modules in the final build.
      config.module.rules.push({
        test: /i18next-hmr|i18next-http-backend/,
        use: "null-loader",
      });
    }
    return config;
  },
};

module.exports = nextConfig;
