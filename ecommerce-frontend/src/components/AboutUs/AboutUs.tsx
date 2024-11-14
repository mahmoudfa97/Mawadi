import axios from 'axios';
import React, { useEffect, useState } from 'react';
interface Translations {
  title: string;
  intro: string;
  team: string;
  mission: string;
  aboutUs: string;
}
const AboutUs: React.FC = () => {
  const [translations, setTranslations] = useState<Translations | null>(null);
  const [language, setLanguage] = useState('en'); // Default language

  useEffect(() => {
    // Fetch translations from the backend
    const fetchTranslations = async () => {
      try {
        const response = await axios.get(`/api/translate/aboutus`, {
          headers: {
            'Accept-Language': language, // Specify the language in the headers
          },
        });
        const data = await response.data
        setTranslations(data);
      } catch (error) {
        console.error('Error fetching translations:', error);
      }
    };

    fetchTranslations();
  }, [language]); // Refetch translations when language changes

  if (!translations) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-right">{translations.aboutUs}</h1>
      <div className="flex prose prose-lg max-w-none text-right">
        <div>
          <img src="/arabic-logo.png" alt="" />
        </div>
        <div>
          <p>{translations.intro}</p>
          <p>{translations.mission}</p>
          <p>{translations.team}</p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
