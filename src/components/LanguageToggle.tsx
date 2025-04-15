
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";
import { useNavigate, useLocation } from "react-router-dom";

const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'he' : 'en';
    // Fix the regex to match the entire language part of the path properly
    const newPath = location.pathname.replace(/^\/(?:he|en)(?=\/|$)/, `/${newLang}`);
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
