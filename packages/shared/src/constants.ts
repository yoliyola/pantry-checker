export const SITE_NAME = "CuantoDura";
export const SITE_DESCRIPTION_ES = "Descubre cuánto duran los alimentos una vez abiertos y cómo conservarlos correctamente.";
export const SITE_DESCRIPTION_EN = "Find out how long food lasts once opened and how to store it properly.";

export const STORAGE_LOCATIONS = ["pantry", "fridge", "freezer"] as const;
export type StorageLocation = (typeof STORAGE_LOCATIONS)[number];

export const DURATION_LABELS: Record<string, Record<string, string>> = {
  es: {
    opened: "Abierto",
    unopened: "Sin abrir",
    fridge: "En nevera",
    freezer: "En congelador",
    days: "días",
    weeks: "semanas",
    months: "meses",
  },
  en: {
    opened: "Opened",
    unopened: "Unopened",
    fridge: "In fridge",
    freezer: "In freezer",
    days: "days",
    weeks: "weeks",
    months: "months",
  },
};

export function formatDuration(days: number, locale: string): string {
  const labels = DURATION_LABELS[locale] ?? DURATION_LABELS.es;
  if (days >= 365) {
    const years = Math.round(days / 365);
    return `${years} ${years === 1 ? (locale === "en" ? "year" : "año") : locale === "en" ? "years" : "años"}`;
  }
  if (days >= 30) {
    const months = Math.round(days / 30);
    return `${months} ${labels.months}`;
  }
  if (days >= 14) {
    const weeks = Math.round(days / 7);
    return `${weeks} ${labels.weeks}`;
  }
  return `${days} ${labels.days}`;
}
