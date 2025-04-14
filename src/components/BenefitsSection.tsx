
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  AlertCircle, 
  TrendingUp, 
  Video, 
  Target
} from "lucide-react";
import { Link } from "react-router-dom";

const BenefitsSection = () => {
  const { language, t } = useLanguage();

  const benefits = [
    {
      icon: <AlertCircle className="h-6 w-6" />,
      title: t('benefits.item1'),
      description: "Get notified immediately when stocks you follow make significant moves."
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: t('benefits.item2'),
      description: "Access in-depth analysis from our team of financial experts."
    },
    {
      icon: <Video className="h-6 w-6" />,
      title: t('benefits.item3'),
      description: "Join live sessions with industry leaders and financial analysts."
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: t('benefits.item4'),
      description: "Receive customized investment strategies based on your goals."
    },
  ];

  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-900 rounded-xl">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-3">Premium</Badge>
          <h2 className="text-3xl font-bold mb-4">{t('benefits.title')}</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t('home.benefits.desc')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div 
              key={index} 
              className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md transition-transform hover:-translate-y-1"
            >
              <div className="text-finance-blue mb-4">{benefit.icon}</div>
              <h3 className="font-semibold text-lg mb-2">{benefit.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button asChild size="lg" className="bg-finance-blue hover:bg-finance-blue/90">
            <Link to={`/${language}/benefits`}>
              {t('benefits.subscribe')}
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
