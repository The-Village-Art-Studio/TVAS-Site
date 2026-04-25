import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/routing';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader } from './ui/card';

export default function DoubleCTA() {
  const t = useTranslations('FinalCTA');

  return (
    <section className="py-24 lg:py-40 bg-foreground text-background overflow-hidden relative">
      {/* Background patterns */}
      <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[50%] h-[50%] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-20 max-w-4xl mx-auto">
          <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-8">
            {t('eyebrow')}
          </span>
          <h2 className="text-4xl lg:text-6xl font-extrabold tracking-tight leading-tight text-white">
            {t('headline')}
          </h2>
        </div>

        {/* Dual Path Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Artist Path */}
          <Card className="bg-white/5 border-white/10 backdrop-blur-md p-8 lg:p-12 flex flex-col justify-between group hover:border-primary/50 transition-all duration-500">
            <CardHeader className="p-0">
              <span className="text-primary font-bold uppercase tracking-[0.3em] text-xs mb-8 block opacity-80">
                {t('artist.label')}
              </span>
              <p className="text-white/60 text-xl leading-relaxed mb-12 font-medium">
                {t('artist.description')}
              </p>
            </CardHeader>
            <CardContent className="p-0 pt-8">
              <Button asChild size="lg" className="w-full h-14 text-lg font-bold rounded-xl shadow-2xl shadow-primary/20 hover:shadow-primary/40 group-hover:scale-[1.02] transition-all">
                <Link href="/for-artists">
                  {t('artist.cta')}
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Partner Path */}
          <Card className="bg-white/5 border-white/10 backdrop-blur-md p-8 lg:p-12 flex flex-col justify-between group hover:border-primary/50 transition-all duration-500">
            <CardHeader className="p-0">
              <span className="text-primary font-bold uppercase tracking-[0.3em] text-xs mb-8 block opacity-80">
                {t('partner.label')}
              </span>
              <p className="text-white/60 text-xl leading-relaxed mb-12 font-medium">
                {t('partner.description')}
              </p>
            </CardHeader>
            <CardContent className="p-0 pt-8">
              <Button asChild size="lg" className="w-full h-14 text-lg font-bold rounded-xl bg-primary hover:bg-primary/90 text-white shadow-2xl shadow-primary/20 hover:shadow-primary/40 group-hover:scale-[1.02] transition-all">
                <Link href="/partnerships">
                  {t('partner.cta')}
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
