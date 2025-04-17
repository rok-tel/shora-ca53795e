
import { Link } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import { Facebook, Instagram, Twitter, Linkedin, CircleDollarSign } from "lucide-react";

const Footer = () => {
  const { language, t } = useLanguage();

  return (
    <footer className={`bg-finance-blue text-white py-12 mt-10 ${language === 'he' ? 'rtl' : 'ltr'}`}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link to={`/${language}`} className="flex items-center gap-2">
              <CircleDollarSign className="h-8 w-8 text-white" />
              <span className="text-2xl font-bold text-white font-montserrat">
                Shora
              </span>
            </Link>
            <p className="text-gray-300 max-w-md mt-4">
              Your trusted source for global financial news, analysis, and stock market insights.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-white transition-colors">{t('nav.home')}</Link></li>
              <li><Link to="/stocks" className="text-gray-300 hover:text-white transition-colors">{t('nav.stocks')}</Link></li>
              <li><Link to="/news" className="text-gray-300 hover:text-white transition-colors">{t('nav.news')}</Link></li>
              <li><Link to="/benefits" className="text-gray-300 hover:text-white transition-colors">{t('nav.benefits')}</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">{t('footer.followUs')}</h4>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-finance-lightBlue transition-colors">
                <Facebook />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-finance-lightBlue transition-colors">
                <Instagram />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-finance-lightBlue transition-colors">
                <Twitter />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-finance-lightBlue transition-colors">
                <Linkedin />
                <span className="sr-only">LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-300 text-sm">{t('footer.copyright')}</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/terms" className="text-gray-300 hover:text-white transition-colors text-sm">
              {t('footer.terms')}
            </Link>
            <Link to="/privacy" className="text-gray-300 hover:text-white transition-colors text-sm">
              {t('footer.privacy')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
