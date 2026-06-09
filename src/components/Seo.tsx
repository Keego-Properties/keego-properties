import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { BRAND_NAME, DEFAULT_DESCRIPTION, DEFAULT_OG_IMAGE, DEFAULT_TITLE, getAbsoluteUrl } from "@/lib/seo";

type JsonLdValue = Record<string, unknown> | Array<Record<string, unknown>>;

interface SeoProps {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  type?: "website" | "article";
  noindex?: boolean;
  keywords?: string;
  jsonLd?: JsonLdValue;
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
}

const setOrRemoveMeta = (selector: string, attr: "name" | "property", key: string, value?: string) => {
  const existing = document.head.querySelector<HTMLMetaElement>(selector);

  if (!value) {
    existing?.remove();
    return;
  }

  const element = existing ?? document.createElement("meta");
  element.setAttribute(attr, key);
  element.setAttribute("content", value);

  if (!existing) {
    document.head.appendChild(element);
  }
};

const setCanonical = (href: string) => {
  const existing = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  const element = existing ?? document.createElement("link");

  element.setAttribute("rel", "canonical");
  element.setAttribute("href", href);

  if (!existing) {
    document.head.appendChild(element);
  }
};

const setJsonLd = (jsonLd?: JsonLdValue) => {
  const existing = document.head.querySelector<HTMLScriptElement>('script[data-seo="json-ld"]');

  if (!jsonLd) {
    existing?.remove();
    return;
  }

  const element = existing ?? document.createElement("script");
  element.type = "application/ld+json";
  element.dataset.seo = "json-ld";
  element.text = JSON.stringify(jsonLd);

  if (!existing) {
    document.head.appendChild(element);
  }
};

const Seo = ({
  title,
  description = DEFAULT_DESCRIPTION,
  path,
  image = DEFAULT_OG_IMAGE,
  type = "website",
  noindex = false,
  keywords,
  jsonLd,
  publishedTime,
  modifiedTime,
  author,
}: SeoProps) => {
  const location = useLocation();

  useEffect(() => {
    const resolvedTitle = title || DEFAULT_TITLE;
    const canonicalUrl = getAbsoluteUrl(path || `${location.pathname}${location.search}`);
    const imageUrl = getAbsoluteUrl(image);

    document.title = resolvedTitle;

    setCanonical(canonicalUrl);
    setJsonLd(jsonLd);

    setOrRemoveMeta('meta[name="description"]', "name", "description", description);
    setOrRemoveMeta('meta[name="author"]', "name", "author", author || BRAND_NAME);
    setOrRemoveMeta('meta[name="robots"]', "name", "robots", noindex ? "noindex, nofollow" : "index, follow");
    setOrRemoveMeta('meta[name="keywords"]', "name", "keywords", keywords);
    setOrRemoveMeta('meta[property="og:title"]', "property", "og:title", resolvedTitle);
    setOrRemoveMeta('meta[property="og:description"]', "property", "og:description", description);
    setOrRemoveMeta('meta[property="og:type"]', "property", "og:type", type);
    setOrRemoveMeta('meta[property="og:url"]', "property", "og:url", canonicalUrl);
    setOrRemoveMeta('meta[property="og:image"]', "property", "og:image", imageUrl);
    setOrRemoveMeta('meta[property="og:site_name"]', "property", "og:site_name", BRAND_NAME);
    setOrRemoveMeta('meta[property="og:locale"]', "property", "og:locale", "en_AE");
    setOrRemoveMeta('meta[property="article:published_time"]', "property", "article:published_time", publishedTime);
    setOrRemoveMeta('meta[property="article:modified_time"]', "property", "article:modified_time", modifiedTime);
    setOrRemoveMeta('meta[name="twitter:card"]', "name", "twitter:card", "summary_large_image");
    setOrRemoveMeta('meta[name="twitter:title"]', "name", "twitter:title", resolvedTitle);
    setOrRemoveMeta('meta[name="twitter:description"]', "name", "twitter:description", description);
    setOrRemoveMeta('meta[name="twitter:image"]', "name", "twitter:image", imageUrl);
  }, [author, description, image, jsonLd, keywords, location.pathname, location.search, modifiedTime, noindex, path, publishedTime, title, type]);

  return null;
};

export default Seo;
