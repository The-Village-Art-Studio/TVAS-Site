import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/routing';

export default function Hero() {
  const t = useTranslations('Hero');

  return (
    <section style={{
      padding: 'calc(var(--section-spacing-desktop) * 1.25) 0',
      backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.7)), url('/hero-mockup.png')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      textAlign: 'center',
      position: 'relative',
      minHeight: '85vh',
      display: 'flex',
      alignItems: 'center'
    }}>
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <span className="caption" style={{ display: 'block', marginBottom: '1.5rem' }}>
          {t('eyebrow')}
        </span>
        <h1 style={{ maxWidth: '1000px', margin: '0 auto 2rem' }}>
          {t('headline')}
        </h1>
        <p style={{
          fontSize: 'clamp(1.1rem, 3vw, 1.25rem)',
          maxWidth: '680px',
          margin: '0 auto 3.5rem',
          opacity: 0.8,
          lineHeight: '1.8'
        }}>
          {t('subheadline')}
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/workshops" className="btn btn-primary" style={{
            padding: '1.2rem 2.8rem',
            boxShadow: '0 10px 30px rgba(12, 188, 245, 0.25)'
          }}>
            {t('ctaPrimary')}
          </Link>
          <Link href="/podcast" className="btn btn-outline">
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
        height: '20vh',
        background: 'linear-gradient(to top, var(--background), transparent)',
        zIndex: 1
      }} />
    </section>
  );
}
