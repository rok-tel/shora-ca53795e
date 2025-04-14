
import { lazy, Suspense, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LanguageProvider } from "@/context/LanguageContext";
import { StaticRouter } from "react-router-dom/server";
import { Skeleton } from "@/components/ui/skeleton";
import { checkAndSeedData } from "./firebase/seed";

// Lazy-loaded components for code-splitting
const Index = lazy(() => import("./pages/Index"));
const ArticleDetail = lazy(() => import("./pages/ArticleDetail"));
const StockDetail = lazy(() => import("./pages/StockDetail"));
const Stocks = lazy(() => import("./pages/Stocks"));
const News = lazy(() => import("./pages/News"));
const Admin = lazy(() => import("./pages/Admin"));
const NotFound = lazy(() => import("./pages/NotFound"));

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

const queryClient = new QueryClient();

// App component that works in both client and server environments
export function App({ url }: { url?: string }) {
  // Initialize Firebase data if needed
  useEffect(() => {
    if (!url) { // Only run on client-side
      checkAndSeedData();
    }
  }, [url]);

  // Create router content that will be used in both environments
  const routerContent = (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Suspense fallback={<Loading />}>
          <Routes>
            {/* Default redirect to preferred language */}
            <Route path="/" element={<Navigate to="/en" replace />} />
            
            {/* Language-prefixed routes */}
            <Route path="/:lang">
              <Route index element={<Index />} />
              <Route path="article/:id" element={<ArticleDetail />} />
              <Route path="stocks" element={<Stocks />} />
              <Route path="stocks/:symbol" element={<StockDetail />} />
              <Route path="admin" element={<Admin />} />
            </Route>
            
            {/* Fallback */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </TooltipProvider>
    </QueryClientProvider>
  );

  // Use different router components based on environment
  if (url) {
    return (
      <StaticRouter location={url}>
        <LanguageProvider>
          {routerContent}
        </LanguageProvider>
      </StaticRouter>
    );
  }

  return (
    <BrowserRouter>
      <LanguageProvider>
        {routerContent}
      </LanguageProvider>
    </BrowserRouter>
  );
}

export default App;
