import { Helmet } from "react-helmet-async";

interface SeoProps {
  title?: string;
  description?: string;
  path: string;
  image?: string;
  noindex?: boolean;
}

const DEFAULT_SITE_NAME = "CollectTech & Accounting Solutions";
const DEFAULT_TITLE = "CollectTech & Accounting Solutions - Professional Financial Support";
const DEFAULT_DESCRIPTION =
  "CollectTech provides professional outsourced finance services including accounts receivable, credit control, accounts payable, financial reporting, and tax compliance for growing businesses and SMEs in Zambia.";
const DEFAULT_IMAGE = "/logo.jpg";

export function Seo({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  path,
  image = DEFAULT_IMAGE,
  noindex = false,
}: SeoProps) {
  // Use VITE_SITE_URL from env, fallback to window.location.origin in browser
  const getSiteUrl = () => {
    if (import.meta.env.VITE_SITE_URL) {
      return import.meta.env.VITE_SITE_URL;
    }
    // This will only work at runtime in browser
    if (typeof window !== "undefined") {
      return window.location.origin;
    }
    // Fallback for build time
    return "https://collectechfinance.com";
  };

  const siteUrl = getSiteUrl();
  const canonicalUrl = `${siteUrl}${path}`;
  const imageUrl = image.startsWith("http") ? image : `${siteUrl}${image}`;

  return (
    <Helmet>
      {/* Basic meta tags */}
      <title>{title}</title>
      <link rel="canonical" href={canonicalUrl} />
      <meta name="description" content={description} />

      {/* Robots meta */}
      {noindex ? (
        <meta name="robots" content="noindex,nofollow" />
      ) : (
        <meta name="robots" content="index,follow" />
      )}

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={DEFAULT_SITE_NAME} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
    </Helmet>
  );
}
