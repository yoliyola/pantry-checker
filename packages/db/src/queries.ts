import type { Locale, ProductWithTranslation, CategoryWithTranslation, SearchResult } from "@pantry/shared";
import { PRODUCTS } from "./data/products";
import { CATEGORIES } from "./data/categories";

function toProductWithTranslation(p: typeof PRODUCTS[number], locale: Locale): ProductWithTranslation {
  const t = p.translations[locale] ?? p.translations.es;
  return {
    id: p.slug,
    slug: p.slug,
    categoryId: p.category,
    imageUrl: null,
    openedDurationDays: p.openedDurationDays,
    unopenedDurationDays: p.unopenedDurationDays,
    fridgeDurationDays: p.fridgeDurationDays,
    freezerDurationDays: p.freezerDurationDays,
    createdAt: "",
    updatedAt: "",
    translation: {
      id: `${p.slug}-${locale}`,
      productId: p.slug,
      locale: locale,
      name: t.name,
      description: t.description,
      storageTips: t.storageTips,
      signsOfSpoilage: t.signsOfSpoilage,
    },
  };
}

function toCategoryWithTranslation(c: typeof CATEGORIES[number], locale: Locale): CategoryWithTranslation {
  return {
    id: c.slug,
    slug: c.slug,
    icon: c.icon,
    translation: {
      id: `${c.slug}-${locale}`,
      categoryId: c.slug,
      locale: locale,
      name: c.translations[locale] ?? c.translations.es,
    },
  };
}

export async function getProductBySlug(
  slug: string,
  locale: Locale
): Promise<ProductWithTranslation | null> {
  const product = PRODUCTS.find((p) => p.slug === slug);
  if (!product) return null;
  return toProductWithTranslation(product, locale);
}

export async function getProductsByCategory(
  categorySlug: string,
  locale: Locale
): Promise<ProductWithTranslation[]> {
  return PRODUCTS
    .filter((p) => p.category === categorySlug)
    .map((p) => toProductWithTranslation(p, locale));
}

export async function getAllProducts(locale: Locale): Promise<ProductWithTranslation[]> {
  return PRODUCTS.map((p) => toProductWithTranslation(p, locale));
}

export async function getAllCategories(locale: Locale): Promise<CategoryWithTranslation[]> {
  return CATEGORIES.map((c) => toCategoryWithTranslation(c, locale));
}

export async function searchProducts(
  query: string,
  locale: Locale
): Promise<SearchResult[]> {
  const normalizedQuery = query.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  return PRODUCTS
    .filter((p) => {
      const t = p.translations[locale] ?? p.translations.es;
      const normalizedName = t.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      return normalizedName.includes(normalizedQuery);
    })
    .slice(0, 20)
    .map((p) => {
      const cat = CATEGORIES.find((c) => c.slug === p.category);
      return {
        product: toProductWithTranslation(p, locale),
        category: cat ? toCategoryWithTranslation(cat, locale) : null,
      };
    });
}

export async function getAllProductSlugs(): Promise<string[]> {
  return PRODUCTS.map((p) => p.slug);
}

export async function getAllCategorySlugs(): Promise<string[]> {
  return CATEGORIES.map((c) => c.slug);
}
