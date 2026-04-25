import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/routing';

export default function Hero() {
  const t = useTranslations('Hero');

  return (
    <section style={{
      padding: 'calc(var(--section-spacing-desktop) * 1.5) 0',
      backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.85), rgba(255, 255, 255, 0.65)), url('/hero-mockup.png')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      textAlign: 'center',
      position: 'relative',
      minHeight: '90vh',
      display: 'flex',
      alignItems: 'center'
    }}>
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <span className="caption" style={{ display: 'block', marginBottom: '2rem' }}>
          {t('eyebrow')}
        </span>
        <h1 style={{ maxWidth: '1100px', margin: '0 auto 2.5rem' }}>
          {t('headline')}
        </h1>
        <p style={{
          fontSize: 'clamp(1.125rem, 2.5vw, 1.35rem)',
          maxWidth: '720px',
          margin: '0 auto 4rem',
          opacity: 0.75,
          lineHeight: '1.9'
        }}>
          {t('subheadline')}
        </p>
        <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/workshops" className="btn btn-primary" style={{
            padding: '1.25rem 3rem',
            boxShadow: '0 15px 35px rgba(12, 188, 245, 0.2)'
          }}>
            {t('ctaPrimary')}
          </Link>
          <Link href="/podcast" className="btn btn-outline" style={{ padding: '1.25rem 3rem' }}>
            {t('ctaSecondary')}
          </Link>
        </div>
      </div>

      {/* Editorial gradient fade */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '30vh',
        background: 'linear-gradient(to top, var(--background), transparent)',
        zIndex: 1
      }} />
    </section>
  );
}
