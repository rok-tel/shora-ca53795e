
import Layout from "@/components/Layout";
import WhatsAppSection from "@/components/WhatsAppSection";
import { useLanguage } from "@/context/LanguageContext";

const Benefits = () => {
  const { t } = useLanguage();

  return (
    <Layout>
      <div className="py-8">
        <h1 className="text-4xl font-bold text-center mb-12">{t('benefits.title')}</h1>
        <WhatsAppSection />
      </div>
    </Layout>
  );
};

export default Benefits;
