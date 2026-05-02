import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { getTranslations } from 'next-intl/server';
import { ArrowLeft, Globe, Camera, MessageSquare, Palette, Box, Cpu, Music, PenTool, AtSign, Hash } from 'lucide-react';
import { ArtistType } from '@/components/cards/ArtistMemberCard';
import CTABanner from '@/components/shared/CTABanner';
import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';

const TypeIcon = ({ type, size = 14 }: { type: ArtistType; size?: number }) => {
  switch (type) {
    case 'painter':      return <Palette size={size} />;
    case 'photographer': return <Camera size={size} />;
    case 'sculptor':     return <Box size={size} />;
    case 'digital':      return <Cpu size={size} />;
    case 'musician':     return <Music size={size} />;
    case 'writer':       return <PenTool size={size} />;
    default:             return <Palette size={size} />;
  }
};

async function getMember(id: string) {
  try {
    return await prisma.member.findUnique({ where: { id } });
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; id: string }> }) {
  const { id } = await params;
  const member = await getMember(id);
  if (!member) return { title: 'Artist Not Found' };
  return {
    title: `${member.name} | The Village Art Studio`,
    description: `View the artist profile of ${member.name} on The Village Art Studio.`,
  };
}

export default async function ArtistProfilePage({ params }: { params: Promise<{ locale: string; id: string }> }) {
  const { id, locale } = await params;
  const [member, t] = await Promise.all([
    getMember(id),
    getTranslations('Pages.Members'),
  ]);

  if (!member) notFound();

  // Parse social links JSON
  let socialLinks: { website?: string; instagram?: string; twitter?: string } = {};
  try {
    socialLinks = member.socialLinks ? JSON.parse(member.socialLinks) : {};
  } catch { /* ignore */ }

  // Use real statement based on locale, fallback to English
  const statement = locale === 'fr' && member.statementFr ? member.statementFr : member.statementEn;

  return (
    <main className="pt-32 lg:pt-40 pb-24">
      {/* Background Blobs */}
      <div className="absolute top-0 left-0 w-full h-[800px] overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] right-[-10%] w-[40%] h-[50%] bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute top-[30%] left-[-10%] w-[50%] h-[40%] bg-primary/5 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-12">
          <Link href="/members" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft size={16} />
            Back to Directory
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 mb-32">
          {/* Left Column: Image */}
          <div className="lg:col-span-5 relative">
            <div className="sticky top-40">
              <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl border border-border/50">
                <Image
                  src={member.imageUrl}
                  alt={member.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Right Column: Details */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest mb-6 self-start">
              <TypeIcon type={member.type as ArtistType} size={14} />
              {t(`list.types.${member.type}`)}
            </div>

            <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight mb-12">
              {member.name}
            </h1>

            <div className="prose prose-lg dark:prose-invert max-w-none mb-16">
              <p className="text-xl leading-relaxed text-muted-foreground">
                {statement}
              </p>
            </div>

            {/* Social Links */}
            {(socialLinks.website || socialLinks.instagram || socialLinks.twitter) && (
              <div className="pt-12 border-t border-border/50">
                <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground/60 mb-6">
                  Connect &amp; Explore
                </h3>
                <div className="flex flex-wrap gap-6">
                  {socialLinks.website && (
                    <a
                      href={socialLinks.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Portfolio Website"
                      className="w-14 h-14 rounded-full bg-card/50 backdrop-blur-xl border border-border/50 flex items-center justify-center text-foreground hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 shadow-lg hover:shadow-primary/20 hover:-translate-y-1"
                    >
                      <Globe size={24} />
                    </a>
                  )}
                  {socialLinks.instagram && (
                    <a
                      href={`https://instagram.com/${socialLinks.instagram.replace('@', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Instagram"
                      className="w-14 h-14 rounded-full bg-card/50 backdrop-blur-xl border border-border/50 flex items-center justify-center text-foreground hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 shadow-lg hover:shadow-primary/20 hover:-translate-y-1"
                    >
                      <Hash size={24} />
                    </a>
                  )}
                  {socialLinks.twitter && (
                    <a
                      href={`https://x.com/${socialLinks.twitter.replace('@', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="X / Twitter"
                      className="w-14 h-14 rounded-full bg-card/50 backdrop-blur-xl border border-border/50 flex items-center justify-center text-foreground hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 shadow-lg hover:shadow-primary/20 hover:-translate-y-1"
                    >
                      <AtSign size={24} />
                    </a>
                  )}
                  {/* Always show contact icon */}
                  <a
                    href="/contact"
                    title="Contact"
                    className="w-14 h-14 rounded-full bg-card/50 backdrop-blur-xl border border-border/50 flex items-center justify-center text-foreground hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 shadow-lg hover:shadow-primary/20 hover:-translate-y-1"
                  >
                    <MessageSquare size={24} />
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <CTABanner
        eyebrow="Collaborate"
        headline="Work With Our Artists"
        body="Interested in commissioning an artist or featuring them in your next project? Get in touch with us."
        primaryCta={{ label: 'Partner With Us', href: '/contact' }}
        theme="muted"
      />
    </main>
  );
}
