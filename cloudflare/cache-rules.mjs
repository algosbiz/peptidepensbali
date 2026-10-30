// CLOUDFLARE CACHE RULES
// peptidepensbali.com runs on Vercel, with Cloudflare in front of it (the orange cloud in
// Cloudflare's DNS settings). These rules tell Cloudflare which files it may keep a copy of,
// so visitors get them straight from Cloudflare instead of waiting for Vercel.
//
// Every time a new version of the website goes live, GitHub empties Cloudflare's copies
// (.github/workflows/cloudflare-cache.yml), so nobody gets an old version.
//
// To change a rule: edit it here and push to main. GitHub then sends the rules to Cloudflare.
// Don't edit these rules in the Cloudflare dashboard: the next push would undo it.
// Rules you add yourself in the dashboard are left alone.

// The website's address, without https://. The rules only apply to this address.
export const SITE_HOST = "peptidepensbali.com";

// Every rule below has a "ref" that starts with this, so the script knows which rules in
// Cloudflare it manages (and which ones somebody made by hand).
export const RULE_PREFIX = "website_";

const DAY = 24 * 60 * 60;
const onSite = `http.host eq "${SITE_HOST}"`;

// Error pages (4xx/5xx) are never kept: a missing photo should not stay missing for 30 days.
const neverKeepErrors = [{ status_code_range: { from: 400 }, value: -1 }];

export const cacheRules = [
  {
    ref: "website_build_files",
    description: "Website code, styles and fonts (/_next/static): new file names on every update, keep 1 year",
    expression: `${onSite} and starts_with(http.request.uri.path, "/_next/static/")`,
    action: "set_cache_settings",
    action_parameters: {
      cache: true,
      // Vercel already says "keep for a year, never changes" for these files.
      edge_ttl: { mode: "respect_origin" },
      browser_ttl: { mode: "respect_origin" },
    },
  },
  {
    ref: "website_page",
    description: "The page itself (HTML): Cloudflare keeps it 5 minutes, browsers always ask for the newest",
    // Only normal visits to the home page. Requests made by Next.js while the page is open
    // (they carry an "rsc" header) and addresses with a ?query go straight to Vercel,
    // because Vercel answers those differently.
    expression: `${onSite} and http.request.uri.path eq "/" and http.request.uri.query eq "" and not has_key(http.request.headers, "rsc")`,
    action: "set_cache_settings",
    action_parameters: {
      cache: true,
      // How long Cloudflare keeps the page is set by the website itself: the
      // Cloudflare-CDN-Cache-Control header in next.config.ts. Redirects and errors are never kept.
      edge_ttl: {
        mode: "respect_origin",
        status_code_ttl: [{ status_code_range: { from: 300 }, value: -1 }],
      },
      // Browsers don't keep the page, so returning visitors see an update right away.
      // (GitHub can empty Cloudflare's copy, but not the copy inside someone's browser.)
      browser_ttl: { mode: "respect_origin" },
    },
  },
  {
    ref: "website_images",
    description: "Resized photos (/_next/image): keep 30 days, one copy per image format",
    expression: `${onSite} and http.request.uri.path eq "/_next/image"`,
    action: "set_cache_settings",
    action_parameters: {
      cache: true,
      edge_ttl: { mode: "override_origin", default: 30 * DAY, status_code_ttl: neverKeepErrors },
      // Vercel sends AVIF photos to browsers that support them and WebP to the others.
      // This keeps one copy per format, so an AVIF photo never reaches a browser that can't show it.
      vary: {
        default: { action: "bypass" },
        headers: { accept: { action: "normalize", media_types: ["image/avif", "image/webp"] } },
      },
    },
  },
  {
    ref: "website_public_files",
    description: "Photos in /public/images, icons, robots.txt and sitemap.xml: keep 30 days",
    expression: `${onSite} and (starts_with(http.request.uri.path, "/images/") or http.request.uri.path in {"/robots.txt" "/sitemap.xml" "/icon.png" "/apple-icon.png"})`,
    action: "set_cache_settings",
    action_parameters: {
      cache: true,
      edge_ttl: { mode: "override_origin", default: 30 * DAY, status_code_ttl: neverKeepErrors },
    },
  },
];
