import type { NextConfig } from "next";

// The UI is the partner's buildless app in public/ (index.html + app.js); Next.js serves it and hosts /api.
// Redirects rather than rewrites: Amplify serves public/ from its CDN, where rewrites to static files do not resolve.
const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/", destination: "/index.html", permanent: false },
      { source: "/lab", destination: "/lab/index.html", permanent: false },
      { source: "/memory", destination: "/memory/index.html", permanent: false },
      { source: "/demo", destination: "/demo/index.html", permanent: false },
    ];
  },
};

export default nextConfig;
