import type { NextConfig } from "next";

// The UI is the partner's buildless app in public/ (index.html + app.js); Next.js serves it and hosts /api.
const nextConfig: NextConfig = {
  async rewrites() {
    return [
      { source: "/", destination: "/index.html" },
      { source: "/lab", destination: "/lab/index.html" },
    ];
  },
};

export default nextConfig;
