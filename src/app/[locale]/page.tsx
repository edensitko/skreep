import HomeView from '../home/HomeView';

export async function generateStaticParams() {
  return [{ locale: 'he' }, { locale: 'en' }];
}

export default async function LocaleHomePage({ params }: { params: Promise<{ locale: 'he' | 'en' }> }) {
  const { locale } = await params;
  return <HomeView locale={locale} />;
}
