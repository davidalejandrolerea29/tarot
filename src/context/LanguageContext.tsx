import React, { createContext, useContext, useState, useEffect } from 'react';
import i18n from '../i18n';

type Language = 'es' | 'en';

interface LanguageContextType {
  language: Language;
  changeLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('es');

  useEffect(() => {
    // Initialize with stored preference or default
    const storedLanguage = localStorage.getItem('language') as Language | null;
    if (storedLanguage && ['es', 'en'].includes(storedLanguage)) {
      setLanguage(storedLanguage);
      i18n.changeLanguage(storedLanguage);
    }
  }, []);

  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
    i18n.changeLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const value = {
    language,
    changeLanguage
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};