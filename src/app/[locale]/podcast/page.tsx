import {useTranslations} from 'next-intl';

export default function PodcastPage() {
  const t = useTranslations('Navigation');
  return (
    <main className="container" style={{ padding: '8rem 0' }}>
      <h1>{t('podcast')}</h1>
      <p style={{ marginTop: '2rem', fontSize: '1.2rem', opacity: 0.7 }}>
        The Village Voice: Artist Interviews and Stories. This section is under development.
      </p>
    </main>
  );
}
