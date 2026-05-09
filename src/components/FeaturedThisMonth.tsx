import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import { Mic, Image as ImageIcon, Calendar, ArrowRight, MapPin, Users, Clock } from 'lucide-react';
import prisma from '@/lib/prisma';

export default async function FeaturedThisMonth({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'Featured' });

  // Fetch the latest content
  const latestPodcast = await prisma.podcast.findFirst({ orderBy: { createdAt: 'desc' } });
  const latestShowcase = await prisma.showcase.findFirst({ orderBy: { createdAt: 'desc' } });
  const latestEvent = await prisma.event.findFirst({ orderBy: { createdAt: 'desc' } });

  // Use the latest podcast's cover image
  const heroImageUrl = latestPodcast?.imageUrl || '/podcast-cover.png';

  return (
    <section className="py-16 lg:py-24 relative overflow-hidden">
      {/* Background Blobs for depth */}
      <div className="absolute top-[20%] right-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-[-5%] w-[30%] h-[30%] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="mb-12 lg:mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] mb-4 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            {t('eyebrow')}
          </span>
          <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight max-w-2xl animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-100">
            {t('headline')}
          </h2>
        </div>

        {/* 3-Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          
          {/* Podcast Card - Dark & Moody Theme */}
          <div className="group relative bg-[#0f1115] border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl transition-all duration-500 hover:border-indigo-500/40 flex flex-col animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
            <div className="relative aspect-square shrink-0 overflow-hidden">
              <div 
                className="absolute inset-0 bg-center bg-cover transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${heroImageUrl})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f1115] via-transparent to-transparent" />
              <div className="absolute top-6 left-6 px-4 py-2 bg-indigo-600 text-white rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 z-20 shadow-lg">
                <Mic size={14} />
                {t('podcast.label')}
              </div>
            </div>
            <div className="p-8 flex-1 flex flex-col">
              <h3 className="text-xl font-extrabold text-white mb-4 leading-tight">
                {latestPodcast ? (locale === 'fr' ? latestPodcast.titleFr : latestPodcast.titleEn) : 'The Voice of the Village'}
              </h3>
              <p className="text-white/60 mb-8 leading-relaxed text-sm line-clamp-3">
                {latestPodcast ? (locale === 'fr' ? latestPodcast.descriptionFr : latestPodcast.descriptionEn) : "Deep-dive conversations with the creators shaping Toronto's cultural landscape."}
              </p>
              <div className="mt-auto">
                <Button asChild className="w-full rounded-full h-12 bg-indigo-600 hover:bg-indigo-700 text-white border-0 transition-all duration-300">
                  <Link href="/podcast">
                    {t('podcast.cta')}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Showcase Card - Elegant Gallery Theme */}
          <div className="group relative bg-white border border-slate-100 rounded-[2.5rem] overflow-hidden shadow-xl transition-all duration-500 hover:border-primary/20 flex flex-col animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
            <div className="relative aspect-square shrink-0 overflow-hidden bg-slate-50">
              <div 
                className="absolute inset-0 bg-center bg-cover transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${latestShowcase?.imageUrl || '/showcase-thumb.png'})` }}
              />
              <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500" />
              <div className="absolute top-6 left-6 px-4 py-2 bg-white text-slate-900 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-md flex items-center gap-2 z-20">
                <ImageIcon size={14} className="text-primary" />
                {t('showcase.label')}
              </div>
            </div>
            <div className="p-8 flex-1 flex flex-col">
              <h3 className="text-xl font-extrabold text-slate-900 mb-4 leading-tight">
                {latestShowcase ? latestShowcase.artistName : 'Monthly Showcase'}
              </h3>
              <p className="text-slate-600 mb-8 leading-relaxed text-sm line-clamp-3">
                {latestShowcase ? (locale === 'fr' ? latestShowcase.statementFr : latestShowcase.statementEn) : "A dedicated focus on one local artist, their work, and their unique creative process."}
              </p>
              <div className="mt-auto">
                <Button asChild variant="outline" className="w-full rounded-full h-12 border-slate-200 text-slate-900 hover:bg-slate-50 hover:border-slate-900 transition-all duration-300">
                  <Link href="/showcase">
                    {t('showcase.cta')}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Upcoming Workshop Card - Vibrant Experience Theme */}
          <div className="group relative bg-primary border border-primary/10 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-primary/20 flex flex-col animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-400">
            <div className="relative aspect-square shrink-0 overflow-hidden">
              {latestEvent ? (
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110"
                  style={{ backgroundImage: `url(${latestEvent.imageUrl})` }}
                />
              ) : (
                <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                  <Calendar className="text-white/20 w-16 h-16" />
                </div>
              )}
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
              <div className="absolute top-6 left-6 px-4 py-2 bg-white text-primary rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 z-20 shadow-lg">
                <Calendar size={14} />
                {t('workshop.label')}
              </div>
            </div>

            <div className="flex-1 p-8 flex flex-col relative overflow-hidden">
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all duration-700 z-0" />
              
              <div className="relative z-10 flex flex-col h-full">
                {latestEvent ? (
                  <>
                    <h3 className="text-xl font-extrabold text-white mb-6 leading-tight">
                      {locale === 'fr' ? latestEvent.titleFr : latestEvent.titleEn}
                    </h3>
                    
                    <div className="space-y-4 mb-8">
                      <div className="flex items-center gap-3 text-white/90">
                        <div className="p-1.5 bg-white/10 rounded-lg">
                          <MapPin size={14} />
                        </div>
                        <p className="text-xs font-medium truncate">{locale === 'fr' ? latestEvent.locationFr : latestEvent.locationEn}</p>
                      </div>
                      <div className="flex items-center gap-3 text-white/90">
                        <div className="p-1.5 bg-white/10 rounded-lg">
                          <Users size={14} />
                        </div>
                        <p className="text-xs font-medium">{locale === 'fr' ? latestEvent.capacityFr : latestEvent.capacityEn}</p>
                      </div>
                      <div className="flex items-center gap-3 text-white/90">
                        <div className="p-1.5 bg-white/10 rounded-lg">
                          <Clock size={14} />
                        </div>
                        <p className="text-xs font-medium">{locale === 'fr' ? latestEvent.durationFr : latestEvent.durationEn}</p>
                      </div>
                    </div>

                    <div className="mt-auto">
                      <Button asChild size="lg" className="w-full h-12 text-base font-bold rounded-full bg-white hover:bg-slate-100 text-primary shadow-xl transition-all duration-300 border-0">
                        <Link href="/workshops">
                          {t('workshop.cta')}
                        </Link>
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col h-full">
                    <h3 className="text-xl font-extrabold text-white mb-4 leading-tight">
                      {locale === 'fr' ? "Expériences à Venir" : "Experiences Coming Soon"}
                    </h3>
                    <p className="text-white/80 text-sm leading-relaxed mb-8">
                      {locale === 'fr'
                        ? "Restez à l'affût pour notre prochain événement !"
                        : "Follow us to be the first to know about new events."}
                    </p>
                    <div className="mt-auto flex flex-col gap-3">
                      <a 
                        href="https://www.instagram.com/tvas.ca/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white font-bold hover:bg-white/20 transition-all uppercase tracking-widest text-[10px]"
                      >
                        Instagram
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
