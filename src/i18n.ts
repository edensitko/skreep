import {getRequestConfig} from 'next-intl/server';

export const locales = ['he', 'en'] as const;
export type Locale = (typeof locales)[number];

export default getRequestConfig(async ({locale}) => {
  const messages = (await import(`../messages/${locale}.json`)).default;
  
  return {
    messages,
    timeZone: 'Asia/Jerusalem',
    now: new Date()
  } as any;
});
