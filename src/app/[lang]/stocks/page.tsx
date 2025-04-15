import React from "react";
import Layout from "@/components/Layout";
import StockBadge from "@/components/StockBadge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, TrendingUp, TrendingDown, ArrowUpDown } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";

// Mock data (same as the original file)
const stockData = [
  { symbol: "AAPL", name: "Apple Inc.", price: 172.30, change: 2.8, volume: 65482300, marketCap: 2850000000000 },
  { symbol: "MSFT", name: "Microsoft Corporation", price: 335.40, change: 0.5, volume: 18743200, marketCap: 2490000000000 },
  { symbol: "GOOGL", name: "Alphabet Inc.", price: 155.75, change: 0.8, volume: 22564100, marketCap: 1950000000000 },
  { symbol: "TSLA", name: "Tesla, Inc.", price: 812.15, change: 8.2, volume: 45678900, marketCap: 820000000000 },
  { symbol: "AMZN", name: "Amazon.com, Inc.", price: 185.40, change: 2.5, volume: 31452600, marketCap: 1920000000000 },
  { symbol: "META", name: "Meta Platforms, Inc.", price: 476.20, change: -1.2, volume: 19384700, marketCap: 1210000000000 },
  { symbol: "NVDA", name: "NVIDIA Corporation", price: 847.30, change: 4.6, volume: 38276500, marketCap: 2080000000000 },
  { symbol: "BRK-B", name: "Berkshire Hathaway Inc.", price: 418.65, change: 0.3, volume: 3487600, marketCap: 920000000000 },
  { symbol: "BTC-USD", name: "Bitcoin USD", price: 75420.50, change: 5.2, volume: 42516700000, marketCap: 1479000000000 },
  { symbol: "ETH-USD", name: "Ethereum USD", price: 3875.25, change: 3.7, volume: 18394500000, marketCap: 465000000000 }
];

// Mock data for market indices
const marketIndices = [
  { name: "S&P 500", value: 5232.42, change: 0.8 },
  { name: "NASDAQ", value: 16385.47, change: 1.2 },
  { name: "Dow Jones", value: 38978.33, change: 0.4 },
  { name: "Russell 2000", value: 2094.56, change: -0.2 }
];

// Mock data for sectors
const sectors = [
  { name: "Technology", change: 2.1 },
  { name: "Healthcare", change: 0.5 },
  { name: "Finance", change: -0.3 },
  { name: "Consumer Cyclical", change: 1.2 },
  { name: "Energy", change: -0.8 },
  { name: "Industrials", change: 0.2 }
];

