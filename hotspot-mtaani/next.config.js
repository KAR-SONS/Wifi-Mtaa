/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**.supabase.co" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
    ],
  },
  // Supabase's client pulls in `ws` (for Realtime), which references Node-only
  // globals like __dirname via its optional native deps. Those aren't needed
  // for auth and break the Edge Runtime bundle used by middleware.ts — so 
  // tell webpack to skip them.
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      bufferutil: false,
      "utf-8-validate": false,
    };
    return config;
  },
};

module.exports = nextConfig;