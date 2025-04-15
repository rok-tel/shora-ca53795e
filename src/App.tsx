import { lazy, Suspense, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LanguageProvider } from "@/context/LanguageContext";
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
const queryClient = new QueryClient();

export function App({ url }: { url?: string }) {
  // Initialize Firebase data if needed (client-side only)
  useEffect(() => {
    // Only run on client-side
    if (typeof window !== 'undefined' && !url) {
      checkAndSeedData();
    }
  }, [url]);

  const routesContent = (
    <Routes>
      {/* Default redirect to preferred language based on browser settings */}
      <Route 
        path="/" 
        element={
          <Navigate 
            to={`/${window.navigator.language.startsWith('he') ? 'he' : 'en'}`} 
            replace 
          />
        } 
      />
      
      {/* Language-prefixed routes */}
      <Route path="/:lang">
        <Route index element={<Index />} />
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
  const mainContent = (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <LanguageProvider>
          <Toaster />
          <Sonner />
          <Suspense fallback={<Loading />}>
            {routesContent}
          </Suspense>
        </LanguageProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );

  // For server-side rendering
  if (url) {
    const StaticRouter = require('react-router-dom/server').StaticRouter;
    return <StaticRouter location={url}>{mainContent}</StaticRouter>;
  }

  // For client-side rendering
  return <BrowserRouter>{mainContent}</BrowserRouter>;
}

export default App;
