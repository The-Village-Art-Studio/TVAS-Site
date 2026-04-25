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
          gap: '8rem',
          alignItems: 'center'
        }}>
          {/* Image Block */}
          <div style={{
            aspectRatio: '4/5',
            background: 'var(--muted) url("/about-studio.png") center/cover',
            borderRadius: '2px',
            position: 'relative'
          }} className="reveal">
            <div style={{
              position: 'absolute',
              bottom: '3rem',
              right: '-2rem',
              background: 'white',
              padding: '2.5rem 3rem',
              boxShadow: '0 30px 60px rgba(0,0,0,0.08)',
              zIndex: 2
            }}>
              <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.25rem', letterSpacing: '-0.03em' }}>
                The Village Art Studio
              </p>
              <p style={{ fontSize: '0.7rem', opacity: 0.4, marginTop: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.2em', fontWeight: 700 }}>
                Established in Toronto
              </p>
            </div>
          </div>

          {/* Text Block */}
          <div style={{ paddingRight: '2rem' }} className="reveal delay-2">
            <span className="caption" style={{ display: 'block', marginBottom: '2rem' }}>
              {t('eyebrow')}
            </span>
            <h2 style={{ marginBottom: '3rem', lineHeight: 1.1 }}>{t('headline')}</h2>
            <p style={{ fontSize: '1.125rem', lineHeight: '2', marginBottom: '1.5rem', opacity: 0.7 }}>
              {t('body1')}
            </p>
            <p style={{ fontSize: '1.125rem', lineHeight: '2', marginBottom: '4rem', opacity: 0.7 }}>
              {t('body2')}
            </p>
            <Link href="/about" className="link-editorial" style={{ fontSize: '1rem' }}>
              {t('cta')} &rarr;
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
