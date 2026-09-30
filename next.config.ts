import type { NextConfig } from "next";

// Next.js defaults work well for this site: images placed in /public/images are
// automatically resized and served as WebP by the <Image> component.
const nextConfig: NextConfig = {
  // Only matters while developing (npm run dev). For safety, the dev server only
  // lets the page connect to it from "localhost". Opened from anywhere else, the
  // page still shows but no button works (menu, cart, quantity, Add to cart).
  // These entries also allow:
  //   - a phone on the same Wi-Fi, e.g. http://192.168.1.20:3000
  //   - ngrok links, e.g. https://something.ngrok-free.app
  // The published website is not affected by this setting.
  allowedDevOrigins: ["192.168.*.*", "*.ngrok-free.app"],
};

export default nextConfig;
