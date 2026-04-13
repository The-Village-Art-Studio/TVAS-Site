import {useTranslations} from 'next-intl';

export default function Hero() {
  const t = useTranslations('HomePage.hero');

  return (
    <section style={{
      padding: '8rem 0',
      background: 'linear-gradient(135deg, var(--primary-light) 0%, #ffffff 100%)',
      textAlign: 'center'
    }}>
      <div className="container">
        <h1 style={{ 
          fontSize: '4rem', 
          marginBottom: '1.5rem', 
          lineHeight: 1.1,
          color: 'var(--foreground)'
        }}>
          {t('title')}
        </h1>
        <p style={{ 
          fontSize: '1.4rem', 
          maxWidth: '700px', 
          margin: '0 auto 2.5rem',
          color: '#555' 
        }}>
          {t('subtitle')}
        </p>
        <button className="btn btn-primary" style={{ fontSize: '1.1rem', padding: '1rem 2rem' }}>
          {t('cta')}
        </button>
      </div>
    </section>
  );
}
