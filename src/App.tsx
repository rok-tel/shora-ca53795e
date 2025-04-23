import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { StaticRouter } from "react-router-dom/server";
import { LanguageProvider } from "@/context/LanguageContext";
import { Skeleton } from "@/components/ui/skeleton";

// Lazy-loaded components for code-splitting
const Index = lazy(() => import("./pages/Index"));
const ArticleDetail = lazy(() => import("./pages/ArticleDetail"));
const Articles = lazy(() => import("./pages/Articles"));
const StockDetail = lazy(() => import("./pages/StockDetail"));
const Stocks = lazy(() => import("./pages/Stocks"));
const News = lazy(() => import("./pages/News"));
const Admin = lazy(() => import("./pages/Admin"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Benefits = lazy(() => import("./pages/Benefits"));

const Loading = () => (
  <div className="container mx-auto px-4 py-8">
    <Skeleton className="h-8 w-48 mb-6" />
    <div className="space-y-6">
      <Skeleton className="h-64 w-full rounded-xl" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="h-40 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
          </div>
        ))}
      </div>
    </div>
  </div>
);

// Create query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

export function App({ url }: { url?: string }) {
  // Define routes content
  const routesContent = (
    <Routes>
      {/* Default redirect to preferred language - using English as default */}
      <Route 
        path="/" 
        element={<Navigate to="/en" replace />} 
      />
      
      {/* Language-prefixed routes */}
      <Route path="/:lang">
        <Route index element={<Index />} />
        <Route path="articles" element={<Articles />} />
        <Route path="article/:id" element={<ArticleDetail />} />
        <Route path="stocks" element={<Stocks />} />
        <Route path="stocks/:symbol" element={<StockDetail />} />
        <Route path="benefits" element={<Benefits />} />
        <Route path="admin" element={<Admin />} />
      </Route>
      
      {/* Fallback */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );

  // Main content that will be wrapped in the appropriate router
  const content = (
    <Suspense fallback={<Loading />}>
      {routesContent}
    </Suspense>
  );

  // Correctly wrap content in the appropriate Router first, 
  // then Language provider which uses Router hooks
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {url ? (
          // Server-side rendering
          <StaticRouter location={url}>
            <LanguageProvider>
              {content}
              <Toaster />
              <Sonner />
            </LanguageProvider>
          </StaticRouter>
        ) : (
          // Client-side rendering
          <BrowserRouter>
            <LanguageProvider>
              {content}
              <Toaster />
              <Sonner />
            </LanguageProvider>
          </BrowserRouter>
        )}
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
