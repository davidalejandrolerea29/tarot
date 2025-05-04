import React from 'react';
import { useTranslation } from 'react-i18next';
import { Share2, Save, Repeat, Home, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';

interface ReadingActionsProps {
  onSave: () => void;
  onShare: () => void;
  onAnotherReading: () => void;
  onAnotherSpread: () => void;
  onBackToHome: () => void;
  onBuyDeck: () => void;
}

const ReadingActions: React.FC<ReadingActionsProps> = ({
  onSave,
  onShare,
  onAnotherReading,
  onAnotherSpread,
  onBackToHome,
  onBuyDeck
}) => {
  const { t } = useTranslation();
  
  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 }
  };

  return (
    <motion.div 
      className="mt-8 space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <div className="flex flex-wrap justify-center gap-4">
        <motion.button
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg transition-colors"
          onClick={onShare}
          variants={buttonVariants}
          initial="initial"
          whileHover="hover"
          whileTap="tap"
        >
          <Share2 size={18} />
          <span>{t('actions.share')}</span>
        </motion.button>
        
        <motion.button
          className="flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-lg transition-colors"
          onClick={onSave}
          variants={buttonVariants}
          initial="initial"
          whileHover="hover"
          whileTap="tap"
        >
          <Save size={18} />
          <span>{t('actions.save')}</span>
        </motion.button>
      </div>
      
      <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 pt-4">
        <motion.button
          className="flex items-center gap-2 bg-transparent border border-indigo-400 text-indigo-100 hover:bg-indigo-800/50 px-4 py-2 rounded-lg transition-colors"
          onClick={onAnotherReading}
          variants={buttonVariants}
          initial="initial"
          whileHover="hover"
          whileTap="tap"
        >
          <Repeat size={18} />
          <span>{t('actions.anotherWithSpread')}</span>
        </motion.button>
        
        <motion.button
          className="flex items-center gap-2 bg-transparent border border-indigo-400 text-indigo-100 hover:bg-indigo-800/50 px-4 py-2 rounded-lg transition-colors"
          onClick={onAnotherSpread}
          variants={buttonVariants}
          initial="initial"
          whileHover="hover"
          whileTap="tap"
        >
          <Repeat size={18} />
          <span>{t('actions.anotherSpread')}</span>
        </motion.button>
      </div>
      
      <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 pt-4 border-t border-indigo-800/50">
        <motion.button
          className="flex items-center gap-2 bg-transparent text-indigo-200 hover:text-yellow-300 px-4 py-2 rounded-lg transition-colors"
          onClick={onBackToHome}
          variants={buttonVariants}
          initial="initial"
          whileHover="hover"
          whileTap="tap"
        >
          <Home size={18} />
          <span>{t('actions.backToHome')}</span>
        </motion.button>
        
        <motion.button
          className="flex items-center gap-2 bg-yellow-600 hover:bg-yellow-500 text-white px-4 py-2 rounded-lg transition-colors"
          onClick={onBuyDeck}
          variants={buttonVariants}
          initial="initial"
          whileHover="hover"
          whileTap="tap"
        >
          <ShoppingBag size={18} />
          <span>{t('actions.buyDeck')}</span>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ReadingActions;