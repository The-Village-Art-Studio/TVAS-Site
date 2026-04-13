import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/routing';

export default function AboutSection() {
  const t = useTranslations('About');

  return (
    <section className="section" style={{ borderTop: '1px solid var(--border)' }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '6rem',
          alignItems: 'center'
        }}>
          {/* Image Block */}
          <div style={{
            aspectRatio: '4/5',
            background: 'var(--muted)',
            borderRadius: '2px',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{
              position: 'absolute',
              bottom: '2rem',
              left: '2rem',
              background: 'white',
              padding: '1.5rem 2rem',
              borderLeft: '4px solid var(--primary)'
            }}>
              <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.1rem' }}>
                The Village Art Studio
              </p>
              <p style={{ fontSize: '0.85rem', opacity: 0.7, marginTop: '0.3rem' }}>
                Toronto, Ontario
              </p>
            </div>
          </div>

          {/* Text Block */}
          <div>
            <span className="caption" style={{ display: 'block', marginBottom: '1.5rem' }}>
              {t('eyebrow')}
            </span>
            <h2 style={{ marginBottom: '2.5rem' }}>{t('headline')}</h2>
            <p style={{ fontSize: '1.125rem', lineHeight: '1.9', marginBottom: '1.5rem', opacity: 0.85 }}>
              {t('body1')}
            </p>
            <p style={{ fontSize: '1.125rem', lineHeight: '1.9', marginBottom: '3rem', opacity: 0.85 }}>
              {t('body2')}
            </p>
            <Link href="/about" className="link-editorial">
              {t('cta')} →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
