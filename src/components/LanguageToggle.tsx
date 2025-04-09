
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";

const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'he' : 'en');
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
