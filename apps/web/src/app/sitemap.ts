import type { MetadataRoute } from "next";
import { SUPPORTED_LOCALES } from "@pantry/shared";
import { getAllProductSlugs, getAllCategorySlugs } from "@pantry/db";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://cuantodura.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const productSlugs = await getAllProductSlugs();
  const categorySlugs = await getAllCategorySlugs();

  const pages: MetadataRoute.Sitemap = [];

  // Home pages
  for (const locale of SUPPORTED_LOCALES) {
    pages.push({
      url: `${BASE_URL}/${locale}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    });
  }

  // Product pages
  for (const locale of SUPPORTED_LOCALES) {
    for (const slug of productSlugs) {
      pages.push({
        url: `${BASE_URL}/${locale}/product/${slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.8,
      });
    }
  }

  // Category pages
  for (const locale of SUPPORTED_LOCALES) {
    for (const slug of categorySlugs) {
      pages.push({
        url: `${BASE_URL}/${locale}/category/${slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.6,
      });
    }
  }

  return pages;
}
