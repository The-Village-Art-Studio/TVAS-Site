import {useTranslations} from 'next-intl';

export default function PodcastTeaser() {
  const t = useTranslations('HomePage.sections.podcast');

  return (
    <section className="section" style={{ background: 'var(--muted)' }}>
      <div className="container">
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
          gap: 'var(--gutter)',
          alignItems: 'center'
        }}>
          {/* Editorial Image Block */}
          <div style={{ 
            position: 'relative',
            aspectRatio: '1',
            background: 'var(--foreground)',
            borderRadius: '4px',
            overflow: 'hidden',
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
          }}>
            <div style={{ 
              position: 'absolute', 
              inset: 0, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              fontSize: '6rem',
              color: 'var(--primary)',
              opacity: 0.8
            }}>
              🎙️
            </div>
          </div>

          {/* Text Content Block */}
          <div style={{ padding: '2rem' }}>
            <span className="caption" style={{ display: 'block', marginBottom: '1.2rem' }}>
              The Village Voice
            </span>
            <h2 style={{ marginBottom: '1.5rem' }}>{t('title')}</h2>
            <p className="body-text" style={{ marginBottom: '2.5rem', lineHeight: '1.8' }}>
              {t('description')}
            </p>
            <button className="btn btn-outline" style={{ border: '2px solid var(--foreground)', fontWeight: 700 }}>
              {t('cta')}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
