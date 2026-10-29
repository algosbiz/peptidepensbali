import type { NextConfig } from "next";

// Images placed in /public/images are automatically resized by the <Image> component.
const nextConfig: NextConfig = {
  // Browsers that support AVIF (most of them) get AVIF, which is about 20% smaller
  // than WebP, so the product photo at the top of the page appears sooner on phones.
  // Older browsers get WebP.
  images: {
    formats: ["image/avif", "image/webp"],
  },

  // Only matters while developing (npm run dev). For safety, the dev server only
  // lets the page connect to it from "localhost". Opened from anywhere else, the
  // page still shows but no button works (menu, cart, quantity, Add to cart).
  // These entries also allow:
  //   - a phone on the same Wi-Fi, e.g. http://192.168.1.20:3000
  //   - ngrok links, e.g. https://something.ngrok-free.app
  // The published website is not affected by this setting.
  allowedDevOrigins: ["192.168.*.*", "*.ngrok-free.app"],

  // SEO: the same website is also reachable at peptidepensbali.vercel.app (and Vercel's
  // preview links). Google should only list the real domain, peptidepensbali.com, so on
  // any *.vercel.app address the pages tell search engines "don't index this copy".
  // Visitors don't notice anything. The real domain is not affected.
  async headers() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: ".*\\.vercel\\.app" }],
        headers: [{ key: "X-Robots-Tag", value: "noindex" }],
      },
    ];
  },
};

export default nextConfig;
