import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SUPPORTED_LOCALES, type Locale } from "@pantry/shared";
import { getMessages } from "@pantry/i18n";
import "@/app/globals.css";

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const messages = getMessages(params.locale as Locale);
  return {
    title: {
      default: messages.meta.title,
      template: `%s | CuantoDura`,
    },
    description: messages.meta.description,
    openGraph: {
      title: messages.meta.title,
      description: messages.meta.description,
      siteName: "CuantoDura",
      type: "website",
    },
  };
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!SUPPORTED_LOCALES.includes(params.locale as Locale)) {
    notFound();
  }

  const messages = getMessages(params.locale as Locale);

  return (
    <html lang={params.locale}>
      <body>
        <header className="header">
          <nav className="nav">
            <a href={`/${params.locale}`} className="logo">
              🥫 CuantoDura
            </a>
            <div className="nav-links">
              <a href={`/${params.locale}`}>{messages.nav.home}</a>
              <a href={`/${params.locale}/category`}>
                {messages.nav.categories}
              </a>
            </div>
            <div className="locale-switcher">
              {SUPPORTED_LOCALES.map((loc) => (
                <a
                  key={loc}
                  href={`/${loc}`}
                  className={loc === params.locale ? "active" : ""}
                >
                  {loc.toUpperCase()}
                </a>
              ))}
            </div>
          </nav>
        </header>
        <main className="main">{children}</main>
        <footer className="footer">
          <p>{messages.footer.disclaimer}</p>
          <p>
            © {new Date().getFullYear()} CuantoDura.{" "}
            {messages.footer.rights}
          </p>
        </footer>
      </body>
    </html>
  );
}
