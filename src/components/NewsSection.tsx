
import { useLanguage } from "@/context/LanguageContext";
import ArticleCard, { Article } from "./ArticleCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface NewsSectionProps {
  title: string;
  articles: Article[];
  compact?: boolean;
}

const NewsSection = ({ title, articles, compact = false }: NewsSectionProps) => {
  return (
    <Card className="mb-12 shadow-lg">
      <CardHeader className="pb-4">
        <CardTitle className="text-3xl font-bold text-center bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
          {title}
        </CardTitle>
        <div className="w-24 h-1 bg-primary mx-auto rounded-full mt-2"></div>
      </CardHeader>
      <CardContent>
        <div className={`grid gap-6 ${compact 
          ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4" 
          : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"}`}
        >
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} compact={compact} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default NewsSection;
