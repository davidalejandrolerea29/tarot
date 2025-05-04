import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Menu, User, Globe, Star } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { motion } from 'framer-motion';

interface NavbarProps {
  toggleSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
  const { t } = useTranslation();
  const { currentUser, signInWithGoogle, signOut } = useAuth();
  const { language, changeLanguage } = useLanguage();

  return (
    <motion.nav
      className="bg-indigo-950/90 backdrop-blur-sm text-white py-3 px-4 flex items-center justify-between shadow-lg z-10"
      initial={{ y: -50 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 120 }}
    >
      <div className="flex items-center space-x-3">
        {/* Button for the hamburger menu, visible only in small screens */}
        {currentUser && (
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-full hover:bg-indigo-800 transition-colors"
            aria-label="Toggle menu"
          >
            <Menu size={24} />
          </button>
        )}


        <Link to="/" className="flex items-center space-x-2">
          <Star className="h-8 w-8 text-yellow-400" />
          <span className="text-xl font-serif font-bold">Tarot Místico</span>
        </Link>
      </div>

      {/* Nav items visible only in large screens (md and up) */}
      <div className="hidden md:flex items-center space-x-6">
        <Link to="/" className="hover:text-yellow-400 transition-colors">
          {t('nav.home')}
        </Link>
        <Link to="/readings" className="hover:text-yellow-400 transition-colors">
          {t('nav.readings')}
        </Link>
        <Link to="/daily-card" className="hover:text-yellow-400 transition-colors">
          {t('nav.dailyCard')}
        </Link>
        <Link to="/contact" className="hover:text-yellow-400 transition-colors">
          {t('nav.contact')}
        </Link>
      </div>

      <div className="flex items-center space-x-2">
        {/* Language switcher */}
        <button
          onClick={() => changeLanguage(language === 'es' ? 'en' : 'es')}
          className="p-2 rounded-full hover:bg-indigo-800 transition-colors"
          aria-label="Change language"
        >
          <Globe size={20} />
        </button>

        {/* Authentication buttons */}
        {currentUser ? (
          <div className="flex items-center space-x-3">
            <span className="hidden md:inline text-sm">{currentUser.displayName}</span>
            <button
              onClick={signOut}
              className="bg-indigo-700 text-white px-3 py-1.5 rounded-full hover:bg-indigo-600 transition-colors text-sm"
            >
              {t('auth.signOut')}
            </button>
          </div>
        ) : (
          <button
            onClick={signInWithGoogle}
            className="bg-indigo-700 text-white px-3 py-1.5 rounded-full hover:bg-indigo-600 transition-colors flex items-center space-x-1 text-sm"
          >
            <User size={16} />
            <span className="hidden md:inline">{t('auth.signIn')}</span>
          </button>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;

