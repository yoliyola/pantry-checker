import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SUPPORTED_LOCALES, type Locale, formatDuration } from "@pantry/shared";
import { getMessages } from "@pantry/i18n";
import { getProductBySlug, getAllProductSlugs } from "@pantry/db";

interface Props {
  params: { locale: string; slug: string };
}

export async function generateStaticParams() {
  const slugs = await getAllProductSlugs();
  return SUPPORTED_LOCALES.flatMap((locale) =>
    slugs.map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = params.locale as Locale;
  const product = await getProductBySlug(params.slug, locale);
  if (!product) return {};

  const title =
    locale === "es"
      ? `¿Cuánto dura ${product.translation.name} una vez abierto?`
      : `How long does ${product.translation.name} last once opened?`;

  const description =
    product.translation.description ?? product.translation.storageTips ?? "";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
    },
    alternates: {
      languages: Object.fromEntries(
        SUPPORTED_LOCALES.map((loc) => [
          loc,
          `/${loc}/product/${params.slug}`,
        ])
      ),
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const locale = params.locale as Locale;
  const messages = getMessages(locale);
  const product = await getProductBySlug(params.slug, locale);

  if (!product) notFound();

  const durations = [
    {
      label: messages.product.opened,
      days: product.openedDurationDays,
    },
    {
      label: messages.product.unopened,
      days: product.unopenedDurationDays,
    },
    {
      label: messages.product.fridge,
      days: product.fridgeDurationDays,
    },
    {
      label: messages.product.freezer,
      days: product.freezerDurationDays,
    },
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name:
          locale === "es"
            ? `¿Cuánto dura ${product.translation.name} una vez abierto?`
            : `How long does ${product.translation.name} last once opened?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: product.openedDurationDays
            ? `${product.translation.name} ${locale === "es" ? "dura aproximadamente" : "lasts approximately"} ${formatDuration(product.openedDurationDays, locale)} ${locale === "es" ? "una vez abierto" : "once opened"}. ${product.translation.storageTips ?? ""}`
            : product.translation.storageTips ?? "",
        },
      },
    ],
  };

  return (
    <div className="product-detail">
      <nav className="breadcrumb">
        <Link href={`/${locale}`}>
          {messages.nav.home}
        </Link>
        <span>/</span>
        <span>{product.translation.name}</span>
      </nav>

      <h1>{product.translation.name}</h1>
      {product.translation.description && (
        <p className="description">{product.translation.description}</p>
      )}

      <div className="duration-grid">
        {durations.map(
          (d) =>
            d.days != null && (
              <div key={d.label} className="duration-item">
                <div className="label">{d.label}</div>
                <div className="value">{formatDuration(d.days, locale)}</div>
              </div>
            )
        )}
      </div>

      {product.translation.storageTips && (
        <div className="info-section">
          <h2>{messages.product.storageTips}</h2>
          <p>{product.translation.storageTips}</p>
        </div>
      )}

      {product.translation.signsOfSpoilage && (
        <div className="info-section">
          <h2>{messages.product.signsOfSpoilage}</h2>
          <p>{product.translation.signsOfSpoilage}</p>
        </div>
      )}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </div>
  );
}
