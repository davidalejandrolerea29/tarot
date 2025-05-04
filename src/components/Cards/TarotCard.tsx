import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TarotCard as TarotCardType } from '../../data/cards';
import { useLanguage } from '../../context/LanguageContext';

interface TarotCardProps {
  card: TarotCardType;
  isSelectable?: boolean;
  isFlipped?: boolean;
  position?: string;
  onSelect?: () => void;
}

const TarotCard: React.FC<TarotCardProps> = ({ 
  card, 
  isSelectable = false, 
  isFlipped = false,
  position = '',
  onSelect 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const { language } = useLanguage();
  
  const cardBackImage = "https://www.trustedtarot.com/img/cards/card-back.png";
  
  const cardVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05, y: -10 },
    selected: { scale: 1.08, y: -15, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" },
    pressed: { scale: 0.98 }
  };
  
  const flipVariants = {
    back: { rotateY: 180 },
    front: { rotateY: 0 }
  };

  return (
    <div className="relative">
      {position && (
        <div className="absolute -top-6 left-0 right-0 text-center text-sm text-yellow-300 font-medium">
          {position}
        </div>
      )}
      <motion.div
        className={`w-32 h-56 md:w-40 md:h-64 rounded-lg cursor-${isSelectable ? 'pointer' : 'default'} 
                    perspective-1000 relative preserve-3d`}
        variants={cardVariants}
        initial="initial"
        whileHover={isSelectable ? "hover" : undefined}
        whileTap={isSelectable ? "pressed" : undefined}
        animate={isHovered && isSelectable ? "hover" : "initial"}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onClick={isSelectable ? onSelect : undefined}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
      >
        <motion.div
          className="absolute inset-0 rounded-lg shadow-lg backface-hidden"
          variants={flipVariants}
          initial={isFlipped ? "back" : "front"}
          animate={isFlipped ? "back" : "front"}
          transition={{ duration: 0.6 }}
          style={{ 
            backgroundImage: `url(${card.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            border: '4px solid #2D3748', // Dark border
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
          }}
        />
        <motion.div
          className="absolute inset-0 rounded-lg shadow-lg backface-hidden"
          variants={flipVariants}
          initial={isFlipped ? "front" : "back"}
          animate={isFlipped ? "front" : "back"}
          transition={{ duration: 0.6 }}
          style={{ 
            backgroundImage: `url(${cardBackImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            border: '4px solid #2D3748', // Dark border
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
          }}
        />
      </motion.div>
      {!isFlipped && (
        <div className="mt-2 text-center text-sm text-white">
          {card.name[language]}
        </div>
      )}
    </div>
  );
};

export default TarotCard;