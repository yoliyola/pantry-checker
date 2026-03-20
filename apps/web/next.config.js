/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  basePath: "/pantry-checker",
  transpilePackages: ["@pantry/shared", "@pantry/db", "@pantry/i18n"],
};

module.exports = nextConfig;
