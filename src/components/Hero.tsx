import {useTranslations} from 'next-intl';

export default function Hero() {
  const t = useTranslations('HomePage.hero');

  return (
    <section style={{
      padding: '12rem 0',
      backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.85), rgba(255, 255, 255, 0.6)), url('/hero-mockup.png')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <h1 style={{ 
          fontSize: 'clamp(2.5rem, 8vw, 4.5rem)', 
          marginBottom: '1.5rem', 
          lineHeight: 1.05,
          color: 'var(--foreground)',
          fontWeight: 800
        }}>
          {t('title')}
        </h1>
        <p style={{ 
          fontSize: 'clamp(1.1rem, 3vw, 1.4rem)', 
          maxWidth: '700px', 
          margin: '0 auto 3rem',
          color: '#333',
          fontWeight: 400
        }}>
          {t('subtitle')}
        </p>
        <button className="btn btn-primary" style={{ fontSize: '1.1rem', padding: '1.2rem 2.8rem', boxShadow: '0 10px 30px rgba(12, 188, 245, 0.3)' }}>
          {t('cta')}
        </button>
      </div>
      
      {/* Subtle decorative element */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '100px',
        background: 'linear-gradient(to top, #ffffff, transparent)',
        zIndex: 1
      }}></div>
    </section>
  );
}
