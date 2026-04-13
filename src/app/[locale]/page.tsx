import Hero from '@/components/Hero';
import Pillars from '@/components/Pillars';
import FeaturedThisMonth from '@/components/FeaturedThisMonth';
import AboutSection from '@/components/AboutSection';
import ForArtistsSection from '@/components/ForArtistsSection';
import PartnershipSection from '@/components/PartnershipSection';
import DoubleCTA from '@/components/DoubleCTA';

export default function HomePage() {
  return (
    <main>
      {/* 1. Hero — The Statement */}
      <Hero />

      {/* 2. Pillars — What We Do */}
      <Pillars />

      {/* 3. Featured This Month — The Living Room */}
      <FeaturedThisMonth />

      {/* 4. About — The Legend */}
      <AboutSection />

      {/* 5. For Artists — The Invitation */}
      <ForArtistsSection />

      {/* 6. Partnerships — The Bridge */}
      <PartnershipSection />

      {/* 7. Final CTA — Choose Your Path */}
      <DoubleCTA />
    </main>
  );
}
