import PageHero from '@/components/shared/PageHero';
import ArtistMemberCard, { ArtistType } from '@/components/cards/ArtistMemberCard';
import CTABanner from '@/components/shared/CTABanner';
import { getTranslations } from 'next-intl/server';
import { Users } from 'lucide-react';
import { Link } from '@/i18n/routing';
import prisma from '@/lib/prisma';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Pages.Members.meta' });
  return {
    title: t('title'),
    description: t('description'),
  };
}

async function getMembers() {
  try {
    return await prisma.member.findMany({
      orderBy: { createdAt: 'asc' },
      select: { id: true, name: true, type: true, imageUrl: true },
    });
  } catch (error) {
    console.error('Failed to fetch members:', error);
    return [];
  }
}

export default async function MembersPage() {
  const [members, t] = await Promise.all([
    getMembers(),
    getTranslations('Pages.Members'),
  ]);

  return (
    <main>
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

          {members.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
              {members.map((member, index) => (
                <div
                  key={member.id}
                  className="animate-in fade-in slide-in-from-bottom-8 duration-1000"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <Link href={`/members/${member.id}`} className="block">
                    <ArtistMemberCard
                      name={member.name}
                      type={member.type as ArtistType}
                      typeLabel={t(`list.types.${member.type}`)}
                      imageUrl={member.imageUrl}
                    />
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-24 text-muted-foreground">
              <Users size={48} className="mx-auto mb-4 opacity-30" />
              <p className="text-lg font-medium">No artists found.</p>
            </div>
          )}
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
