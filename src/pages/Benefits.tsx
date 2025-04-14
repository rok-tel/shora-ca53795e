
import { lazy, Suspense } from "react";
import Layout from "@/components/Layout";
import { useLanguage } from "@/context/LanguageContext";
import { Skeleton } from "@/components/ui/skeleton";

// Use dynamic import for client-side component
const WhatsAppSection = lazy(() => import("@/components/WhatsAppSection"));

const WhatsAppSectionFallback = () => (
  <div className="py-12 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
    <Skeleton className="h-64 w-full" />
  </div>
);

const Benefits = () => {
  const { t } = useLanguage();

  return (
    <Layout>
      <div className="py-8">
        <h1 className="text-4xl font-bold text-center mb-12">{t('benefits.title')}</h1>
        <Suspense fallback={<WhatsAppSectionFallback />}>
          <WhatsAppSection />
        </Suspense>
      </div>
    </Layout>
  );
};

export default Benefits;
