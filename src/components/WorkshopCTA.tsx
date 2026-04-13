import {useTranslations} from 'next-intl';

export default function WorkshopCTA() {
  const t = useTranslations('HomePage.sections.workshops');

  return (
    <section className="section" style={{ borderTop: '1px solid var(--border)' }}>
      <div className="container">
        <div style={{ 
          background: 'var(--foreground)', 
          color: 'white', 
          padding: 'clamp(3rem, 10vw, 6rem)', 
          textAlign: 'center',
          borderRadius: '4px'
        }}>
          <span className="caption" style={{ color: 'var(--primary)', marginBottom: '1.5rem', display: 'block' }}>
            {t('subtitle')}
          </span>
          <h2 style={{ marginBottom: '2rem', fontSize: 'clamp(2rem, 6vw, 4rem)' }}>
            {t('title')}
          </h2>
          <p className="body-text" style={{ maxWidth: '700px', margin: '0 auto 4rem', opacity: 0.8 }}>
            {t('description')}
          </p>
          <button className="btn btn-primary" style={{ padding: '1.2rem 3rem' }}>
            Book an Experience
          </button>
        </div>
      </div>
    </section>
  );
}
