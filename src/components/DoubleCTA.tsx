import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/routing';

export default function DoubleCTA() {
  const t = useTranslations('FinalCTA');

  return (
    <section className="section" style={{ background: 'var(--foreground)' }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <span className="caption" style={{ display: 'block', marginBottom: '1.5rem', color: 'var(--primary)' }}>
            {t('eyebrow')}
          </span>
          <h2 style={{ color: 'white' }}>{t('headline')}</h2>
        </div>

        {/* Dual Path Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem'
        }}>
          {/* Artist Path */}
          <div style={{
            border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: '4px',
            padding: '3.5rem',
            transition: 'border-color 0.3s ease, background 0.3s ease'
          }}
          className="split-card"
          >
            <span className="caption" style={{ display: 'block', marginBottom: '1.5rem', color: 'var(--primary)' }}>
              {t('artist.label')}
            </span>
            <p style={{
              color: 'white',
              fontSize: '1.125rem',
              lineHeight: '1.8',
              marginBottom: '3rem',
              opacity: 0.85
            }}>
              {t('artist.description')}
            </p>
            <Link href="/for-artists" className="btn btn-primary" style={{ width: '100%', textAlign: 'center' }}>
              {t('artist.cta')}
            </Link>
          </div>

          {/* Partner Path */}
          <div style={{
            border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: '4px',
            padding: '3.5rem',
            transition: 'border-color 0.3s ease, background 0.3s ease'
          }}
          className="split-card"
          >
            <span className="caption" style={{ display: 'block', marginBottom: '1.5rem', color: 'var(--primary)' }}>
              {t('partner.label')}
            </span>
            <p style={{
              color: 'white',
              fontSize: '1.125rem',
              lineHeight: '1.8',
              marginBottom: '3rem',
              opacity: 0.85
            }}>
              {t('partner.description')}
            </p>
            <Link href="/partnerships" className="btn btn-outline" style={{
              width: '100%',
              textAlign: 'center',
              borderColor: 'rgba(255,255,255,0.3)',
              color: 'white'
            }}>
              {t('partner.cta')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
