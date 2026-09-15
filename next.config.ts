import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  // Sigurnosna zaglavlja (QA-5). Bez script-src: bez nonceova bi srušio
  // Nextove inline skripte. Forma šalje fetchom, pa form-action ne smeta.
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          {
            key: "Content-Security-Policy",
            value: "frame-ancestors 'none'; base-uri 'self'; object-src 'none'; form-action 'self'",
          },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
