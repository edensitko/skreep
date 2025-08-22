/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://skreep.com',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: [
    '/maintenance',
    '/admin/*',
    '/api/*',
    '/404',
    '/500'
  ],
  alternateRefs: [
    {
      href: 'https://skreep.com',
      hreflang: 'he',
    },
    {
      href: 'https://skreep.com/en',
      hreflang: 'en',
    },
    {
      href: 'https://skreep.com',
      hreflang: 'x-default',
    },
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/maintenance',
          '/admin',
          '/api',
          '/_next',
          '/static'
        ],
      },
      {
        userAgent: 'GPTBot',
        allow: '/',
      },
      {
        userAgent: 'Google-Extended',
        allow: '/',
      },
      {
        userAgent: 'ChatGPT-User',
        allow: '/',
      },
      {
        userAgent: 'CCBot',
        allow: '/',
      },
      {
        userAgent: 'anthropic-ai',
        allow: '/',
      },
      {
        userAgent: 'Claude-Web',
        allow: '/',
      },
    ],
    additionalSitemaps: [
      'https://skreep.com/sitemap.xml',
    ],
  },
  transform: async (config, path) => {
    // Custom priority and changefreq based on path
    let priority = 0.7;
    let changefreq = 'weekly';

    if (path === '/') {
      priority = 1.0;
      changefreq = 'daily';
    } else if (path.includes('/contact')) {
      priority = 0.9;
      changefreq = 'monthly';
    } else if (path.includes('/projects')) {
      priority = 0.8;
      changefreq = 'weekly';
    }

    return {
      loc: path,
      changefreq,
      priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: config.alternateRefs ?? [],
    };
  },
};
