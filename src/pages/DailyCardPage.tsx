import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Loader2, Calendar, Share2, Save } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import TarotCard from '../components/Cards/TarotCard';
import { majorArcana, TarotCard as TarotCardType } from '../data/cards';

const DailyCardPage: React.FC = () => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [dailyCard, setDailyCard] = useState<TarotCardType | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  
  useEffect(() => {
    // Generate a daily card based on the date
    const getCardForToday = () => {
      const today = new Date();
      const dateString = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
      // Use the date string to seed a simple hash function
      let hash = 0;
      for (let i = 0; i < dateString.length; i++) {
        hash = (hash << 5) - hash + dateString.charCodeAt(i);
        hash = hash & hash; // Convert to 32bit integer
      }
      // Use the absolute value of the hash to get an index within the card array
      const cardIndex = Math.abs(hash) % majorArcana.length;
      return majorArcana[cardIndex];
    };
    
    // Simulate loading
    setTimeout(() => {
      setDailyCard(getCardForToday());
      setLoading(false);
    }, 1500);
  }, []);
  
  const handleRevealCard = () => {
    setIsRevealed(true);
  };
  
  const handleShare = () => {
    // Share daily card logic
    console.log('Sharing daily card');
  };
  
  const handleSave = () => {
    // Save daily card logic
    console.log('Saving daily card');
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <Loader2 className="h-8 w-8 text-white animate-spin" />
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <motion.h1
        className="text-3xl md:text-4xl font-serif font-bold text-center text-white mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {t('sidebar.dailyCard')}
      </motion.h1>
      
      <motion.div
        className="flex items-center justify-center mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <Calendar className="text-yellow-300 h-5 w-5 mr-2" />
        <span className="text-indigo-200">
          {new Date().toLocaleDateString(language === 'es' ? 'es-ES' : 'en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric'
          })}
        </span>
      </motion.div>
      
      <div className="flex flex-col md:flex-row items-center justify-center gap-12">
        <motion.div
          className="mb-6 md:mb-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {dailyCard && (
            <TarotCard
              card={dailyCard}
              isFlipped={!isRevealed}
            />
          )}
          
          {!isRevealed && (
            <motion.button
              className="mt-6 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-medium mx-auto block"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleRevealCard}
            >
              Revelar Carta
            </motion.button>
          )}
        </motion.div>
        
        {isRevealed && dailyCard && (
          <motion.div
            className="bg-indigo-800/40 backdrop-blur-sm rounded-xl p-6 border border-indigo-600/50 max-w-md"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h2 className="text-2xl font-serif text-yellow-300 mb-4">{dailyCard.name[language]}</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-indigo-200 mb-1">{t('reading.cardMeaning')}</h3>
                <p className="text-white">{dailyCard.description[language]}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-indigo-300 uppercase tracking-wider mb-1">Palabras Clave</h3>
                <div className="flex flex-wrap gap-2">
                  {dailyCard.keywords[language].map((keyword, index) => (
                    <span key={index} className="bg-indigo-700/60 px-2 py-1 rounded-md text-sm text-indigo-100">
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex space-x-4 mt-8">
                <motion.button
                  className="flex items-center space-x-1 text-indigo-300 hover:text-yellow-300 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleShare}
                >
                  <Share2 size={18} />
                  <span>Compartir</span>
                </motion.button>
                
                <motion.button
                  className="flex items-center space-x-1 text-indigo-300 hover:text-yellow-300 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSave}
                >
                  <Save size={18} />
                  <span>Guardar</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default DailyCardPage;