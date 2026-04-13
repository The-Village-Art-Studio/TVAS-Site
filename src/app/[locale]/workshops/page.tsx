import {useTranslations} from 'next-intl';

export default function WorkshopsPage() {
  const t = useTranslations('Navigation');
  return (
    <main className="container" style={{ padding: '8rem 0' }}>
      <h1>{t('workshops')}</h1>
      <p style={{ marginTop: '2rem', fontSize: '1.2rem', opacity: 0.7 }}>
        Artist Connection Experiences at La Gloria. This section is under development.
      </p>
    </main>
  );
}
