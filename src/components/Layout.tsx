
import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, className }) => {
  const { language } = useLanguage();

  return (
    <div className={cn(`min-h-screen flex flex-col`, language === 'he' ? 'rtl' : 'ltr')}>
      <Header />
      <main className={cn(`flex-1 container mx-auto px-4 py-6`, className)}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
