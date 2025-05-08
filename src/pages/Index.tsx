
import { useQuery } from "@tanstack/react-query";
import Layout from "@/components/Layout";
import NewsSection from "@/components/NewsSection";
import BenefitsSection from "@/components/BenefitsSection";
import PricingSection from "@/components/PricingSection";
import { Article } from "@/components/ArticleCard";
import { useLanguage } from "@/context/LanguageContext";
import { getArticles } from "@/api/articleApi";
import StockBadge from "@/components/StockBadge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useState, useEffect } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const ARTICLES_PER_PAGE = 3; // Changed to 3

const Index = () => {
  const { t } = useLanguage();
  const [page, setPage] = useState(1);
  // Client-side only rendering for the welcome section to avoid hydration issues
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  const { data: articles = [], isLoading } = useQuery({
    queryKey: ['articles'],
    queryFn: getArticles
  });

  // Mock trending stocks
  const trendingStocks = [
    { symbol: "AAPL", price: 172.30, change: 2.8 },
    { symbol: "MSFT", price: 335.40, change: 0.5 },
    { symbol: "GOOGL", price: 155.75, change: 0.8 },
    { symbol: "AMZN", price: 185.40, change: 2.5 },
    { symbol: "TSLA", price: 812.15, change: 8.2 },
    { symbol: "BTC-USD", price: 75420.50, change: 5.2 },
    { symbol: "ETH-USD", price: 3950.75, change: 4.1 },
    { symbol: "XOM", price: 118.45, change: 4.2 }
  ];

  if (isLoading) {
    return (
      <Layout>
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="rounded-lg overflow-hidden">
                <Skeleton className="h-48 w-full" />
                <div className="p-4 space-y-3">
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-4 w-4/5" />
                  <Skeleton className="h-4 w-3/5" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Layout>
    );
  }

  // Calculate pagination
  const totalPages = Math.ceil(articles.length / ARTICLES_PER_PAGE);
  const startIndex = (page - 1) * ARTICLES_PER_PAGE;
  const endIndex = startIndex + ARTICLES_PER_PAGE;
  const currentPageArticles = articles.slice(startIndex, endIndex);

  return (
    <Layout>
      <div className="space-y-10">
        {/* Welcome message - only rendered on client side to prevent hydration issues */}
        {isClient && (
          <section className="mb-8">
            <Card className="overflow-hidden border-finance-blue border-2">
              <CardHeader className="bg-gradient-to-r from-finance-blue to-finance-lightBlue text-white">
                <CardTitle className="text-2xl font-bold">{t('home.welcome.title')}</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="prose max-w-none">
                  <p className="text-lg mb-4">{t('home.welcome.intro')}</p>
                  <Alert>
                    <AlertTitle>{t('home.welcome.mission.title')}</AlertTitle>
                    <AlertDescription>
                      {t('home.welcome.mission.description')}
                    </AlertDescription>
                  </Alert>
                  <div className="grid md:grid-cols-3 gap-4 mt-6">
                    <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
                      <h3 className="font-bold text-finance-blue">{t('home.welcome.feature.market.title')}</h3>
                      <p className="text-sm text-center">{t('home.welcome.feature.market.description')}</p>
                    </div>
                    <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
                      <h3 className="font-bold text-finance-blue">{t('home.welcome.feature.insights.title')}</h3>
                      <p className="text-sm text-center">{t('home.welcome.feature.insights.description')}</p>
                    </div>
                    <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
                      <h3 className="font-bold text-finance-blue">{t('home.welcome.feature.tools.title')}</h3>
                      <p className="text-sm text-center">{t('home.welcome.feature.tools.description')}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        )}

        {/* Trending stocks section */}
        <section>
          <h2 className="text-2xl font-bold mb-4">{t('home.trending')}</h2>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Market Movers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                {trendingStocks.map((stock) => (
                  <StockBadge
                    key={stock.symbol}
                    symbol={stock.symbol}
                    price={stock.price}
                    change={stock.change}
                    showChange={true}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Latest news section */}
        <NewsSection title={t('home.latest')} articles={currentPageArticles} />
        
        {/* Pricing section */}
        <PricingSection />

        {/* Benefits section */}
        <BenefitsSection />

        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  aria-disabled={page === 1}
                  className={page === 1 ? 'pointer-events-none opacity-50' : ''}
                />
              </PaginationItem>
              
              {[...Array(totalPages)].map((_, i) => (
                <PaginationItem key={i + 1}>
                  <PaginationLink
                    onClick={() => setPage(i + 1)}
                    isActive={page === i + 1}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  aria-disabled={page === totalPages}
                  className={page === totalPages ? 'pointer-events-none opacity-50' : ''}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </Layout>
  );
};

export default Index;
