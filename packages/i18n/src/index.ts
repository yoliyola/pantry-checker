import { es } from "./locales/es";
import { en } from "./locales/en";
import type { Locale } from "@pantry/shared";

export type Messages = typeof es;

const messages: Record<string, Messages> = { es, en: en as unknown as Messages };

export function getMessages(locale: Locale): Messages {
  return messages[locale] ?? messages.es;
}

export function t(
  messages: Messages,
  key: string,
  params?: Record<string, string | number>
): string {
  const keys = key.split(".");
  let value: any = messages;
  for (const k of keys) {
    value = value?.[k];
  }
  if (typeof value !== "string") return key;
  if (!params) return value;
  return Object.entries(params).reduce(
    (str, [k, v]) => str.replace(`{${k}}`, String(v)),
    value
  );
}

export { es, en };
