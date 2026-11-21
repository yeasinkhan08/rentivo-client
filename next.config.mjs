/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,

  env: {
    // Make MongoDB URI available to the build & server runtime.
    // This overrides any .env file and guarantees the variable is present
    // when Next.js collects page‑data (including /api/jwt).
    MONGO_DB_URI: process.env.MONGO_DB_URI,
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },

  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
