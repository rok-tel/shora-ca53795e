
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Language } from '@/context/types';

export const useLanguageInit = () => {
  const [language, setLanguageState] = useState<Language>('en');
  const [isInitialized, setIsInitialized] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Initialize language preference once on client-side
  useEffect(() => {
    if (isInitialized) return;
    
    try {
      const pathSegments = window.location.pathname.split('/').filter(Boolean);
      const urlLang = pathSegments[0] as Language | undefined;
      const preferredLang = (urlLang === 'he' || urlLang === 'en') ? urlLang : 
                           (typeof window !== 'undefined' && window.navigator.language.startsWith('he')) ? 'he' : 'en';
      
      setLanguageState(preferredLang);
      setIsInitialized(true);
    } catch (error) {
      console.error('Error initializing language:', error);
      // Fallback to English if there's an error
      setLanguageState('en');
      setIsInitialized(true);
    }
  }, [isInitialized]);

  // Handle URL path changes
  useEffect(() => {
    if (!isInitialized) return;
    
    try {
      const pathSegments = location.pathname.split('/').filter(Boolean);
      const urlLang = pathSegments[0] as Language | undefined;
      
      if (urlLang === 'he' || urlLang === 'en') {
        if (urlLang !== language) {
          setLanguageState(urlLang);
        }
      } else {
        const preferredLang = typeof window !== 'undefined' && window.navigator.language.startsWith('he') ? 'he' : 'en';
        let newPath = '/' + preferredLang;
        
        if (pathSegments.length > 0) {
          newPath += '/' + pathSegments.join('/');
        }
        
        if (location.search) {
          newPath += location.search;
        }
        
        if (location.pathname !== newPath) {
          navigate(newPath, { replace: true });
        }
        
        setLanguageState(preferredLang);
      }
    } catch (error) {
      console.error('Error handling path change:', error);
    }
  }, [location.pathname, isInitialized, language, navigate, location.search]);

  return {
    language,
    setLanguage: setLanguageState,
    isInitialized
  };
};
