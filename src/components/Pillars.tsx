import {useTranslations} from 'next-intl';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Mic, Palette, Users, Heart, Handshake } from 'lucide-react';

const pillarIcons: Record<string, any> = {
  podcast: Mic,
  showcase: Palette,
  workshops: Users,
  support: Heart,
  partnerships: Handshake,
};

export default function Pillars() {
  const t = useTranslations('Pillars');

  const pillarKeys = ['podcast', 'showcase', 'workshops', 'support', 'partnerships'] as const;

  return (
    <section className="py-24 lg:py-32 bg-muted/30">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-20">
          <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-6">
            {t('eyebrow')}
          </span>
          <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
            {t('headline')}
          </h2>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pillarKeys.map((key, index) => {
            const Icon = pillarIcons[key];
            return (
              <Card key={key} className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300 group hover:shadow-2xl hover:shadow-primary/5">
                <CardHeader>
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-xs font-bold text-primary uppercase tracking-[0.2em] mb-3 opacity-70">
                    {t(`items.${key}.label`)}
                  </div>
                  <CardTitle className="text-2xl font-extrabold tracking-tight">
                    {t(`items.${key}.title`)}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {t(`items.${key}.description`)}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
