import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SUPPORTED_LOCALES, type Locale, formatDuration } from "@pantry/shared";
import { getMessages, t } from "@pantry/i18n";
import { getProductsByCategory, getAllCategories, getAllCategorySlugs } from "@pantry/db";

interface Props {
  params: { locale: string; slug: string };
}

export async function generateStaticParams() {
  const slugs = await getAllCategorySlugs();
  return SUPPORTED_LOCALES.flatMap((locale) =>
    slugs.map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = params.locale as Locale;
  const categories = await getAllCategories(locale);
  const category = categories.find((c) => c.slug === params.slug);
  if (!category) return {};

  const title = t(getMessages(locale), "category.title", {
    name: category.translation.name,
  });

  return { title };
}

export default async function CategoryPage({ params }: Props) {
  const locale = params.locale as Locale;
  const messages = getMessages(locale);
  const categories = await getAllCategories(locale);
  const category = categories.find((c) => c.slug === params.slug);

  if (!category) notFound();

  const products = await getProductsByCategory(params.slug, locale);

  return (
    <div>
      <nav className="breadcrumb">
        <a href={`/${locale}`}>{messages.nav.home}</a>
        <span>/</span>
        <a href={`/${locale}/category`}>{messages.nav.categories}</a>
        <span>/</span>
        <span>{category.translation.name}</span>
      </nav>

      <h1>
        {category.icon} {category.translation.name}
      </h1>

      <div className="product-list" style={{ marginTop: "1.5rem" }}>
        {products.map((product) => (
          <a
            key={product.id}
            href={`/${locale}/product/${product.slug}`}
            className="product-card"
          >
            <h3>{product.translation.name}</h3>
            {product.openedDurationDays && (
              <span className="duration-badge">
                {messages.product.opened}:{" "}
                {formatDuration(product.openedDurationDays, locale)}
              </span>
            )}
          </a>
        ))}
      </div>
    </div>
  );
}
