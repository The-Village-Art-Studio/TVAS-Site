import {useTranslations} from 'next-intl';

export default function PartnershipsPage() {
  const t = useTranslations('Navigation');
  return (
    <main className="container" style={{ padding: '8rem 0' }}>
      <h1>{t('partnerships')}</h1>
      <p style={{ marginTop: '2rem', fontSize: '1.2rem', opacity: 0.7 }}>
        Creative collaborations and community partnerships.
      </p>
    </main>
  );
}
