import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { useLanguage } from "@/context/LanguageContext";
import StockBadge from "./StockBadge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

interface Stock {
  symbol: string;
  price?: number;
  change?: number;
}

export interface Article {
  id: string;
  title: string;
  summary: string;
  content: string;
  imageUrl: string;
  publishedAt: string;
  author: string;
  stocks?: Stock[];
}

interface ArticleCardProps {
  article: Article;
  compact?: boolean;
}

const ArticleCard = ({ article, compact = false }: ArticleCardProps) => {
  const { language, t } = useLanguage();

  return (
    <Card className="h-full overflow-hidden transition-all hover:shadow-md">
      <Link to={`/${language}/article/${article.id}`} className="block">
        <div className={`relative ${compact ? "h-40" : "h-48"}`}>
          <img 
            src={article.imageUrl} 
            alt={article.title} 
            className="w-full h-full object-cover"
          />
        </div>
        <CardContent className="p-4">
          <h3 className={`font-bold ${compact ? "text-base" : "text-xl"} line-clamp-2 mb-2`}>
            {article.title}
          </h3>
          {!compact && (
            <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2 mb-3">
              {article.summary}
            </p>
          )}
        </CardContent>
      </Link>
      <CardFooter className="px-4 py-3 border-t">
        <div className="w-full">
          {article.stocks && article.stocks.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {article.stocks.slice(0, 3).map((stock) => (
                <StockBadge key={stock.symbol} symbol={stock.symbol} />
              ))}
              {article.stocks.length > 3 && (
                <span className="text-xs text-gray-500">+{article.stocks.length - 3} more</span>
              )}
            </div>
          )}
          <div className="flex justify-between items-center text-xs text-gray-500">
            <span>{article.author}</span>
            <span>
              {formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true })}
            </span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ArticleCard;
