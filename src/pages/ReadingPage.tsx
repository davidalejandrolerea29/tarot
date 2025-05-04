import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import TarotCard from '../components/Cards/TarotCard';
import ReadingActions from '../components/Reading/ReadingActions';
import { majorArcana, spreadTypes, SpreadType } from '../data/cards';

const ReadingPage: React.FC = () => {
  const { spreadId } = useParams<{ spreadId: string }>();
  const { t } = useTranslation();
  const { language } = useLanguage();
  const { currentUser, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  
  const [spread, setSpread] = useState<SpreadType | null>(null);
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [shuffledCards, setShuffledCards] = useState<typeof majorArcana>([]);
  const [stage, setStage] = useState<'select-deck' | 'select-cards' | 'shuffling' | 'reading'>('select-deck');
  const [selectedDeck, setSelectedDeck] = useState<string>('rider-waite');
  const [showConcentrateMessage, setShowConcentrateMessage] = useState<boolean>(false);
  
  useEffect(() => {
    if (!currentUser) {
      signInWithGoogle();
      return;
    }
    
    const foundSpread = spreadTypes.find(s => s.id === spreadId);
    if (foundSpread) {
      setSpread(foundSpread);
    } else {
      navigate('/');
    }
    
    // Shuffle the cards
    const shuffled = [...majorArcana].sort(() => Math.random() - 0.5);
    setShuffledCards(shuffled);
  }, [spreadId, currentUser, navigate, signInWithGoogle]);
  
  const handleDeckSelected = () => {
    setStage('select-cards');
  };
  
  const handleCardSelected = (cardIndex: number) => {
    if (selectedCards.includes(cardIndex)) return;
    
    const newSelectedCards = [...selectedCards, cardIndex];
    setSelectedCards(newSelectedCards);
    
    if (spread && newSelectedCards.length === 1) {
      setShowConcentrateMessage(true);
      setTimeout(() => {
        setShowConcentrateMessage(false);
        setTimeout(() => {
          setStage('shuffling');
          setTimeout(() => {
            setStage('reading');
          }, 2000);
        }, 500);
      }, 2000);
    } else if (spread && newSelectedCards.length === spread.cardCount) {
      setStage('shuffling');
      setTimeout(() => {
        setStage('reading');
      }, 2000);
    }
  };
  
  const handleSaveReading = () => {
    // Save reading logic
    console.log('Saving reading');
  };
  
  const handleShareReading = () => {
    // Share reading logic
    console.log('Sharing reading');
  };
  
  const handleAnotherReading = () => {
    // Reset for another reading with same spread
    setSelectedCards([]);
    setStage('select-cards');
    const shuffled = [...majorArcana].sort(() => Math.random() - 0.5);
    setShuffledCards(shuffled);
  };
  
  const handleAnotherSpread = () => {
    // Go back to spread selection
    navigate('/');
  };
  
  const handleBackToHome = () => {
    navigate('/');
  };
  
  const handleBuyDeck = () => {
    window.open('https://www.amazon.com/dp/0913866083', '_blank');
  };
  
  if (!spread) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <Loader2 className="h-8 w-8 text-white animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 pb-12">
      <motion.h1
        className="text-3xl md:text-4xl font-serif font-bold text-center text-white mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {spread.name[language]}
      </motion.h1>
      
      <AnimatePresence mode="wait">
        {stage === 'select-deck' && (
          <motion.div
            key="select-deck"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-xl text-center text-yellow-200 mb-6">
              {t('reading.selectDeck')}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                className="bg-indigo-800/40 backdrop-blur-sm p-4 rounded-xl border border-indigo-600/50 cursor-pointer"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedDeck('rider-waite')}
              >
                <div className="h-40 bg-cover bg-center rounded-lg mb-3"
                     style={{ backgroundImage: 'url(https://m.media-amazon.com/images/I/81XT7+hbvIL._AC_UF1000,1000_QL80_.jpg)' }}>
                </div>
                <h3 className="text-lg font-medium text-white">Rider-Waite</h3>
                <p className="text-indigo-200 text-sm">El mazo clásico de tarot, ideal para principiantes y expertos.</p>
              </motion.div>
              
              <motion.div
                className={`bg-indigo-800/40 backdrop-blur-sm p-4 rounded-xl border ${selectedDeck === 'rider-waite' ? 'border-yellow-400/70' : 'border-indigo-600/50'} cursor-pointer`}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedDeck('rider-waite')}
              >
                <div className="h-40 bg-cover bg-center rounded-lg mb-3"
                     style={{ backgroundImage: 'url(https://m.media-amazon.com/images/I/71I0R8JhH0L._AC_UF1000,1000_QL80_.jpg)' }}>
                </div>
                <h3 className="text-lg font-medium text-white">Tarot de Marsella</h3>
                <p className="text-indigo-200 text-sm">Un mazo con orígenes históricos y simbolismo tradicional.</p>
              </motion.div>
            </div>
            
            <div className="flex justify-center mt-8">
              <motion.button
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleDeckSelected}
              >
                Continuar
              </motion.button>
            </div>
          </motion.div>
        )}
        
        {stage === 'select-cards' && (
          <motion.div
            key="select-cards"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <h2 className="text-xl text-center text-yellow-200 mb-6">
              {t('reading.selectCard')}
            </h2>
            
            <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-8">
              {shuffledCards.slice(0, 22).map((card, index) => (
                <TarotCard
                  key={card.id}
                  card={card}
                  isSelectable={!selectedCards.includes(index)}
                  isFlipped={true}
                  onSelect={() => handleCardSelected(index)}
                />
              ))}
            </div>
            
            <AnimatePresence>
              {showConcentrateMessage && (
                <motion.div
                  className="fixed inset-0 flex items-center justify-center bg-black/60 z-50"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <motion.div
                    className="bg-indigo-900 text-white p-8 rounded-xl shadow-2xl max-w-md text-center"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0.8 }}
                  >
                    <h3 className="text-2xl font-serif mb-2">{t('reading.concentrate')}</h3>
                    <p className="text-indigo-200">Respira profundamente y concéntrate en tu pregunta o situación.</p>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
        
        {stage === 'shuffling' && (
          <motion.div
            key="shuffling"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center py-12"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1 }}
            >
              <Loader2 className="h-12 w-12 text-yellow-300" />
            </motion.div>
            <h2 className="text-xl text-yellow-200 mt-4">
              {t('reading.shuffling')}
            </h2>
          </motion.div>
        )}
        
        {stage === 'reading' && (
          <motion.div
            key="reading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-xl md:text-2xl text-center text-yellow-200 mb-8">
              {t('reading.yourReading')}
            </h2>
            
            <div className="flex flex-col md:flex-row items-center justify-center flex-wrap gap-6 md:gap-8">
              {selectedCards.map((cardIndex, index) => {
                const card = shuffledCards[cardIndex];
                return (
                  <motion.div
                    key={index}
                    className="flex flex-col items-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.3 }}
                  >
                    <TarotCard
                      card={card}
                      isFlipped={false}
                      position={spread.positions[language][index]}
                    />
                    <div className="mt-4 max-w-xs">
                      <h3 className="text-lg font-serif text-yellow-200 mb-1">{card.name[language]}</h3>
                      <p className="text-sm text-indigo-200">{card.upright[language]}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
            
            <ReadingActions
              onSave={handleSaveReading}
              onShare={handleShareReading}
              onAnotherReading={handleAnotherReading}
              onAnotherSpread={handleAnotherSpread}
              onBackToHome={handleBackToHome}
              onBuyDeck={handleBuyDeck}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ReadingPage;