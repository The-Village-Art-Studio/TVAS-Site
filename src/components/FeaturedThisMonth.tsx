import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/routing';

export default function FeaturedThisMonth() {
  const t = useTranslations('Featured');

  return (
    <section className="section">
      <div className="container">
        {/* Section Header */}
        <div style={{ marginBottom: '4rem' }}>
          <span className="caption" style={{ display: 'block', marginBottom: '1rem' }}>
            {t('eyebrow')}
          </span>
          <h2>{t('headline')}</h2>
          <div className="divider" />
        </div>

        {/* Asymmetric editorial grid: Large + Two stacked */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem',
          alignItems: 'start'
        }}>
          {/* Podcast Feature — Large */}
          <div style={{
            gridColumn: 'span 2',
            background: 'var(--foreground)',
            color: 'white',
            borderRadius: '4px',
            overflow: 'hidden',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            minHeight: '320px'
          }}>
            {/* Image Area */}
            <div style={{ background: '#2a2a2a', minHeight: '100%' }} />
            {/* Content Area */}
            <div style={{ padding: '3rem' }}>
              <span className="caption" style={{ color: 'var(--primary)', display: 'block', marginBottom: '1.5rem' }}>
                {t('podcast.label')}
              </span>
              <h3 style={{ color: 'white', marginBottom: '1rem', fontSize: '1.5rem' }}>
                Episode Title Placeholder
              </h3>
              <p style={{ opacity: 0.7, marginBottom: '2rem', lineHeight: '1.7' }}>
                A conversation with a Toronto-based artist about the intersection of public art and community belonging.
              </p>
              <a href="/podcast" className="link-editorial" style={{ color: 'var(--primary)' }}>
                {t('podcast.cta')} →
              </a>
            </div>
          </div>

          {/* Featured Artist Card */}
          <div style={{
            background: 'var(--muted)',
            borderRadius: '4px',
            overflow: 'hidden'
          }}>
            <div style={{ aspectRatio: '1.3', background: '#ddd' }} />
            <div style={{ padding: '2rem' }}>
              <span className="caption" style={{ display: 'block', marginBottom: '1rem' }}>
                {t('showcase.label')}
              </span>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '1.5rem' }}>
                Artist Name Placeholder
              </h3>
              <Link href="/showcase" className="link-editorial">
                {t('showcase.cta')} →
              </Link>
            </div>
          </div>

          {/* Workshop Card */}
          <div style={{
            background: 'var(--primary-light)',
            borderRadius: '4px',
            padding: '2.5rem',
            borderLeft: '4px solid var(--primary)'
          }}>
            <span className="caption" style={{ display: 'block', marginBottom: '1rem' }}>
              {t('workshop.label')}
            </span>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem' }}>
              Artist Experience at La Gloria
            </h3>
            <p style={{ opacity: 0.8, marginBottom: '2rem', lineHeight: '1.7' }}>
              Date, time and artist TBD. Check back soon for the next intimate workshop experience.
            </p>
            <Link href="/workshops" className="btn btn-primary" style={{ display: 'inline-flex' }}>
              {t('workshop.cta')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
