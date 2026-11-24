import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://kidsberrykindergarten.edu.np";

  return [
    { url: baseUrl, lastModified: new Date(), priority: 1 },
    { url: `${baseUrl}/about`, lastModified: new Date(), priority: 0.8 },
    { url: `${baseUrl}/programs`, lastModified: new Date(), priority: 0.9 },
    { url: `${baseUrl}/facilities`, lastModified: new Date(), priority: 0.9 },
    { url: `${baseUrl}/gallery`, lastModified: new Date(), priority: 0.8 },
    { url: `${baseUrl}/notices`, lastModified: new Date(), priority: 0.9 },
    { url: `${baseUrl}/admissions`, lastModified: new Date(), priority: 0.8 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), priority: 0.9 },
  ];
}
