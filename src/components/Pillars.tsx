import {useTranslations} from 'next-intl';

const pillarIcons: Record<string, string> = {
  podcast: '🎙️',
  showcase: '🖼️',
  workshops: '☕',
  support: '🤝',
  partnerships: '🌐',
};

export default function Pillars() {
  const t = useTranslations('Pillars');

  const pillarKeys = ['podcast', 'showcase', 'workshops', 'support', 'partnerships'] as const;

  return (
    <section className="section" style={{ background: 'var(--muted)' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ maxWidth: '700px', marginBottom: '5rem' }}>
          <span className="caption" style={{ display: 'block', marginBottom: '1rem' }}>
            {t('eyebrow')}
          </span>
          <h2>{t('headline')}</h2>
        </div>

        {/* Pillars Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '3rem'
        }}>
          {pillarKeys.map((key) => (
            <div key={key} style={{ borderTop: '1px solid var(--border)', paddingTop: '2rem' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                marginBottom: '1.5rem'
              }}>
                <span style={{ fontSize: '1.5rem' }}>{pillarIcons[key]}</span>
                <span className="caption" style={{ fontSize: '0.75rem' }}>
                  {t(`items.${key}.label`)}
                </span>
              </div>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem', fontWeight: 700 }}>
                {t(`items.${key}.title`)}
              </h3>
              <p style={{ fontSize: '1rem', lineHeight: '1.8', opacity: 0.75 }}>
                {t(`items.${key}.description`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
