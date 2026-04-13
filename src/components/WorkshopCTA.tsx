import {useTranslations} from 'next-intl';

export default function WorkshopCTA() {
  const t = useTranslations('HomePage.sections.workshops');

  return (
    <section style={{ 
      padding: '7rem 0', 
      background: 'var(--foreground)', 
      color: 'white',
      textAlign: 'center'
    }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <h2 style={{ fontSize: '3rem', marginBottom: '1rem', color: 'var(--primary)' }}>
          {t('title')}
        </h2>
        <h3 style={{ fontSize: '1.5rem', marginBottom: '2rem', fontWeight: 400, opacity: 0.9 }}>
          {t('subtitle')}
        </h3>
        <p style={{ fontSize: '1.2rem', marginBottom: '3rem', opacity: 0.7 }}>
          {t('description')}
        </p>
        <button className="btn btn-primary" style={{ padding: '1.2rem 2.5rem', fontSize: '1.1rem' }}>
          Explore Experiences
        </button>
      </div>
    </section>
  );
}
