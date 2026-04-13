import {useTranslations} from 'next-intl';

export default function ShowcaseTeaser() {
  const t = useTranslations('HomePage.sections.showcase');

  return (
    <section style={{ padding: '5rem 0', background: 'var(--muted)' }}>
      <div className="container" style={{ textAlign: 'center' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '3rem' }}>{t('title')}</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
          {[1, 2, 3].map((i) => (
            <div key={i} style={{ 
              background: 'white', 
              aspectRatio: '0.8', 
              borderRadius: '8px', 
              overflow: 'hidden',
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
            }}>
              <div style={{ height: '70%', background: '#eee' }}></div>
              <div style={{ padding: '1.5rem', textAlign: 'left' }}>
                <div style={{ width: '40px', height: '4px', background: 'var(--primary)', marginBottom: '1rem' }}></div>
                <h4 style={{ fontSize: '1.1rem' }}>Featured Artist Showcase</h4>
              </div>
            </div>
          ))}
        </div>
        <button className="btn btn-outline" style={{ marginTop: '3rem' }}>{t('cta')}</button>
      </div>
    </section>
  );
}
