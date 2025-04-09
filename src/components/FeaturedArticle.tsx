
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { useLanguage } from "@/context/LanguageContext";
import { Article } from "./ArticleCard";
import StockBadge from "./StockBadge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface FeaturedArticleProps {
  article: Article;
}

const FeaturedArticle = ({ article }: FeaturedArticleProps) => {
  const { t } = useLanguage();

  return (
    <div className="relative overflow-hidden rounded-xl shadow-md">
      <div className="lg:flex">
        <div className="relative h-64 lg:h-auto lg:w-1/2">
          <img
            src={article.imageUrl}
            alt={article.title}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-50" />
        </div>
        <div className="bg-white dark:bg-gray-900 p-6 lg:w-1/2 flex flex-col justify-between">
          <div>
            <h2 className="font-bold text-2xl md:text-3xl mb-3">{article.title}</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">{article.summary}</p>
            
            {article.stocks && article.stocks.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
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
            )}
          </div>
          
          <div className="mt-4 flex justify-between items-center">
            <div className="text-sm text-gray-500">
              <p className="font-medium">{article.author}</p>
              <p>{formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true })}</p>
            </div>
            
            <Button asChild>
              <Link to={`/article/${article.id}`} className="flex items-center gap-2">
                {t('article.readMore')} <ArrowRight size={16} />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedArticle;
