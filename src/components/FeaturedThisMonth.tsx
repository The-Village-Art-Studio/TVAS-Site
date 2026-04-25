import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/routing';

export default function FeaturedThisMonth() {
  const t = useTranslations('Featured');

  return (
    <section className="section">
      <div className="container">
        {/* Section Header */}
        <div style={{ marginBottom: '6rem' }}>
          <span className="caption" style={{ display: 'block', marginBottom: '1.5rem' }}>
            {t('eyebrow')}
          </span>
          <h2 style={{ maxWidth: '600px' }}>{t('headline')}</h2>
        </div>

        {/* Asymmetric editorial grid: Large + Two stacked */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '3rem',
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
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            minHeight: '420px',
            boxShadow: '0 30px 60px rgba(0,0,0,0.15)'
          }}>
            {/* Image Area */}
            <div style={{ background: '#1a1a1a url("/podcast-cover-placeholder.png") center/cover', minHeight: '300px' }} />
            {/* Content Area */}
            <div style={{ padding: '4rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <span className="caption" style={{ color: 'var(--primary)', display: 'block', marginBottom: '2rem' }}>
                {t('podcast.label')}
              </span>
              <h3 style={{ color: 'white', marginBottom: '1.5rem', fontSize: '1.75rem', fontWeight: 800 }}>
                The Voice of the Village
              </h3>
              <p style={{ opacity: 0.6, marginBottom: '2.5rem', lineHeight: '1.8', fontSize: '1.1rem' }}>
                Deep-dive conversations with the creators shaping Toronto&apos;s cultural landscape.
              </p>
              <Link href="/podcast" className="link-editorial" style={{ color: 'var(--primary)', alignSelf: 'start' }}>
                {t('podcast.cta')} &rarr;
              </Link>
            </div>
          </div>

          {/* Featured Artist Card */}
          <div style={{
            background: 'var(--muted)',
            borderRadius: '4px',
            overflow: 'hidden',
            transition: 'transform 0.4s ease, box-shadow 0.4s ease'
          }} className="card-hover">
            <div style={{ aspectRatio: '1', background: '#f0f0f0 url("/showcase-thumb.png") center/cover' }} />
            <div style={{ padding: '2.5rem' }}>
              <span className="caption" style={{ display: 'block', marginBottom: '1rem', opacity: 0.6 }}>
                {t('showcase.label')}
              </span>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '2rem', fontWeight: 800 }}>
                Monthly Showcase
              </h3>
              <Link href="/showcase" className="link-editorial">
                {t('showcase.cta')} &rarr;
              </Link>
            </div>
          </div>

          {/* Workshop Card */}
          <div style={{
            background: 'white',
            borderRadius: '4px',
            padding: '3rem',
            borderTop: '4px solid var(--primary)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.04)'
          }}>
            <span className="caption" style={{ display: 'block', marginBottom: '1.5rem' }}>
              {t('workshop.label')}
            </span>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1.25rem', fontWeight: 800 }}>
              Artist Experiences
            </h3>
            <p style={{ opacity: 0.6, marginBottom: '2.5rem', lineHeight: '1.8' }}>
              Intimate workshops hosted at La Gloria Mexican Coffee. Connect with local artists over craft and conversation.
            </p>
            <Link href="/workshops" className="btn btn-outline" style={{ display: 'inline-flex', width: '100%' }}>
              {t('workshop.cta')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
