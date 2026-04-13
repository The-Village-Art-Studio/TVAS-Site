import Hero from '@/components/Hero';
import PodcastTeaser from '@/components/PodcastTeaser';
import ShowcaseTeaser from '@/components/ShowcaseTeaser';
import WorkshopCTA from '@/components/WorkshopCTA';

export default function HomePage() {
  return (
    <main>
      <Hero />
      <PodcastTeaser />
      <ShowcaseTeaser />
      <WorkshopCTA />
      
      {/* Editorial Pull Quote */}
      <section className="section" style={{ background: 'var(--muted)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="caption" style={{ display: 'block', marginBottom: '2rem' }}>
            Our Mission
          </span>
          <blockquote style={{ 
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
            fontWeight: 700,
            fontStyle: 'italic',
            maxWidth: '900px',
            margin: '0 auto',
            lineHeight: 1.4,
            letterSpacing: '-0.01em',
            color: 'var(--foreground)'
          }}>
            "A creative platform that helps local artists get seen, heard, and connected — through interviews, showcases, and genuine community."
          </blockquote>
          <div style={{ 
            width: '48px', 
            height: '3px', 
            background: 'var(--primary)', 
            margin: '3rem auto 0',
            borderRadius: '2px'
          }} />
        </div>
      </section>
    </main>
  );
}
