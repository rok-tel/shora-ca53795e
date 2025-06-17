
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import Layout from "@/components/Layout";
import { useLanguage } from "@/context/LanguageContext";
import { getArticles } from "@/api/articleApi";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { DatePickerWithRange } from "@/components/ui/date-range-picker.tsx";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Search } from "lucide-react";
import NewsSection from "@/components/NewsSection";
import { DateRange } from "react-day-picker";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";

const ARTICLES_PER_PAGE = 12;

interface SearchFilters {
  keyword: string;
  stock: string;
  dateRange: DateRange | undefined;
}

const Articles = () => {
  const { t } = useLanguage();
  const [page, setPage] = useState(1);
  const [isClient, setIsClient] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({
    keyword: "",
    stock: "",
    dateRange: undefined,
  });

  // Client-side only rendering to avoid hydration issues
  useEffect(() => {
    setIsClient(true);
  }, []);

  const { data: articles = [], isLoading } = useQuery({
    queryKey: ["articles", filters],
    queryFn: () => getArticles(), // In real app, pass filters to API
  });

  // Mock stock options - in real app, fetch from API
  const stockOptions = [
    { value: "AAPL", label: "Apple Inc. (AAPL)" },
    { value: "GOOGL", label: "Alphabet Inc. (GOOGL)" },
    { value: "MSFT", label: "Microsoft Corporation (MSFT)" },
    { value: "AMZN", label: "Amazon.com Inc. (AMZN)" },
  ];

  const filteredArticles = articles.filter((article) => {
    const matchesKeyword = filters.keyword
      ? article.title.toLowerCase().includes(filters.keyword.toLowerCase()) ||
        article.content.toLowerCase().includes(filters.keyword.toLowerCase())
      : true;

    const matchesStock = filters.stock
      ? article.stocks?.some(stock => stock.symbol === filters.stock)
      : true;

    const matchesDate = filters.dateRange && filters.dateRange.from && filters.dateRange.to
      ? new Date(article.publishedAt) >= filters.dateRange.from &&
        new Date(article.publishedAt) <= filters.dateRange.to
      : true;

    return matchesKeyword && matchesStock && matchesDate;
  });

  // Divide articles into Basic and Advanced sections
  const basicArticles = filteredArticles.slice(0, Math.ceil(filteredArticles.length / 2));
  const advancedArticles = filteredArticles.slice(Math.ceil(filteredArticles.length / 2));

  // Calculate pagination for total articles
  const totalPages = Math.ceil(filteredArticles.length / ARTICLES_PER_PAGE);
  const startIndex = (page - 1) * ARTICLES_PER_PAGE;
  const endIndex = startIndex + ARTICLES_PER_PAGE;

  const handleSearch = () => {
    setPage(1); // Reset to first page when searching
  };

  const handleReset = () => {
    setFilters({
      keyword: "",
      stock: "",
      dateRange: undefined,
    });
    setPage(1);
  };

  return (
    <Layout>
      <div className="space-y-8">
        {/* Search Section */}
        <Card>
          <CardHeader>
            <h2 className="text-2xl font-bold">{t('articles.search.title')}</h2>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-4">
              {/* Keyword Search */}
              <div className="space-y-2">
                <Label htmlFor="keyword">{t('articles.search.keyword')}</Label>
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="keyword"
                    placeholder={t('articles.search.keywordPlaceholder')}
                    className="pl-8"
                    value={filters.keyword}
                    onChange={(e) =>
                      setFilters((prev) => ({ ...prev, keyword: e.target.value }))
                    }
                  />
                </div>
              </div>

              {/* Stock Filter */}
              <div className="space-y-2">
                <Label>{t('articles.search.stock')}</Label>
                <Select
                  value={filters.stock}
                  onValueChange={(value) =>
                    setFilters((prev) => ({ ...prev, stock: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder={t('articles.search.stockPlaceholder')} />
                  </SelectTrigger>
                  <SelectContent>
                    {stockOptions.map((stock) => (
                      <SelectItem key={stock.value} value={stock.value}>
                        {stock.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Date Range */}
              <div className="space-y-2">
                <Label>{t('articles.search.dateRange')}</Label>
                <DatePickerWithRange
                  value={filters.dateRange}
                  onChange={(range) =>
                    setFilters((prev) => ({ ...prev, dateRange: range }))
                  }
                />
              </div>

              {/* Search Buttons */}
              <div className="flex items-end gap-2">
                <Button onClick={handleSearch} className="flex-1">
                  {t('articles.search.search')}
                </Button>
                <Button variant="outline" onClick={handleReset}>
                  {t('articles.search.reset')}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Summary */}
        <div>
          <h3 className="text-xl font-semibold mb-4">
            {t('articles.results.title')} ({filteredArticles.length})
          </h3>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="animate-pulse">
                <div className="h-48 bg-muted rounded-t-lg" />
                <CardContent className="p-4">
                  <div className="h-4 bg-muted rounded w-3/4 mb-2" />
                  <div className="h-4 bg-muted rounded w-1/2" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : isClient ? (
          <div className="space-y-8">
            <ResizablePanelGroup direction="vertical" className="min-h-[800px] rounded-lg border">
              {/* Basic Articles Section */}
              {basicArticles.length > 0 && (
                <ResizablePanel defaultSize={50} minSize={30}>
                  <div className="p-4 h-full overflow-auto">
                    <NewsSection
                      title={t('articles.sections.basic')}
                      articles={basicArticles}
                      compact={false}
                    />
                  </div>
                </ResizablePanel>
              )}
              
              {basicArticles.length > 0 && advancedArticles.length > 0 && (
                <ResizableHandle withHandle />
              )}

              {/* Advanced Articles Section */}
              {advancedArticles.length > 0 && (
                <ResizablePanel defaultSize={50} minSize={30}>
                  <div className="p-4 h-full overflow-auto">
                    <NewsSection
                      title={t('articles.sections.advanced')}
                      articles={advancedArticles}
                      compact={true}
                    />
                  </div>
                </ResizablePanel>
              )}
            </ResizablePanelGroup>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                        aria-disabled={page === 1}
                        className={page === 1 ? "pointer-events-none opacity-50" : ""}
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
                        onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                        aria-disabled={page === totalPages}
                        className={page === totalPages ? "pointer-events-none opacity-50" : ""}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="animate-pulse">
                <div className="h-48 bg-muted rounded-t-lg" />
                <CardContent className="p-4">
                  <div className="h-4 bg-muted rounded w-3/4 mb-2" />
                  <div className="h-4 bg-muted rounded w-1/2" />
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Articles;
