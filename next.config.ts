import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'tailus.io'
      },
      {
        protocol: 'https',
        hostname: 'flowbite.s3.amazonaws.com'
      },
      {
        protocol: 'https',
        hostname: 'image.tmdb.org'
      }

    ]
  }
}

export default nextConfig;