export default function StocksPage({ params }: { params: { lang: string } }) {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [sortConfig, setSortConfig] = React.useState<{ key: string; direction: string } | null>(null);

  // Filter and sort logic remains the same as in the original component
  const filteredStocks = stockData.filter(
    (stock) =>
      stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stock.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedStocks = [...filteredStocks].sort((a, b) => {
    if (!sortConfig) return 0;
    
    const aValue = a[sortConfig.key as keyof typeof a];
    const bValue = b[sortConfig.key as keyof typeof b];
    
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortConfig.direction === 'ascending'
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    } else {
      return sortConfig.direction === 'ascending'
        ? (aValue as number) - (bValue as number)
        : (bValue as number) - (aValue as number);
    }
  });

  const requestSort = (key: string) => {
    let direction = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (columnName: string) => {
    if (!sortConfig || sortConfig.key !== columnName) {
      return <ArrowUpDown className="h-4 w-4 ml-1" />;
    }
    return sortConfig.direction === 'ascending' ? 
      <TrendingUp className="h-4 w-4 ml-1" /> : 
      <TrendingDown className="h-4 w-4 ml-1" />;
  };

  return (
    <Layout className="py-8">
      <div className="space-y-8">
        {/* Page header */}
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold">Stocks</h1>
            <p className="text-muted-foreground">Market overview and stock insights</p>
          </div>
          
          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search stocks..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Market overview */}
        <Card>
          <CardHeader>
            <CardTitle>Market Overview</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Rest of the market overview content remains the same */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {marketIndices.map((index) => (
                <div key={index.name} className="p-4 border rounded-lg">
                  <div className="text-sm text-muted-foreground">{index.name}</div>
                  <div className="text-2xl font-bold">{index.value.toLocaleString()}</div>
                  <div 
                    className={`text-sm flex items-center ${
                      index.change >= 0 ? "text-finance-green" : "text-finance-red"
                    }`}
                  >
                    {index.change >= 0 ? (
                      <TrendingUp className="h-4 w-4 mr-1" />
                    ) : (
                      <TrendingDown className="h-4 w-4 mr-1" />
                    )}
                    {index.change >= 0 ? "+" : ""}{index.change}%
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6">
              <div className="text-sm font-medium mb-3">Sectors</div>
              <div className="flex flex-wrap gap-2">
                {sectors.map((sector) => (
                  <div 
                    key={sector.name} 
                    className={`text-sm px-3 py-1.5 rounded-full ${
                      sector.change >= 0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}
                  >
                    {sector.name} {sector.change >= 0 ? "+" : ""}{sector.change}%
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Categories */}
        <NavigationMenu className="max-w-full justify-start">
          <NavigationMenuList className="space-x-2">
            <NavigationMenuItem>
              <NavigationMenuTrigger>Top Stocks</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid grid-cols-2 gap-3 p-4 w-[400px]">
                  <Link 
                    href="/stocks/category/technology" 
                    className="flex p-3 hover:bg-muted rounded-md"
                  >
                    <div>
                      <div className="text-sm font-medium mb-1">Technology</div>
                      <div className="text-sm text-muted-foreground">AAPL, MSFT, GOOGL</div>
                    </div>
                  </Link>
                  <Link 
                    href="/stocks/category/finance" 
                    className="flex p-3 hover:bg-muted rounded-md"
                  >
                    <div>
                      <div className="text-sm font-medium mb-1">Finance</div>
                      <div className="text-sm text-muted-foreground">JPM, BAC, WFC</div>
                    </div>
                  </Link>
                  <Link 
                    href="/stocks/category/healthcare" 
                    className="flex p-3 hover:bg-muted rounded-md"
                  >
                    <div>
                      <div className="text-sm font-medium mb-1">Healthcare</div>
                      <div className="text-sm text-muted-foreground">JNJ, PFE, UNH</div>
                    </div>
                  </Link>
                  <Link 
                    href="/stocks/category/energy" 
                    className="flex p-3 hover:bg-muted rounded-md"
                  >
                    <div>
                      <div className="text-sm font-medium mb-1">Energy</div>
                      <div className="text-sm text-muted-foreground">XOM, CVX, BP</div>
                    </div>
                  </Link>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Crypto</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="p-4 w-[300px]">
                  <div className="grid grid-cols-1 gap-3">
                    <Link 
                      href="/stocks/BTC-USD" 
                      className="flex p-3 hover:bg-muted rounded-md"
                    >
                      <div className="w-full">
                        <div className="text-sm font-medium flex justify-between">
                          <span>Bitcoin</span>
                          <span>$75,420.50</span>
                        </div>
                        <div className="text-sm text-finance-green">+5.2%</div>
                      </div>
                    </Link>
                    <Link 
                      href="/stocks/ETH-USD" 
                      className="flex p-3 hover:bg-muted rounded-md"
                    >
                      <div className="w-full">
                        <div className="text-sm font-medium flex justify-between">
                          <span>Ethereum</span>
                          <span>$3,875.25</span>
                        </div>
                        <div className="text-sm text-finance-green">+3.7%</div>
                      </div>
                    </Link>
                  </div>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Indices</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="p-4 w-[300px]">
                  <div className="grid grid-cols-1 gap-3">
                    {marketIndices.map(index => (
                      <div key={index.name} className="flex p-3 hover:bg-muted rounded-md">
                        <div className="w-full">
                          <div className="text-sm font-medium flex justify-between">
                            <span>{index.name}</span>
                            <span>{index.value.toLocaleString()}</span>
                          </div>
                          <div className={`text-sm ${index.change >= 0 ? 'text-finance-green' : 'text-finance-red'}`}>
                            {index.change >= 0 ? "+" : ""}{index.change}%
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                <Link href="/stocks/watchlist">Watchlist</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Stocks table */}
        <Card>
          <CardHeader>
            <CardTitle>Popular Stocks</CardTitle>
          </CardHeader>
          <CardContent>
            <Table className="w-full">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[180px] cursor-pointer" onClick={() => requestSort('symbol')}>
                    <div className="flex items-center">
                      Symbol {getSortIcon('symbol')}
                    </div>
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => requestSort('price')}>
                    <div className="flex items-center">
                      Price {getSortIcon('price')}
                    </div>
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => requestSort('change')}>
                    <div className="flex items-center">
                      Change {getSortIcon('change')}
                    </div>
                  </TableHead>
                  <TableHead className="hidden sm:table-cell cursor-pointer" onClick={() => requestSort('volume')}>
                    <div className="flex items-center">
                      Volume {getSortIcon('volume')}
                    </div>
                  </TableHead>
                  <TableHead className="hidden md:table-cell cursor-pointer" onClick={() => requestSort('marketCap')}>
                    <div className="flex items-center">
                      Market Cap {getSortIcon('marketCap')}
                    </div>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedStocks.map((stock) => {
                  const isPositive = stock.change >= 0;
                  
                  return (
                    <TableRow key={stock.symbol}>
                      <TableCell>
                        <Link href={`/stocks/${stock.symbol}`} className="hover:underline">
                          <div className="font-medium">{stock.symbol}</div>
                          <div className="text-xs text-muted-foreground">{stock.name}</div>
                        </Link>
                      </TableCell>
                      <TableCell>${stock.price.toFixed(2)}</TableCell>
                      <TableCell className={isPositive ? "text-finance-green" : "text-finance-red"}>
                        <div className="flex items-center">
                          {isPositive ? (
                            <TrendingUp className="h-4 w-4 mr-1" />
                          ) : (
                            <TrendingDown className="h-4 w-4 mr-1" />
                          )}
                          {isPositive ? "+" : ""}{stock.change}%
                        </div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        {(stock.volume / 1000000).toFixed(2)}M
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        ${(stock.marketCap / 1000000000).toFixed(2)}B
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
