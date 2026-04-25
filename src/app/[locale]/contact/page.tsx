import {useTranslations} from 'next-intl';
import PageHero from '@/components/shared/PageHero';
import {getTranslations} from 'next-intl/server';
import { Mail, MapPin, MessageSquare, Globe, Send, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'Pages.Contact.meta'});
  return {
    title: t('title'),
    description: t('description')
  };
}

export default function ContactPage() {
  const t = useTranslations('Pages.Contact');

  return (
    <main className="bg-background">
      <PageHero 
        eyebrow={t('hero.eyebrow')}
        headline={t('hero.headline')}
        lead={t('hero.lead')}
      />

      <section className="py-24 lg:py-40 relative overflow-hidden">
        {/* Background Blobs */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[10%] left-[-5%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-[20%] right-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[100px] animate-pulse" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-start">
            {/* Contact Form */}
            <div className="p-8 lg:p-12 rounded-[3rem] bg-card/50 backdrop-blur-xl border border-border/50 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-16 -mt-16" />
              
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest mb-10">
                  <Send size={12} />
                  {t('form.submit')}
                </div>
                
                <form action="mailto:info@tvas.ca" method="get" encType="text/plain" className="space-y-10">
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 block px-1">
                      {t('form.nameLabel')} <span className="text-primary">*</span>
                    </label>
                    <input 
                      type="text" 
                      name="name"
                      placeholder={t('form.namePlaceholder')}
                      required
                      className="w-100 w-full bg-transparent border-b border-border/50 py-4 px-1 text-lg font-medium outline-none focus:border-primary transition-colors placeholder:text-muted-foreground/30"
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 block px-1">
                      {t('form.emailLabel')} <span className="text-primary">*</span>
                    </label>
                    <input 
                      type="email" 
                      name="email"
                      placeholder={t('form.emailPlaceholder')}
                      required
                      className="w-100 w-full bg-transparent border-b border-border/50 py-4 px-1 text-lg font-medium outline-none focus:border-primary transition-colors placeholder:text-muted-foreground/30"
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 block px-1">
                      {t('form.subjectLabel')}
                    </label>
                    <div className="relative">
                      <select 
                        name="subject"
                        className="w-100 w-full bg-transparent border-b border-border/50 py-4 px-1 text-lg font-medium outline-none focus:border-primary transition-colors appearance-none cursor-pointer"
                      >
                        <option value="General inquiry">{t('form.subjectPlaceholder')}</option>
                        <option value={t('paths.artist.subject')}>{t('paths.artist.label')}</option>
                        <option value={t('paths.partner.subject')}>{t('paths.partner.label')}</option>
                      </select>
                      <ArrowRight size={18} className="absolute right-2 top-1/2 -translate-y-1/2 rotate-90 text-primary pointer-events-none" />
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 block px-1">
                      {t('form.messageLabel')} <span className="text-primary">*</span>
                    </label>
                    <textarea 
                      name="body"
                      rows={5}
                      placeholder={t('form.messagePlaceholder')}
                      required
                      className="w-100 w-full bg-transparent border-b border-border/50 py-4 px-1 text-lg font-medium outline-none focus:border-primary transition-colors placeholder:text-muted-foreground/30 resize-none"
                    />
                  </div>
                  
                  <Button type="submit" size="lg" className="w-full h-16 text-lg font-bold rounded-2xl bg-primary text-white shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all duration-500">
                    {t('form.submit')}
                  </Button>
                </form>
              </div>
            </div>

            {/* Contact Info & Paths */}
            <div className="flex flex-col gap-12 lg:gap-20">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-8">
                <div className="group p-10 rounded-[2.5rem] bg-card/50 backdrop-blur-xl border border-border/50 shadow-xl hover:shadow-2xl transition-all duration-500">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-8 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                    <MessageSquare size={24} />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors leading-tight">
                    {t('paths.artist.label')}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {t('paths.artist.description')}
                  </p>
                </div>
                
                <div className="group p-10 rounded-[2.5rem] bg-card/50 backdrop-blur-xl border border-border/50 shadow-xl hover:shadow-2xl transition-all duration-500">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-8 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                    <MapPin size={24} />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors leading-tight">
                    {t('paths.partner.label')}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {t('paths.partner.description')}
                  </p>
                </div>
              </div>

              <div className="p-10 lg:p-12 border-t border-border/50 grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-primary">
                    <Mail size={18} />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">
                      {t('info.emailLabel')}
                    </span>
                  </div>
                  <a href={`mailto:${t('info.email')}`} className="text-2xl font-bold hover:text-primary transition-colors block">
                    {t('info.email')}
                  </a>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-primary">
                    <MapPin size={18} />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">
                      {t('info.locationLabel')}
                    </span>
                  </div>
                  <p className="text-2xl font-bold">
                    {t('info.location')}
                  </p>
                </div>
                
                <div className="space-y-6 md:col-span-2 pt-4">
                  <div className="flex items-center gap-3 text-primary">
                    <Globe size={18} />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">
                      {t('info.followLabel')}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-8">
                    <a href="#" className="text-lg font-bold hover:text-primary transition-all hover:translate-x-1 flex items-center gap-2">
                      Instagram <ArrowRight size={16} />
                    </a>
                    <a href="#" className="text-lg font-bold hover:text-primary transition-all hover:translate-x-1 flex items-center gap-2">
                      TikTok <ArrowRight size={16} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
