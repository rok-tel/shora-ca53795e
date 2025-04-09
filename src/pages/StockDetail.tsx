
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "@/components/Layout";
import { useLanguage } from "@/context/LanguageContext";
import { getRelatedArticles } from "@/api/articleApi";
import { Article } from "@/components/ArticleCard";
import NewsSection from "@/components/NewsSection";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from "recharts";

interface StockData {
  symbol: string;
  companyName: string;
  price: number;
  change: number;
  changePercent: number;
  dayHigh: number;
  dayLow: number;
  volume: number;
  marketCap: number;
  peRatio: number;
  dividend: number;
}

interface ChartData {
  date: string;
  price: number;
}

// Mock data for stock details
const mockStockData: Record<string, StockData> = {
  "AAPL": {
    symbol: "AAPL",
    companyName: "Apple Inc.",
    price: 172.30,
    change: 4.62,
    changePercent: 2.8,
    dayHigh: 173.45,
    dayLow: 170.82,
    volume: 65482300,
    marketCap: 2850000000000,
    peRatio: 28.5,
    dividend: 0.92
  },
  "MSFT": {
    symbol: "MSFT",
    companyName: "Microsoft Corporation",
    price: 335.40,
    change: 1.67,
    changePercent: 0.5,
    dayHigh: 336.12,
    dayLow: 333.95,
    volume: 18743200,
    marketCap: 2490000000000,
    peRatio: 32.1,
    dividend: 2.72
  },
  "GOOGL": {
    symbol: "GOOGL",
    companyName: "Alphabet Inc.",
    price: 155.75,
    change: 1.23,
    changePercent: 0.8,
    dayHigh: 156.32,
    dayLow: 154.98,
    volume: 22564100,
    marketCap: 1950000000000,
    peRatio: 24.6,
    dividend: 0
  },
  "TSLA": {
    symbol: "TSLA",
    companyName: "Tesla, Inc.",
    price: 812.15,
    change: 61.72,
    changePercent: 8.2,
    dayHigh: 820.45,
    dayLow: 780.30,
    volume: 45678900,
    marketCap: 820000000000,
    peRatio: 115.8,
    dividend: 0
  },
  "AMZN": {
    symbol: "AMZN",
    companyName: "Amazon.com, Inc.",
    price: 185.40,
    change: 4.52,
    changePercent: 2.5,
    dayHigh: 186.75,
    dayLow: 183.10,
    volume: 31452600,
    marketCap: 1920000000000,
    peRatio: 49.2,
    dividend: 0
  },
  "BTC-USD": {
    symbol: "BTC-USD",
    companyName: "Bitcoin USD",
    price: 75420.50,
    change: 3721.40,
    changePercent: 5.2,
    dayHigh: 76120.35,
    dayLow: 72350.82,
    volume: 42516700000,
    marketCap: 1479000000000,
    peRatio: 0,
    dividend: 0
  }
};

// Generate mock chart data
const generateChartData = (periods: number, basePrice: number, volatility: number): ChartData[] => {
  const data: ChartData[] = [];
  let price = basePrice;
  const now = new Date();
  
  for (let i = periods; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
    // Add some randomness to the price
    const change = (Math.random() - 0.5) * volatility;
    price = Math.max(0, price + change);
    
    data.push({
      date: date.toISOString().slice(0, 10),
      price: parseFloat(price.toFixed(2))
    });
  }
  
  return data;
};

const StockDetail = () => {
  const { symbol } = useParams<{ symbol: string }>();
  const [stockData, setStockData] = useState<StockData | null>(null);
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const { t } = useLanguage();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // In a real application, you would fetch actual stock data from an API
        // For now, we'll use our mock data
        if (symbol && mockStockData[symbol]) {
          setStockData(mockStockData[symbol]);
          
          // Generate mock chart data based on the stock's price
          setChartData(generateChartData(30, mockStockData[symbol].price, mockStockData[symbol].price * 0.03));
          
          // Fetch related articles
          const related = await getRelatedArticles([symbol]);
          setArticles(related);
        }
      } catch (error) {
        console.error("Error fetching stock data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [symbol]);

  if (loading) {
    return (
      <Layout>
        <div className="space-y-8">
          <Skeleton className="h-12 w-1/3" />
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {Array(8).fill(0).map((_, i) => (
                  <Skeleton key={i} className="h-16" />
                ))}
              </div>
            </CardContent>
          </Card>
          <Skeleton className="h-80 w-full" />
        </div>
      </Layout>
    );
  }

  if (!stockData || !symbol) {
    return (
      <Layout>
        <div className="text-center py-16">
          <h1 className="text-2xl font-bold mb-4">Stock not found</h1>
          <p>The stock you are looking for does not exist or has been delisted.</p>
        </div>
      </Layout>
    );
  }

  const isPositive = stockData.change >= 0;

  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">{stockData.companyName}</h1>
          <p className="text-lg text-muted-foreground">{stockData.symbol}</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader className="pb-0">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-3xl font-bold">${stockData.price.toFixed(2)}</div>
                  <div className={`flex items-center ${isPositive ? 'text-finance-green' : 'text-finance-red'}`}>
                    <span>{isPositive ? '+' : ''}{stockData.change.toFixed(2)}</span>
                    <span className="mx-1">|</span>
                    <span>{isPositive ? '+' : ''}{stockData.changePercent.toFixed(2)}%</span>
                  </div>
                </div>
                <Tabs defaultValue="1M" className="w-[200px]">
                  <TabsList>
                    <TabsTrigger value="1D">1D</TabsTrigger>
                    <TabsTrigger value="1W">1W</TabsTrigger>
                    <TabsTrigger value="1M">1M</TabsTrigger>
                    <TabsTrigger value="1Y">1Y</TabsTrigger>
                    <TabsTrigger value="5Y">5Y</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </CardHeader>
            <CardContent className="pt-4 pb-4">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={isPositive ? "#2ECC71" : "#E74C3C"} stopOpacity={0.8}/>
                        <stop offset="95%" stopColor={isPositive ? "#2ECC71" : "#E74C3C"} stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis 
                      dataKey="date" 
                      tickFormatter={(value) => {
                        const date = new Date(value);
                        return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
                      }}
                      tick={{ fontSize: 12 }}
                    />
                    <YAxis 
                      domain={['dataMin - 5', 'dataMax + 5']}
                      tick={{ fontSize: 12 }}
                      tickFormatter={(value) => `$${value}`}
                    />
                    <Tooltip
                      formatter={(value) => [`$${value}`, 'Price']}
                      labelFormatter={(label) => {
                        const date = new Date(label);
                        return date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
                      }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="price" 
                      stroke={isPositive ? "#2ECC71" : "#E74C3C"} 
                      fillOpacity={1}
                      fill="url(#colorPrice)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Key Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">{t('stock.high')}</span>
                  <span className="font-medium">${stockData.dayHigh.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">{t('stock.low')}</span>
                  <span className="font-medium">${stockData.dayLow.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">{t('stock.volume')}</span>
                  <span className="font-medium">{stockData.volume.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Market Cap</span>
                  <span className="font-medium">${(stockData.marketCap / 1000000000).toFixed(2)}B</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">P/E Ratio</span>
                  <span className="font-medium">{stockData.peRatio.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Dividend Yield</span>
                  <span className="font-medium">
                    {stockData.dividend > 0 
                      ? `${((stockData.dividend / stockData.price) * 100).toFixed(2)}%` 
                      : 'N/A'}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {articles.length > 0 && (
          <div>
            <NewsSection title={t('stock.relatedNews')} articles={articles} />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default StockDetail;
