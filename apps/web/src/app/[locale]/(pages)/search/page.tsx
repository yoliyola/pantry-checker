"use client";

import { useState, useEffect } from "react";
import type { Locale, SearchResult } from "@pantry/shared";
import { formatDuration } from "@pantry/shared";
import { getMessages, t } from "@pantry/i18n";
import { searchProducts } from "@pantry/db";
import { SearchBar } from "@/components/SearchBar";

export default function SearchPage({
  params,
}: {
  params: { locale: string };
}) {
  const locale = params.locale as Locale;
  const messages = getMessages(locale);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const q = urlParams.get("q") ?? "";
    setQuery(q);
    if (q) {
      searchProducts(q, locale).then(setResults);
    }
  }, [locale]);

  return (
    <div>
      <div className="search-header">
        <h1>{messages.search.title}</h1>
      </div>

      <SearchBar locale={locale} placeholder={messages.home.searchPlaceholder} />

      <div style={{ marginTop: "1.5rem" }}>
        {query && results.length === 0 && (
          <p style={{ color: "var(--color-text-muted)", textAlign: "center" }}>
            {t(messages, "search.noResults", { query })}
          </p>
        )}

        {results.length > 0 && (
          <>
            <p style={{ color: "var(--color-text-muted)", marginBottom: "1rem" }}>
              {t(messages, "search.resultsFor", {
                count: results.length,
                query,
              })}
            </p>
            <div className="product-list">
              {results.map(({ product, category }) => (
                <a
                  key={product.id}
                  href={`/${locale}/product/${product.slug}/`}
                  className="product-card"
                >
                  <h3>{product.translation.name}</h3>
                  {category && (
                    <span
                      style={{
                        fontSize: "0.8rem",
                        color: "var(--color-text-muted)",
                      }}
                    >
                      {category.icon} {category.translation?.name}
                    </span>
                  )}
                  {product.openedDurationDays && (
                    <span
                      className="duration-badge"
                      style={{ marginLeft: "0.5rem" }}
                    >
                      {messages.product.opened}:{" "}
                      {formatDuration(product.openedDurationDays, locale)}
                    </span>
                  )}
                </a>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
