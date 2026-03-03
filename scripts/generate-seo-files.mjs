import fs from "fs";
import path from "path";

const prerenderRoutes = ["/"];

// Get site URL from environment or use default
const siteUrl = process.env.VITE_SITE_URL || "https://collectechfinance.com";

const today = new Date().toISOString().split("T")[0];

// Generate sitemap.xml
const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${prerenderRoutes
  .map(
    (route) => `  <url>
    <loc>${siteUrl}${route}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${route === "/" ? "1.0" : "0.8"}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

// Generate robots.txt
const robotsContent = `User-agent: *
Allow: /
Sitemap: ${siteUrl}/sitemap.xml`;

// Write files to dist directory
const distDir = path.join(process.cwd(), "dist");

if (!fs.existsSync(distDir)) {
  console.error("Error: dist directory not found. Run 'vite build' first.");
  process.exit(1);
}

fs.writeFileSync(path.join(distDir, "sitemap.xml"), sitemapContent);
fs.writeFileSync(path.join(distDir, "robots.txt"), robotsContent);

console.log("✅ Generated SEO files:");
console.log(`   - ${distDir}/sitemap.xml`);
console.log(`   - ${distDir}/robots.txt`);
