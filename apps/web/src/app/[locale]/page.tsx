import Link from "next/link";
import type { Locale } from "@pantry/shared";
import { getMessages } from "@pantry/i18n";
import { getAllCategories } from "@pantry/db";
import { SearchBar } from "@/components/SearchBar";

const POPULAR_PRODUCTS: Record<string, { name: string; slug: string }[]> = {
  es: [
    { name: "Mayonesa", slug: "mayonnaise" },
    { name: "Leche", slug: "milk" },
    { name: "Jamón cocido", slug: "cooked-ham" },
    { name: "Queso rallado", slug: "grated-cheese" },
    { name: "Tomate frito", slug: "tomato-sauce" },
    { name: "Yogur", slug: "yogurt" },
  ],
  en: [
    { name: "Mayonnaise", slug: "mayonnaise" },
    { name: "Milk", slug: "milk" },
    { name: "Cooked ham", slug: "cooked-ham" },
    { name: "Grated cheese", slug: "grated-cheese" },
    { name: "Tomato sauce", slug: "tomato-sauce" },
    { name: "Yogurt", slug: "yogurt" },
  ],
};

export default async function HomePage({
  params,
}: {
  params: { locale: string };
}) {
  const locale = params.locale as Locale;
  const messages = getMessages(locale);
  const categories = await getAllCategories(locale);
  const popular = POPULAR_PRODUCTS[locale] ?? POPULAR_PRODUCTS.es;

  return (
    <>
      <section className="hero">
        <h1>{messages.home.hero}</h1>
        <p>{messages.home.subtitle}</p>
        <SearchBar
          locale={locale}
          placeholder={messages.home.searchPlaceholder}
        />
        <div className="popular-searches">
          <h3>{messages.home.popularSearches}</h3>
          <div className="popular-tags">
            {popular.map((item) => (
              <Link
                key={item.slug}
                href={`/${locale}/product/${item.slug}`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="categories-section">
        <h2>{messages.home.browseCategories}</h2>
        <div className="categories-grid">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/${locale}/category/${cat.slug}`}
              className="category-card"
            >
              <div className="icon">{cat.icon ?? "📦"}</div>
              <div className="name">{cat.translation.name}</div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
