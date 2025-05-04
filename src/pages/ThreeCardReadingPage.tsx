import React, { useEffect, useState } from 'react';
import { TarotCard } from '../models/tarotTypes';
import { fetchAndTransformCards } from '../utils/tarotUtils';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const positions = ['Pasado', 'Presente', 'Futuro'];

const ThreeCardReadingPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [cards, setCards] = useState<TarotCard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCards = async () => {
        setLoading(true);
        const allCards = await fetchAndTransformCards();
        const shuffled = [...allCards].sort(() => 0.5 - Math.random());
      
        const uniqueCards: TarotCard[] = [];
        const usedIds = new Set();
      
        for (let i = 0; i < shuffled.length && uniqueCards.length < 3; i++) {
          const card = shuffled[i];
          if (!usedIds.has(card.id)) {
            uniqueCards.push(card);
            usedIds.add(card.id);
          }
        }
      
        setCards(uniqueCards);
        setLoading(false);
      };
      

    getCards();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white text-xl">
        Cargando tus cartas...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 text-white">
      <h1 className="text-4xl font-bold text-center mb-12">
        Lectura de 3 Cartas: {t('past')} - {t('present')} - {t('future')}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {cards.map((card, index) => (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.3 }}
            className="bg-indigo-800/30 backdrop-blur-md border border-indigo-500 rounded-xl p-6 shadow-xl text-center"
          >
            <h2 className="text-2xl font-semibold text-yellow-300 mb-4">
              {positions[index]}
            </h2>
            <img src={card.image} alt={card.name.es} className="mx-auto w-48 h-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">{card.name[i18n.language as 'es' | 'en']}</h3>
            <p className="text-indigo-200 text-sm">
              {card.description[i18n.language as 'es' | 'en']}
            </p>
          </motion.div>
        ))}
      </div>
      {cards.length === 3 && (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="mt-12 bg-indigo-900/40 p-6 rounded-xl shadow-lg border border-indigo-600"
        >
            <h2 className="text-2xl font-semibold text-yellow-400 mb-4 text-center">
            Significado General
            </h2>
            <p className="text-indigo-100 leading-relaxed text-sm md:text-base">
            {positions.map((pos, idx) => {
                const card = cards[idx];
                return (
                <span key={idx}>
                    <strong>{pos}:</strong> {card.upright[i18n.language as 'es' | 'en']}{" "}
                </span>
                );
            })}
            </p>
        </motion.div>
        )}

    </div>
    
  );
};

export default ThreeCardReadingPage;
