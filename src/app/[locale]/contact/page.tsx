import PageHero from '@/components/shared/PageHero';
import { getTranslations } from 'next-intl/server';
import { Mail, MapPin, MessageSquare, Globe, ArrowRight } from 'lucide-react';
import ContactForm from '@/components/ContactForm';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Pages.Contact.meta' });
  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function ContactPage() {
  const t = await getTranslations('Pages.Contact');

  return (
    <main>
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

            {/* Contact Form — client component, i18n labels passed as props */}
            <ContactForm
              labels={{
                submit: t('form.submit'),
                nameLabel: t('form.nameLabel'),
                namePlaceholder: t('form.namePlaceholder'),
                emailLabel: t('form.emailLabel'),
                emailPlaceholder: t('form.emailPlaceholder'),
                subjectLabel: t('form.subjectLabel'),
                subjectPlaceholder: t('form.subjectPlaceholder'),
                messageLabel: t('form.messageLabel'),
                messagePlaceholder: t('form.messagePlaceholder'),
                artistSubject: t('paths.artist.subject'),
                artistLabel: t('paths.artist.label'),
                partnerSubject: t('paths.partner.subject'),
                partnerLabel: t('paths.partner.label'),
              }}
            />

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
                  <p className="text-2xl font-bold">{t('info.location')}</p>
                </div>

                <div className="space-y-6 md:col-span-2 pt-4">
                  <div className="flex items-center gap-3 text-primary">
                    <Globe size={18} />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">
                      {t('info.followLabel')}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-8">
                    <a href="https://www.facebook.com/profile.php?id=61554590920288" target="_blank" rel="noopener noreferrer" className="text-lg font-bold hover:text-primary transition-all hover:translate-x-1 flex items-center gap-2">
                      Facebook <ArrowRight size={16} />
                    </a>
                    <a href="https://www.instagram.com/tvas.ca/" target="_blank" rel="noopener noreferrer" className="text-lg font-bold hover:text-primary transition-all hover:translate-x-1 flex items-center gap-2">
                      Instagram <ArrowRight size={16} />
                    </a>
                    <a href="https://www.tiktok.com/@tvas.ca" target="_blank" rel="noopener noreferrer" className="text-lg font-bold hover:text-primary transition-all hover:translate-x-1 flex items-center gap-2">
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
