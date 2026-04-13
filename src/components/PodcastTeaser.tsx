import {useTranslations} from 'next-intl';

export default function PodcastTeaser() {
  const t = useTranslations('HomePage.sections.podcast');

  return (
    <section style={{ padding: '5rem 0', background: 'var(--background)' }}>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '4rem', alignItems: 'center' }}>
        <div style={{ 
          background: 'var(--foreground)', 
          aspectRatio: '1', 
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--primary)',
          fontSize: '4rem'
        }}>
          🎙️
        </div>
        <div>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{t('title')}</h2>
          <p style={{ fontSize: '1.2rem', marginBottom: '2rem', color: '#666' }}>{t('description')}</p>
          <button className="btn btn-outline">{t('cta')}</button>
        </div>
      </div>
    </section>
  );
}
