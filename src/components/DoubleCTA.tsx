import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/routing';

export default function DoubleCTA() {
  const t = useTranslations('FinalCTA');

  return (
    <section className="section" style={{ background: 'var(--foreground)' }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '8rem' }} className="reveal">
          <span className="caption" style={{ display: 'block', marginBottom: '2.5rem', color: 'var(--primary)' }}>
            {t('eyebrow')}
          </span>
          <h2 style={{ color: 'white', maxWidth: '900px', margin: '0 auto', lineHeight: 1.1 }}>{t('headline')}</h2>
        </div>

        {/* Dual Path Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '3rem'
        }}>
          {/* Artist Path */}
          <div style={{
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '4px',
            padding: '5rem',
            transition: 'all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            background: 'rgba(255, 255, 255, 0.02)'
          }}
          className="reveal delay-1"
          >
            <div>
              <span className="caption" style={{ display: 'block', marginBottom: '2rem', color: 'var(--primary)', opacity: 0.8 }}>
                {t('artist.label')}
              </span>
              <p style={{
                color: 'white',
                fontSize: '1.25rem',
                lineHeight: '1.8',
                marginBottom: '4rem',
                opacity: 0.6
              }}>
                {t('artist.description')}
              </p>
            </div>
            <Link href="/for-artists" className="btn btn-primary" style={{ width: '100%', textAlign: 'center', padding: '1.25rem' }}>
              {t('artist.cta')}
            </Link>
          </div>

          {/* Partner Path */}
          <div style={{
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '4px',
            padding: '5rem',
            transition: 'all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            background: 'rgba(255, 255, 255, 0.02)'
          }}
          className="reveal delay-2"
          >
            <div>
              <span className="caption" style={{ display: 'block', marginBottom: '2rem', color: 'var(--primary)', opacity: 0.8 }}>
                {t('partner.label')}
              </span>
              <p style={{
                color: 'white',
                fontSize: '1.25rem',
                lineHeight: '1.8',
                marginBottom: '4rem',
                opacity: 0.6
              }}>
                {t('partner.description')}
              </p>
            </div>
            <Link href="/partnerships" className="btn btn-outline" style={{
              width: '100%',
              textAlign: 'center',
              borderColor: 'rgba(255,255,255,0.2)',
              color: 'white',
              padding: '1.25rem'
            }}>
              {t('partner.cta')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
