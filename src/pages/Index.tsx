
import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import FeaturedArticle from "@/components/FeaturedArticle";
import NewsSection from "@/components/NewsSection";
import BenefitsSection from "@/components/BenefitsSection";
import { Article } from "@/components/ArticleCard";
import { useLanguage } from "@/context/LanguageContext";
import { getArticles } from "@/api/articleApi";
import StockBadge from "@/components/StockBadge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const Index = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const { t } = useLanguage();

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

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const fetchedArticles = await getArticles();
        setArticles(fetchedArticles);
      } catch (error) {
        console.error("Error fetching articles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) {
    return (
      <Layout>
        <div className="space-y-8">
          {/* Featured article skeleton */}
          <div className="w-full h-96 bg-gray-200 rounded-xl"></div>
          
          {/* Latest news skeleton */}
          <div>
            <Skeleton className="h-8 w-48 mb-6" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
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
        </div>
      </Layout>
    );
  }

  // Split articles for different sections
  const featuredArticle = articles[0];
  const latestNews = articles.slice(1, 4);
  const moreNews = articles.slice(4);

  return (
    <Layout>
      <div className="space-y-10">
        {/* Featured article */}
        <section>
          <h2 className="text-2xl font-bold mb-4">{t('home.featured')}</h2>
          {featuredArticle && <FeaturedArticle article={featuredArticle} />}
        </section>

        {/* Trending stocks */}
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

        {/* Latest news */}
        <NewsSection title={t('home.latest')} articles={latestNews} />
        
        {/* Benefits section */}
        <BenefitsSection />
        
        {/* More news */}
        {moreNews.length > 0 && (
          <NewsSection title="More Stories" articles={moreNews} compact={true} />
        )}
      </div>
    </Layout>
  );
};

export default Index;
