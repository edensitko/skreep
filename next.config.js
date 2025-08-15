/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static export for custom domain
  output: 'export',
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  
  // Custom domain configuration (no basePath needed for skreep.com)
  // basePath: '/skreep', // Removed for custom domain
  // assetPrefix: '/skreep', // Removed for custom domain
  
  // Disable React Strict Mode to prevent double loading
  reactStrictMode: false,
  
  // SEO and Performance optimizations
  poweredByHeader: false,
  generateEtags: false,
  
  // Performance optimizations
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['react', 'react-dom'],
  },
  
  // Reduce bundle size
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Memory optimizations
  onDemandEntries: {
    // Period (in ms) where the server will keep pages in the buffer
    maxInactiveAge: 25 * 1000,
    // Number of pages that should be kept simultaneously without being disposed
    pagesBufferLength: 2,
  },
  
  // Image optimization for static export
  images: {
    unoptimized: true, // Required for static export
  },
  
  // Webpack optimizations
  webpack: (config, { dev, isServer }) => {
    // Reduce memory usage in production
    if (!dev && !isServer) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            default: false,
            vendors: false,
            // Vendor chunk
            vendor: {
              name: 'vendor',
              chunks: 'all',
              test: /node_modules/,
              priority: 20,
            },
            // Common chunk
            common: {
              name: 'common',
              minChunks: 2,
              chunks: 'all',
              priority: 10,
              reuseExistingChunk: true,
              enforce: true,
            },
          },
        },
      };
    }
    
    return config;
  },
  
  // Note: Headers are not supported with output: 'export'
  // Security headers should be configured at the hosting level (GitHub Pages, Netlify, etc.)
};

module.exports = nextConfig;
