import {useTranslations} from 'next-intl';

export default function Hero() {
  const t = useTranslations('HomePage.hero');

  return (
    <section style={{
      padding: 'var(--section-spacing-desktop) 0',
      backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.7)), url('/hero-mockup.png')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      textAlign: 'center',
      position: 'relative',
      minHeight: '80vh',
      display: 'flex',
      alignItems: 'center'
    }}>
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <span className="caption" style={{ display: 'block', marginBottom: '1.5rem' }}>
          Contemporary Creative Platform
        </span>
        <h1 style={{ 
          maxWidth: '1000px',
          margin: '0 auto 2rem'
        }}>
          {t('title')}
        </h1>
        <p style={{ 
          fontSize: 'clamp(1.1rem, 3vw, 1.25rem)', 
          maxWidth: '650px', 
          margin: '0 auto 3.5rem',
          color: 'var(--foreground)',
          opacity: 0.8
        }}>
          {t('subtitle')}
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <button className="btn btn-primary">
            {t('cta')}
          </button>
          <button className="btn btn-outline">
            Meet the Artists
          </button>
        </div>
      </div>
      
      {/* Editorial Gradient fade to white */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '20vh',
        background: 'linear-gradient(to top, var(--background), transparent)',
        zIndex: 1
      }}></div>
    </section>
  );
}
