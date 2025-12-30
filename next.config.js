const crypto = require('crypto');

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
    // Memory optimizations
    config.optimization = {
      ...config.optimization,
      // Split chunks for better caching and memory management
      splitChunks: {
        chunks: 'all',
        minSize: 20000,
        maxSize: 244000,
        cacheGroups: {
          default: false,
          vendors: false,
          // Framework chunk (React, Next.js)
          framework: {
            name: 'framework',
            chunks: 'all',
            test: /(?<!node_modules.*)[\\/]node_modules[\\/](react|react-dom|scheduler|prop-types|use-subscription)[\\/]/,
            priority: 40,
            enforce: true,
          },
          // Libraries chunk
          lib: {
            test(module) {
              return module.size() > 160000 && /node_modules[/\\]/.test(module.identifier());
            },
            name(module) {
              const hash = crypto.createHash('sha1');
              const identifier = module.libIdent ? module.libIdent({ context: config.context }) : module.identifier();
              if (identifier) {
                hash.update(identifier);
                return hash.digest('hex').substring(0, 8);
              }
              return 'lib';
            },
            priority: 30,
            minChunks: 1,
            reuseExistingChunk: true,
          },
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

    // Reduce bundle size by excluding unnecessary modules
    config.resolve.alias = {
      ...config.resolve.alias,
      // Reduce lodash bundle size
      'lodash': 'lodash-es',
    };

    return config;
  },
  
  // Note: Headers are not supported with output: 'export'
  // Security headers should be configured at the hosting level (GitHub Pages, Netlify, etc.)
};

module.exports = nextConfig;
