import {useTranslations} from 'next-intl';
import PageHero from '@/components/shared/PageHero';
import ArtistMemberCard, { ArtistType } from '@/components/cards/ArtistMemberCard';
import CTABanner from '@/components/shared/CTABanner';
import {getTranslations} from 'next-intl/server';
import { Users } from 'lucide-react';

export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'Pages.Members.meta'});
  return {
    title: t('title'),
    description: t('description')
  };
}

const MOCK_MEMBERS = [
  { name: 'Elena Marchetti', type: 'painter' as ArtistType, image: '/artists/elena.png' },
  { name: 'Daniel Osei', type: 'photographer' as ArtistType, image: '/artists/daniel.png' },
  { name: 'Maria Santos', type: 'digital' as ArtistType, image: '/artists/maria.png' },
  { name: 'Yuki Tanaka', type: 'sculptor' as ArtistType, image: '/artists/yuki.png' },
  { name: 'Amara Diallo', type: 'musician' as ArtistType, image: '/artists/amara.png' },
  { name: 'Julian Vance', type: 'writer' as ArtistType, image: '/artists/julian.png' },
  { name: 'Sofia Reyes', type: 'painter' as ArtistType, image: '/artists/sofia.png' },
  { name: 'Marcus Chen', type: 'photographer' as ArtistType, image: '/artists/marcus.png' },
];

export default function MembersPage() {
  const t = useTranslations('Pages.Members');

  return (
    <main className="bg-background">
      <PageHero 
        eyebrow={t('hero.eyebrow')}
        headline={t('hero.headline')}
        lead={t('hero.lead')}
      />

      <section className="py-24 lg:py-40 relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-20 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest mb-8">
              <Users size={14} />
              {t('list.eyebrow')}
            </div>
            <h2 className="text-4xl lg:text-6xl font-extrabold tracking-tight mb-8">
              {t('list.headline')}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
            {MOCK_MEMBERS.map((member, index) => (
              <div 
                key={index}
                className="animate-in fade-in slide-in-from-bottom-8 duration-1000"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <ArtistMemberCard 
                  name={member.name}
                  type={member.type}
                  typeLabel={t(`list.types.${member.type}`)}
                  imageUrl={member.image}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner 
        eyebrow={t('cta.eyebrow')}
        headline={t('cta.headline')}
        body={t('cta.body')}
        primaryCta={{ label: t('cta.primary'), href: '/contact' }}
        secondaryCta={{ label: t('cta.secondary'), href: '/contact' }}
        theme="muted"
      />
    </main>
  );
}
