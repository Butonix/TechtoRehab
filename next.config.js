const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});
const withPlugins = require("next-compose-plugins");
const runtimeCaching = require("next-pwa/cache");

const withPWA = require("next-pwa");

module.exports = withPlugins([
  [withBundleAnalyzer()],
  // [
  //   withPWA({
  //     pwa: {
  //       runtimeCaching,
  //     },
  //   }),
  // ],
]);
