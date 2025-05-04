import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Gift, BookOpen, Shuffle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { spreadTypes } from '../data/cards';

const HomePage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { currentUser, signInWithGoogle } = useAuth();
  
  const handleStartReading = (spreadId: string) => {
    if (currentUser) {
      let path = '/reading';
  
      switch (spreadId) {
        case 'single':
          path += '/one-card';
          break;
        case 'past-present-future':
          path += '/three-cards';
          break;
        case 'celtic-cross':
          path += '/celtic-cross';
          break;
        default:
          path += '/one-card'; // fallback
      }
  
      navigate(path);
    } else {
      signInWithGoogle();
    }
  };

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: 'spring', stiffness: 300, damping: 30 }
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <motion.div 
        className="text-center mb-16"
        variants={fadeInUpVariants}
      >
        <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-4">
          Tarot <span className="text-yellow-400">Místico</span>
        </h1>
        <p className="text-xl text-indigo-200 max-w-2xl mx-auto">
          Descubre los secretos del tarot y recibe orientación espiritual para tu camino.
        </p>
      </motion.div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
        variants={fadeInUpVariants}
      >
        <motion.div 
          className="bg-indigo-800/40 backdrop-blur-sm rounded-xl p-6 border border-indigo-600/30 hover:border-indigo-500/50 transition-all shadow-xl hover:shadow-indigo-900/30"
          whileHover={{ y: -5, scale: 1.02 }}
        >
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-indigo-700 rounded-full">
              <Sparkles className="h-8 w-8 text-yellow-300" />
            </div>
          </div>
          <h3 className="text-xl font-semibold text-center mb-2 text-yellow-100">Lecturas Intuitivas</h3>
          <p className="text-indigo-200 text-center">
            Conecta con tu intuición a través de nuestras lecturas personalizadas de tarot.
          </p>
        </motion.div>

        <motion.div 
          className="bg-indigo-800/40 backdrop-blur-sm rounded-xl p-6 border border-indigo-600/30 hover:border-indigo-500/50 transition-all shadow-xl hover:shadow-indigo-900/30"
          whileHover={{ y: -5, scale: 1.02 }}
        >
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-indigo-700 rounded-full">
              <Gift className="h-8 w-8 text-yellow-300" />
            </div>
          </div>
          <h3 className="text-xl font-semibold text-center mb-2 text-yellow-100">Carta del Día</h3>
          <p className="text-indigo-200 text-center">
            Recibe orientación diaria con tu carta del día completamente gratuita.
          </p>
        </motion.div>

        <motion.div 
          className="bg-indigo-800/40 backdrop-blur-sm rounded-xl p-6 border border-indigo-600/30 hover:border-indigo-500/50 transition-all shadow-xl hover:shadow-indigo-900/30 md:col-span-2 lg:col-span-1"
          whileHover={{ y: -5, scale: 1.02 }}
        >
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-indigo-700 rounded-full">
              <BookOpen className="h-8 w-8 text-yellow-300" />
            </div>
          </div>
          <h3 className="text-xl font-semibold text-center mb-2 text-yellow-100">Sabiduría Arcana</h3>
          <p className="text-indigo-200 text-center">
            Explora el significado profundo de los Arcanos Mayores y Menores.
          </p>
        </motion.div>
      </motion.div>

      <motion.div 
        className="mb-16"
        variants={fadeInUpVariants}
      >
        <h2 className="text-2xl md:text-3xl font-serif font-bold text-center text-white mb-8">
          Elige tu <span className="text-yellow-400">Tirada</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {spreadTypes.map((spread) => (
            <motion.div
              key={spread.id}
              className="bg-gradient-to-br from-purple-900 to-indigo-900 rounded-xl overflow-hidden shadow-lg"
              whileHover={{ y: -5, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">{spread.name.es}</h3>
                <p className="text-indigo-200 mb-6 min-h-[60px]">{spread.description.es}</p>
                <button
                  onClick={() => handleStartReading(spread.id)}
                  className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white py-3 rounded-lg transition-colors font-medium"
                >
                  <Shuffle size={18} />
                  <span>Iniciar Tirada</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div 
        className="flex flex-col items-center"
        variants={fadeInUpVariants}
      >
        <div className="max-w-4xl text-center">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-white mb-4">
            Descubre tu destino hoy
          </h2>
          <p className="text-lg text-indigo-200 mb-8">
            El tarot es una herramienta ancestral que te ayuda a conectar con tu intuición y despertar tu sabiduría interior.
          </p>
          {!currentUser ? (
            <motion.button
              onClick={() => signInWithGoogle()}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-lg shadow-lg font-medium text-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Inicia Sesión para Comenzar
            </motion.button>
          ) : (
            <motion.button
              onClick={() => navigate('/daily-card')}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-lg shadow-lg font-medium text-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Ver Mi Carta del Día
            </motion.button>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default HomePage;