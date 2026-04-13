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
      
      {/* Editorial Quote Section */}
      <section style={{ padding: '8rem 0', textAlign: 'center' }}>
        <div className="container">
          <blockquote style={{ fontSize: '2rem', fontStyle: 'italic', maxWidth: '800px', margin: '0 auto', color: '#444' }}>
            "The Village Art Studio is a creative platform that helps local artists get seen, heard, and connected."
          </blockquote>
        </div>
      </section>
    </main>
  );
}
