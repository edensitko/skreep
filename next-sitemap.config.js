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
    '/500',
    '/projects/projects'
  ],
  alternateRefs: [
    {
      href: 'https://skreep.com',
      hreflang: 'he-IL',
    },
    {
      href: 'https://skreep.com/en',
      hreflang: 'en-US',
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
    } else if (path.includes('/services')) {
      priority = 0.8;
      changefreq = 'weekly';
    } else if (path.includes('/projects')) {
      priority = 0.6;
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
  formatSitemap: (xml) => {
    // Format XML with proper indentation
    return xml
      .replace(/<url>/g, '\n  <url>')
      .replace(/<\/url>/g, '\n  </url>')
      .replace(/<loc>/g, '\n    <loc>')
      .replace(/<\/loc>/g, '</loc>')
      .replace(/<lastmod>/g, '\n    <lastmod>')
      .replace(/<\/lastmod>/g, '</lastmod>')
      .replace(/<changefreq>/g, '\n    <changefreq>')
      .replace(/<\/changefreq>/g, '</changefreq>')
      .replace(/<priority>/g, '\n    <priority>')
      .replace(/<\/priority>/g, '</priority>')
      .replace(/<xhtml:link/g, '\n    <xhtml:link')
      .replace(/<\/urlset>/g, '\n</urlset>');
  },
};
