/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**.supabase.co" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
    ],
  },
  // Supabase's client (via its Realtime dependency chain) contains code
  // that references the literal `__dirname` identifier — normal webpack
  // builds silently replace this with a real path, but Next's Edge Runtime
  // (used for middleware.ts) deliberately does NOT polyfill it, since
  // there's no real filesystem there. That's why the build succeeds but it
  // throws "__dirname is not defined" at runtime. Aliasing `ws`'s optional
  // native deps (below) isn't enough on its own — we also need to replace
  // the `__dirname` identifier itself for the edge compilation.
  webpack: (config, { nextRuntime, webpack }) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      bufferutil: false,
      "utf-8-validate": false,
    };
    return config;
  },
};

module.exports = nextConfig;