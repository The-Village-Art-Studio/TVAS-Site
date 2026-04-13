import {useTranslations} from 'next-intl';

export default function ForArtistsPage() {
  const t = useTranslations('Navigation');
  return (
    <main className="container" style={{ padding: '8rem 0' }}>
      <h1>{t('forArtists')}</h1>
      <p style={{ marginTop: '2rem', fontSize: '1.2rem', opacity: 0.7 }}>
        How artists can get involved, featured, and connected with the TVAS community.
      </p>
    </main>
  );
}
