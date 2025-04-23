import { useLanguage } from "@/context/LanguageContext";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { Check } from "lucide-react";

const PricingSection = () => {
  const { t, dir } = useLanguage();

  const plans = [
    {
      name: t('pricing.free.title'),
      price: t('pricing.free.price'),
      period: t('pricing.free.period'),
      description: t('pricing.free.description'),
      features: [
        { name: t('pricing.free.monthlyMessages'), value: '25' },
        { name: t('pricing.free.dailyMessages'), value: '7' },
        { name: t('pricing.free.integrationCredits'), value: '500' },
      ],
      additionalFeatures: [
        t('pricing.free.feature1'),
        t('pricing.free.feature2'),
        t('pricing.free.feature3'),
        t('pricing.free.feature4'),
      ],
      cta: t('pricing.free.cta'),
    },
    {
      name: t('pricing.premium.title'),
      price: t('pricing.premium.price'),
      period: t('pricing.premium.period'),
      description: t('pricing.premium.description'),
      features: [
        { name: t('pricing.premium.monthlyMessages'), value: '250' },
        { name: t('pricing.premium.integrationCredits'), value: '10k' },
      ],
      additionalFeatures: [
        t('pricing.premium.feature1'),
        t('pricing.premium.feature2'),
        t('pricing.premium.feature3'),
        t('pricing.premium.feature4'),
      ],
      cta: t('pricing.premium.cta'),
      highlighted: true,
    },
  ];

  return (
    <section className="py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">{t('pricing.title')}</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          {t('pricing.subtitle')}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto px-4">
        {plans.map((plan) => (
          <Card
            key={plan.name}
            className={`${plan.highlighted ? 'border-primary shadow-lg' : ''}`}
          >
            <CardHeader>
              <div className={`text-${dir === 'rtl' ? 'right' : 'left'}`}>
                <h3 className="text-2xl font-bold">{plan.name}</h3>
                <div className="mt-4 flex items-baseline gap-x-2">
                  <span className="text-5xl font-bold tracking-tight">
                    {plan.price}
                  </span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
                <p className="mt-6 text-muted-foreground">{plan.description}</p>
              </div>
            </CardHeader>
            <CardContent>
              <div className={`text-${dir === 'rtl' ? 'right' : 'left'}`}>
                {/* Credits */}
                <div className="mt-6 space-y-4">
                  {plan.features.map((feature) => (
                    <div
                      key={feature.name}
                      className="flex justify-between items-center"
                    >
                      <span className="text-muted-foreground">
                        {feature.name}
                      </span>
                      <span className="font-semibold">{feature.value}</span>
                    </div>
                  ))}
                </div>

                {/* Features */}
                <div className="mt-8">
                  <h4 className="text-sm font-semibold mb-4">
                    {t('pricing.free.features')}
                  </h4>
                  <ul className="space-y-3">
                    {plan.additionalFeatures.map((feature) => (
                      <li key={feature} className="flex items-center gap-x-3">
                        <Check className="h-5 w-5 text-primary flex-shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                variant={plan.highlighted ? "default" : "outline"}
              >
                {plan.cta}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default PricingSection; 