
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

type Language = 'en' | 'he';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.stocks': 'Stocks',
    'nav.benefits': 'Benefits',
    'nav.admin': 'Admin',
    
    // Home page
    'home.featured': 'Featured Story',
    'home.latest': 'Latest News',
    'home.trending': 'Trending Stocks',
    'home.benefits.title': 'Subscriber Benefits',
    'home.benefits.desc': 'Join our premium membership for exclusive financial insights',
    
    // Benefits
    'benefits.title': 'Premium Subscriber Benefits',
    'benefits.item1': 'Real-time stock alerts',
    'benefits.item2': 'Expert financial analysis',
    'benefits.item3': 'Exclusive webinars and events',
    'benefits.item4': 'Personalized investment recommendations',
    'benefits.subscribe': 'Subscribe Now',
    
    // Stock page
    'stocks.title': 'Market Explorer',
    'stocks.description': 'Track global markets and investment opportunities',
    'stocks.search': 'Search stocks...',
    'stocks.marketOverview': 'Market Overview',
    'stocks.sectors': 'Sectors Performance',
    'stocks.popularStocks': 'Popular Stocks',
    'stocks.symbol': 'Symbol',
    'stocks.price': 'Price',
    'stocks.change': 'Change',
    'stocks.volume': 'Volume',
    'stocks.marketCap': 'Market Cap',
    'stocks.categories.topStocks': 'Top Stocks',
    'stocks.categories.crypto': 'Crypto',
    'stocks.categories.indices': 'Indices',
    'stocks.categories.watchlist': 'My Watchlist',
    
    // Stock page
    'stock.price': 'Current Price',
    'stock.change': 'Change',
    'stock.high': 'Day High',
    'stock.low': 'Day Low',
    'stock.volume': 'Volume',
    'stock.relatedNews': 'Related News',
    
    // Article
    'article.relatedStocks': 'Related Stocks',
    'article.publishedOn': 'Published on',
    'article.readMore': 'Read More',
    
    // Admin
    'admin.title': 'Article Management',
    'admin.new': 'New Article',
    'admin.edit': 'Edit Article',
    'admin.delete': 'Delete Article',
    
    // Footer
    'footer.followUs': 'Follow Us',
    'footer.copyright': 'Copyright © 2025 FinVerse Insight. All rights reserved.',
    'footer.terms': 'Terms & Conditions',
    'footer.privacy': 'Privacy Policy',
  },
  he: {
    // Navigation
    'nav.home': 'ראשי',
    'nav.stocks': 'מניות',
    'nav.benefits': 'הטבות',
    'nav.admin': 'ניהול',
    
    // Home page
    'home.featured': 'כתבה מרכזית',
    'home.latest': 'חדשות אחרונות',
    'home.trending': 'מניות מובילות',
    'home.benefits.title': 'הטבות למנויים',
    'home.benefits.desc': 'הצטרפו למנוי פרימיום לקבלת תובנות פיננסיות בלעדיות',
    
    // Benefits
    'benefits.title': 'הטבות למנויי פרימיום',
    'benefits.item1': 'התראות מניות בזמן אמת',
    'benefits.item2': 'ניתוח פיננסי מומחה',
    'benefits.item3': 'וובינרים ואירועים בלעדיים',
    'benefits.item4': 'המלצות השקעה מותאמות אישית',
    'benefits.subscribe': 'הירשם עכשיו',
    
    // Stock page
    'stocks.title': 'סייר שוק',
    'stocks.description': 'עקוב אחר השווקים העולמיים והזדמנויות השקעה',
    'stocks.search': 'חפש מניות...',
    'stocks.marketOverview': 'סקירת שוק',
    'stocks.sectors': 'ביצועי סקטורים',
    'stocks.popularStocks': 'מניות פופולריות',
    'stocks.symbol': 'סמל',
    'stocks.price': 'מחיר',
    'stocks.change': 'שינוי',
    'stocks.volume': 'נפח',
    'stocks.marketCap': 'שווי שוק',
    'stocks.categories.topStocks': 'מניות מובילות',
    'stocks.categories.crypto': 'קריפטו',
    'stocks.categories.indices': 'מדדים',
    'stocks.categories.watchlist': 'רשימת מעקב',
    
    // Stock page
    'stock.price': 'מחיר נוכחי',
    'stock.change': 'שינוי',
    'stock.high': 'שיא יומי',
    'stock.low': 'שפל יומי',
    'stock.volume': 'נפח מסחר',
    'stock.relatedNews': 'חדשות קשורות',
    
    // Article
    'article.relatedStocks': 'מניות קשורות',
    'article.publishedOn': 'פורסם בתאריך',
    'article.readMore': 'קרא עוד',
    
    // Admin
    'admin.title': 'ניהול כתבות',
    'admin.new': 'כתבה חדשה',
    'admin.edit': 'ערוך כתבה',
    'admin.delete': 'מחק כתבה',
    
    // Footer
    'footer.followUs': 'עקבו אחרינו',
    'footer.copyright': 'כל הזכויות שמורות © 2025 FinVerse Insight',
    'footer.terms': 'תנאי שימוש',
    'footer.privacy': 'מדיניות פרטיות',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    // Get initial language from URL or browser preference
    const urlLang = window.location.pathname.split('/')[1] as Language;
    return urlLang === 'he' || urlLang === 'en' ? urlLang : 
           window.navigator.language.startsWith('he') ? 'he' : 'en';
  });
  
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams<{ lang?: string }>();

  // Extract language from URL path on component mount and location change
  useEffect(() => {
    const urlLang = params.lang as Language | undefined;
    
    if (urlLang === 'he' || urlLang === 'en') {
      if (urlLang !== language) {
        setLanguageState(urlLang);
      }
    } else {
      // If no valid language parameter, redirect to preferred language
      const preferredLang = window.navigator.language.startsWith('he') ? 'he' : 'en';
      const newPath = location.pathname.replace(/^\/?/, `/${preferredLang}`);
      navigate(newPath, { replace: true });
      setLanguageState(preferredLang);
    }
  }, [params.lang, language, navigate, location]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
