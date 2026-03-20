"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Locale } from "@pantry/shared";

export function SearchBar({
  locale,
  placeholder,
}: {
  locale: Locale;
  placeholder: string;
}) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/${locale}/search?q=${encodeURIComponent(query.trim())}`);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="search-box">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        autoFocus
      />
    </form>
  );
}
