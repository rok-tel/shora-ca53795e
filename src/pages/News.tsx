
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { useLanguage } from "@/context/LanguageContext";

const News = () => {
  const navigate = useNavigate();
  
  // Redirect to home page for now, since we removed the news navigation
  useEffect(() => {
    navigate('/');
  }, [navigate]);

  return (
    <Layout>
      <div className="text-center py-12">
        <p>Redirecting to home page...</p>
      </div>
    </Layout>
  );
};

export default News;
