
import { useLanguage } from "@/context/LanguageContext";
import ArticleCard, { Article } from "./ArticleCard";

interface NewsSectionProps {
  title: string;
  articles: Article[];
  compact?: boolean;
}

const NewsSection = ({ title, articles, compact = false }: NewsSectionProps) => {
  return (
    <section className="my-8">
      <h2 className="text-2xl font-bold mb-6">{title}</h2>
      <div className={`grid gap-6 ${compact 
        ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4" 
        : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"}`}
      >
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} compact={compact} />
        ))}
      </div>
    </section>
  );
};

export default NewsSection;
