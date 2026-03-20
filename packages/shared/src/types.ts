export type Locale = "es" | "en" | "fr" | "pt" | "de";

export const DEFAULT_LOCALE: Locale = "es";
export const SUPPORTED_LOCALES: Locale[] = ["es", "en"];

export interface Product {
  id: string;
  slug: string;
  categoryId: string | null;
  imageUrl: string | null;
  openedDurationDays: number | null;
  unopenedDurationDays: number | null;
  fridgeDurationDays: number | null;
  freezerDurationDays: number | null;
  createdAt: string;
  updatedAt: string;
}

export interface ProductTranslation {
  id: string;
  productId: string;
  locale: Locale;
  name: string;
  description: string | null;
  storageTips: string | null;
  signsOfSpoilage: string | null;
}

export interface ProductWithTranslation extends Product {
  translation: ProductTranslation;
}

export interface Category {
  id: string;
  slug: string;
  icon: string | null;
}

export interface CategoryTranslation {
  id: string;
  categoryId: string;
  locale: Locale;
  name: string;
}

export interface CategoryWithTranslation extends Category {
  translation: CategoryTranslation;
}

export interface UserPantryItem {
  id: string;
  userId: string;
  productId: string;
  openedAt: string | null;
  notifyBeforeDays: number;
  notes: string | null;
  createdAt: string;
  product?: ProductWithTranslation;
}

export interface SearchResult {
  product: ProductWithTranslation;
  category: CategoryWithTranslation | null;
}
