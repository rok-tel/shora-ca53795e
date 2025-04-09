
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { formatDistanceToNow, format } from "date-fns";
import Layout from "@/components/Layout";
import { Article } from "@/components/ArticleCard";
import { useLanguage } from "@/context/LanguageContext";
import { getArticleById, getRelatedArticles } from "@/api/articleApi";
import StockBadge from "@/components/StockBadge";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Facebook, Twitter, Linkedin, Link as LinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import NewsSection from "@/components/NewsSection";

const ArticleDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const { t } = useLanguage();

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        if (id) {
          const fetchedArticle = await getArticleById(id);
          if (fetchedArticle) {
            setArticle(fetchedArticle);
            
            // Get related articles based on stocks
            if (fetchedArticle.stocks && fetchedArticle.stocks.length > 0) {
              const stockSymbols = fetchedArticle.stocks.map(stock => stock.symbol);
              const related = await getRelatedArticles(stockSymbols);
              // Filter out the current article
              setRelatedArticles(related.filter(a => a.id !== id));
            }
          }
        }
      } catch (error) {
        console.error("Error fetching article:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  if (loading) {
    return (
      <Layout>
        <div className="max-w-3xl mx-auto space-y-6">
          <Skeleton className="h-12 w-3/4" />
          <Skeleton className="h-6 w-1/2" />
          <Skeleton className="h-64 w-full" />
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
      </Layout>
    );
  }

  if (!article) {
    return (
      <Layout>
        <div className="max-w-3xl mx-auto text-center py-16">
          <h1 className="text-2xl font-bold mb-4">Article not found</h1>
          <p className="mb-6">The article you are looking for does not exist or has been removed.</p>
          <Link to="/" className="text-finance-blue hover:underline">
            Return to homepage
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{article.title}</h1>
        
        <div className="flex items-center justify-between mb-6 text-sm text-gray-600">
          <div>
            <p className="font-medium">{article.author}</p>
            <p>{t('article.publishedOn')} {format(new Date(article.publishedAt), 'MMMM d, yyyy')}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
              <Facebook size={16} />
              <span className="sr-only">Share on Facebook</span>
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
              <Twitter size={16} />
              <span className="sr-only">Share on Twitter</span>
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
              <Linkedin size={16} />
              <span className="sr-only">Share on LinkedIn</span>
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
              <LinkIcon size={16} />
              <span className="sr-only">Copy link</span>
            </Button>
          </div>
        </div>
        
        <div className="mb-8">
          <img src={article.imageUrl} alt={article.title} className="w-full rounded-lg" />
          <p className="text-sm text-gray-500 mt-2">Image credit: Unsplash</p>
        </div>

        {article.stocks && article.stocks.length > 0 && (
          <Card className="mb-8">
            <CardContent className="p-4">
              <h3 className="font-semibold mb-2">{t('article.relatedStocks')}</h3>
              <div className="flex flex-wrap gap-2">
                {article.stocks.map((stock) => (
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
        )}
        
        <div className="prose max-w-none">
          {article.content.split('\n\n').map((paragraph, index) => (
            <p key={index} className="mb-4">{paragraph}</p>
          ))}
        </div>
        
        <Separator className="my-10" />
        
        {relatedArticles.length > 0 && (
          <div className="mb-10">
            <NewsSection title={t('stock.relatedNews')} articles={relatedArticles} />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ArticleDetail;
