export const SITE_URL = (import.meta.env.VITE_SITE_URL || "https://keego.ae").replace(/\/$/, "");

export const BRAND_NAME = "KeeGo Properties";

export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`;

export const DEFAULT_DESCRIPTION =
  "KeeGo Properties: luxury real estate in Dubai. Browse homes for sale, rentals, villas, communities, and investment properties with expert guidance.";

export const DEFAULT_TITLE = `${BRAND_NAME} | Luxury Real Estate in Dubai`;

export const getAbsoluteUrl = (path = "/") => {
  if (/^https?:\/\//i.test(path)) return path;
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalizedPath}`;
};

export const stripHtml = (value: string) => value.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();

export const truncate = (value: string, maxLength: number) => {
  if (value.length <= maxLength) return value;
  return `${value.slice(0, Math.max(0, maxLength - 1)).trim()}...`;
};
