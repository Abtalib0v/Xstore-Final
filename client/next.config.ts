import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "xstore.8theme.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  // ...diğer config seçenekleriniz...
};

export default nextConfig;
