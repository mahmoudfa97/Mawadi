// AboutUs.tsx
// Purpose: Displays the "About Us" section of the application, including the company's mission, team, and introduction.
// Main Functionalities:
// - Fetches translations from the backend based on the selected language.
// - Displays the fetched translations, including the title, introduction, mission, and team information.

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
  const [language, setLanguage] = useState('ar'); // Default language

  useEffect(() => {
    // Fetch translations from the backend
    const fetchTranslations = async () => {
      try {
        const response = await axios.get(process.env.REACT_APP_API_URL+`translate/aboutus`, {
          headers: {
            'Accept-Language': language, // Specify the language in the headers
          },
        });
        const data = await response.data;
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
          <img src={`${window.location.origin.toString()}/arabic-logo.png`} alt="" />
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
