import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ShoppingBag, ExternalLink } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { tarotDecks } from '../data/cards';

const BuyDecksPage: React.FC = () => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <motion.h1
        className="text-3xl md:text-4xl font-serif font-bold text-center text-white mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {t('sidebar.buyDecks')}
      </motion.h1>
      
      <motion.div
        className="mb-12 max-w-3xl mx-auto text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <p className="text-lg text-indigo-200">
          Descubre nuestra selección de mazos de tarot de alta calidad. Cada mazo ha sido cuidadosamente seleccionado por su belleza y significado espiritual.
        </p>
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {tarotDecks.map((deck, index) => (
          <motion.div
            key={deck.id}
            className="bg-indigo-800/40 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg border border-indigo-600/50"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 + 0.3 }}
            whileHover={{ y: -5, scale: 1.02 }}
          >
            <div 
              className="h-48 bg-cover bg-center" 
              style={{ backgroundImage: `url(${deck.image})` }}
            ></div>
            
            <div className="p-6">
              <h2 className="text-xl font-medium text-white mb-2">{deck.name[language]}</h2>
              <p className="text-indigo-200 mb-6">{deck.description[language]}</p>
              
              <a 
                href={deck.amazonLink}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-yellow-600 hover:bg-yellow-500 text-white py-3 rounded-lg transition-colors font-medium text-center flex items-center justify-center space-x-2"
              >
                <ShoppingBag size={18} />
                <span>Comprar en Amazon</span>
                <ExternalLink size={16} />
              </a>
            </div>
          </motion.div>
        ))}
      </div>
      
      <motion.div
        className="mt-12 bg-indigo-800/40 backdrop-blur-sm rounded-xl p-6 border border-indigo-600/50 max-w-3xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        <h2 className="text-xl font-medium text-white mb-4">¿No encuentras lo que buscas?</h2>
        <p className="text-indigo-200 mb-4">
          Explora más opciones en nuestra tienda asociada de Amazon. Tenemos una amplia variedad de mazos de tarot para todas las preferencias y niveles.
        </p>
        <a 
          href="https://www.amazon.com/s?k=tarot+cards"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center space-x-2 text-yellow-400 hover:text-yellow-300 transition-colors"
        >
          <span>Ver todos los mazos disponibles</span>
          <ExternalLink size={16} />
        </a>
      </motion.div>
    </div>
  );
};

export default BuyDecksPage;