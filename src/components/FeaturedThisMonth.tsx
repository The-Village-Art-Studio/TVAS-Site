import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import { Mic, Image as ImageIcon, Calendar, ArrowRight, MapPin, Users, Clock } from 'lucide-react';

export default function FeaturedThisMonth() {
  const t = useTranslations('Featured');

  return (
    <section className="py-24 lg:py-40 relative overflow-hidden">
      {/* Background Blobs for depth */}
      <div className="absolute top-[20%] right-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-[-5%] w-[30%] h-[30%] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="mb-16 lg:mb-24">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] mb-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            {t('eyebrow')}
          </span>
          <h2 className="text-4xl lg:text-6xl font-extrabold tracking-tight max-w-2xl animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-100">
            {t('headline')}
          </h2>
        </div>

        {/* Side-by-Side Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Spotlight Features (Stack) */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            {/* Podcast Card */}
            <div className="group flex-1 relative bg-white/5 dark:bg-black/20 backdrop-blur-xl border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl transition-all duration-500 hover:border-primary/30 flex flex-col md:flex-row animate-in fade-in slide-in-from-left-8 duration-1000 delay-200">
              <div className="md:w-1/2 relative h-48 md:h-auto overflow-hidden">
                <div 
                  className="absolute inset-0 bg-[#1a1a1a] bg-[url('/podcast-cover-placeholder.png')] bg-center bg-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-black/40" />
                <div className="absolute top-6 left-6 px-4 py-2 bg-primary/90 text-white rounded-full text-[10px] font-bold uppercase tracking-widest backdrop-blur-md flex items-center gap-2">
                  <Mic size={14} />
                  {t('podcast.label')}
                </div>
              </div>
              <div className="md:w-1/2 p-8 flex flex-col justify-center bg-white/40 dark:bg-black/40">
                <h3 className="text-2xl font-extrabold text-foreground mb-4 leading-tight">
                  The Voice of the Village
                </h3>
                <p className="text-foreground/70 mb-6 leading-relaxed text-sm">
                  Deep-dive conversations with the creators shaping Toronto&apos;s cultural landscape.
                </p>
                <Button asChild variant="outline" className="self-start rounded-full px-6 h-10 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300">
                  <Link href="/podcast">
                    {t('podcast.cta')}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Showcase Card */}
            <div className="group flex-1 relative bg-white/5 dark:bg-black/20 backdrop-blur-xl border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl transition-all duration-500 hover:border-primary/30 flex flex-col md:flex-row animate-in fade-in slide-in-from-left-8 duration-1000 delay-300">
              <div className="md:w-1/2 relative h-48 md:h-auto overflow-hidden">
                <div 
                  className="absolute inset-0 bg-[#f0f0f0] bg-[url('/showcase-thumb.png')] bg-center bg-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                <div className="absolute top-6 left-6 px-4 py-2 bg-primary/90 text-white rounded-full text-[10px] font-bold uppercase tracking-widest backdrop-blur-md flex items-center gap-2">
                  <ImageIcon size={14} />
                  {t('showcase.label')}
                </div>
              </div>
              <div className="md:w-1/2 p-8 flex flex-col justify-center bg-white/40 dark:bg-black/40">
                <h3 className="text-2xl font-bold text-foreground mb-4 leading-tight">
                  Monthly Showcase
                </h3>
                <p className="text-foreground/70 mb-6 leading-relaxed text-sm">
                  A dedicated focus on one local artist, their work, and their unique creative process.
                </p>
                <Button asChild variant="outline" className="self-start rounded-full px-6 h-10 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300">
                  <Link href="/showcase">
                    {t('showcase.cta')}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Right Column: Upcoming Workshops Information */}
          <div className="lg:col-span-5">
            <div className="h-full bg-primary border border-primary/20 rounded-[2.5rem] p-8 lg:p-12 shadow-2xl shadow-primary/20 flex flex-col justify-between animate-in fade-in slide-in-from-right-8 duration-1000 delay-400 relative overflow-hidden group">
              {/* Decorative circle */}
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all duration-700" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 text-white/80 text-[10px] font-bold uppercase tracking-widest mb-10">
                  <Calendar size={18} />
                  {t('workshop.label')}
                </div>
                
                <h3 className="text-3xl lg:text-4xl font-extrabold text-white mb-8 leading-tight">
                  Artist Experiences @ La Gloria
                </h3>
                
                <div className="space-y-6 mb-10">
                  <div className="flex items-start gap-4">
                    <div className="mt-1 p-2 bg-white/10 rounded-xl text-white shrink-0">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <h4 className="text-white font-bold mb-0.5 text-lg">Location</h4>
                      <p className="text-white/70 text-sm">La Gloria Mexican Coffee, Toronto</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="mt-1 p-2 bg-white/10 rounded-xl text-white shrink-0">
                      <Users size={20} />
                    </div>
                    <div>
                      <h4 className="text-white font-bold mb-0.5 text-lg">Capacity</h4>
                      <p className="text-white/70 text-sm">Limited to 8-12 guests for an intimate setting.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="mt-1 p-2 bg-white/10 rounded-xl text-white shrink-0">
                      <Clock size={20} />
                    </div>
                    <div>
                      <h4 className="text-white font-bold mb-0.5 text-lg">Duration</h4>
                      <p className="text-white/70 text-sm">Typical sessions last 2.5 - 3 hours.</p>
                    </div>
                  </div>
                </div>

                <p className="text-white/80 text-base leading-relaxed mb-10 italic border-l-4 border-white/20 pl-6">
                  &quot;Intimate workshops hosted at La Gloria Mexican Coffee. Connect with local artists over craft and conversation.&quot;
                </p>
              </div>

              <Button asChild size="lg" className="w-full h-16 text-xl font-bold rounded-2xl bg-white hover:bg-white/90 text-primary shadow-2xl transition-all duration-300 relative z-10">
                <Link href="/workshops">
                  {t('workshop.cta')}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
