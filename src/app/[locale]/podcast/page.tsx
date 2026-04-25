import {useTranslations} from 'next-intl';
import PageHero from '@/components/shared/PageHero';
import EpisodeCard from '@/components/cards/EpisodeCard';
import CTABanner from '@/components/shared/CTABanner';
import {getTranslations} from 'next-intl/server';

export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'Pages.Podcast.meta'});
  return {
    title: t('title'),
    description: t('description')
  };
}

export default function PodcastPage() {
  const t = useTranslations('Pages.Podcast');
  const episodes = t.raw('grid.episodes') as any[];

  return (
    <main>
      <PageHero 
        eyebrow={t('hero.eyebrow')}
        headline={t('hero.headline')}
        lead={t('hero.lead')}
      />

      <section className="section">
        <div className="container">
          {/* Featured Episode */}
          <div style={{
            background: 'var(--foreground)',
            color: 'white',
            borderRadius: '4px',
            overflow: 'hidden',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            marginBottom: '6rem',
            minHeight: '400px'
          }}>
            <div style={{ background: '#222' }} />
            <div style={{ padding: '4rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <span className="caption" style={{ color: 'var(--primary)', marginBottom: '1.5rem' }}>{t('featured.eyebrow')}</span>
              <h2 style={{ color: 'white', marginBottom: '1.5rem' }}>{episodes[0].title}</h2>
              <p style={{ opacity: 0.7, marginBottom: '2.5rem', lineHeight: '1.8', fontSize: '1.1rem' }}>
                {episodes[0].description}
              </p>
              <button className="btn btn-primary" style={{ alignSelf: 'start' }}>{t('featured.listenCta')}</button>
            </div>
          </div>

          <div style={{ marginBottom: '4rem' }}>
            <span className="caption" style={{ display: 'block', marginBottom: '1rem' }}>{t('grid.eyebrow')}</span>
            <h2>{t('grid.headline')}</h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '4rem'
          }}>
            {episodes.slice(1).map((episode, index) => (
              <EpisodeCard 
                key={index}
                number={episode.number}
                title={episode.title}
                artist={episode.artist}
                medium={episode.medium}
                duration={episode.duration}
                description={episode.description}
              />
            ))}
          </div>
        </div>
      </section>

      <CTABanner 
        eyebrow={t('cta.eyebrow')}
        headline={t('cta.headline')}
        body={t('cta.body')}
        primaryCta={{ label: t('cta.primary'), href: '/contact' }}
        secondaryCta={{ label: t('cta.secondary'), href: '/for-artists' }}
      />
    </main>
  );
}
