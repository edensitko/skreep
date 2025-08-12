import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable standalone output for Docker optimization
  output: 'standalone',
  
  // Optimize images for production
  images: {
    unoptimized: false,
    remotePatterns: [],
  },
  
  // Enable compression
  compress: true,
  
  // Disable x-powered-by header for security
  poweredByHeader: false,
  
  // Enable experimental features if needed
  experimental: {
    // Enable if using app directory features
    // appDir: true,
  },
  
  // Allow cross-origin requests in development
  allowedDevOrigins: [
    '10.0.0.7',
    'localhost',
    '127.0.0.1',
  ],
  
  // ESLint configuration
  eslint: {
    // Disable ESLint during builds to allow warnings
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
