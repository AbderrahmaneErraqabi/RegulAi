const DEFAULT_VIDEO_URL =
  "https://drive.google.com/file/d/1BvmcJRrGGzl15Fru2iU-1DnLWqhQrGwJ/preview";

function toPreviewUrl(url: string) {
  if (!url) return DEFAULT_VIDEO_URL;
  if (url.includes("/preview")) return url;
  if (url.includes("/view")) return url.replace("/view", "/preview");
  return url;
}

export const DEMO_VIDEO_URL = toPreviewUrl(
  import.meta.env.VITE_DEMO_VIDEO_URL?.trim() || DEFAULT_VIDEO_URL
);

export const IS_DEMO_MODE = import.meta.env.VITE_ENABLE_AI === "true" ? false : true;
