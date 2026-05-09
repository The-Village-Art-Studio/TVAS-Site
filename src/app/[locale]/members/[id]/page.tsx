import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { getTranslations } from 'next-intl/server';
import { ArrowLeft, Globe, Camera, Palette, Box, Cpu, Music, PenTool } from 'lucide-react';
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
  let socialLinks: { website?: string; instagram?: string; twitter?: string; tiktok?: string } = {};
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
              <div className="relative aspect-square rounded-[3rem] overflow-hidden shadow-2xl border border-border/50">
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
            {(socialLinks.website || socialLinks.instagram || socialLinks.twitter || socialLinks.tiktok) && (
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
                      <Globe size={22} />
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
                      {/* Instagram SVG */}
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                        <circle cx="12" cy="12" r="4"/>
                        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
                      </svg>
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
                      {/* X (Twitter) SVG */}
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.263 5.632 5.9-5.632Zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                    </a>
                  )}
                  {socialLinks.tiktok && (
                    <a
                      href={`https://tiktok.com/@${socialLinks.tiktok.replace('@', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="TikTok"
                      className="w-14 h-14 rounded-full bg-card/50 backdrop-blur-xl border border-border/50 flex items-center justify-center text-foreground hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 shadow-lg hover:shadow-primary/20 hover:-translate-y-1"
                    >
                      {/* TikTok SVG */}
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z"/>
                      </svg>
                    </a>
                  )}
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
