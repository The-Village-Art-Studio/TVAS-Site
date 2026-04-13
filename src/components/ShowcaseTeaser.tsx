import {useTranslations} from 'next-intl';

export default function ShowcaseTeaser() {
  const t = useTranslations('HomePage.sections.showcase');

  return (
    <section className="section">
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '4rem' }}>
          <div>
            <span className="caption" style={{ display: 'block', marginBottom: '1rem' }}>Curated Selections</span>
            <h2>{t('title')}</h2>
          </div>
          <button className="btn btn-outline">{t('cta')}</button>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '3rem' 
        }}>
          {[1, 2, 3].map((i) => (
            <div key={i} className="card-artist" style={{ cursor: 'pointer' }}>
              <div className="card-artist-image" style={{ 
                aspectRatio: '0.8', 
                background: 'var(--muted)', 
                borderRadius: '2px',
                marginBottom: '1.5rem',
                overflow: 'hidden'
              }}>
                <div style={{ width: '100%', height: '100%', background: '#eee' }}></div>
              </div>
              <h4 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Artist Name</h4>
              <p style={{ fontSize: '0.9rem', opacity: 0.6, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                Sculpture &amp; Mixed Media
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
