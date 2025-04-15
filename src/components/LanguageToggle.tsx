
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";
import { useNavigate, useLocation } from "react-router-dom";

const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'he' : 'en';
    
    // Properly replace only the language segment in the path
    let newPath;
    
    // Extract path segments
    const segments = location.pathname.split('/').filter(Boolean);
    
    if (segments.length === 0) {
      // Root path
      newPath = `/${newLang}`;
    } else if (segments[0] === 'en' || segments[0] === 'he') {
      // Path already has language segment
      segments[0] = newLang;
      newPath = '/' + segments.join('/');
    } else {
      // Path has no language segment
      newPath = `/${newLang}/${segments.join('/')}`;
    }
    
    // Preserve query parameters
    if (location.search) {
      newPath += location.search;
    }
    
    navigate(newPath);
    setLanguage(newLang);
  };

  return (
    <Button 
      variant="ghost" 
      size="sm" 
      className="px-2" 
      onClick={toggleLanguage}
    >
      {language === 'en' ? 'עברית' : 'English'}
    </Button>
  );
};

export default LanguageToggle;
