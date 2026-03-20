/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@pantry/shared", "@pantry/db", "@pantry/i18n"],
};

module.exports = nextConfig;
