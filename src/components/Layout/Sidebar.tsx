import React from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { X, LayoutGrid, Book, Star, ShoppingBag, Settings, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const { t } = useTranslation();

  const linkClasses = "flex items-center space-x-2 px-4 py-3 hover:bg-indigo-800/50 rounded-lg transition-colors";
  const activeLinkClasses = "bg-indigo-800/70 text-yellow-300";

  return (
    <>
      {/* Mobile backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black/40 z-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleSidebar}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        className={`fixed left-0 top-0 bottom-0 w-64 bg-indigo-900/90 backdrop-blur-sm text-white p-4 shadow-xl z-30 overflow-y-auto transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-lg font-serif font-bold">Tarot Místico</h2>
          <button onClick={toggleSidebar} className="p-1 rounded-full hover:bg-indigo-800">
            <X size={20} />
          </button>
        </div>

        <nav className="space-y-6">
          {/* Section Spreads */}
          <div>
            <h3 className="text-sm uppercase text-indigo-300 font-semibold tracking-wider mb-3">
              {t('sidebar.spreads')}
            </h3>
            <ul className="space-y-1 ml-2">
              <li>
                <NavLink 
                  to="/reading/past-present-future" 
                  className={({ isActive }) => `${linkClasses} ${isActive ? activeLinkClasses : ''}`}
                  onClick={() => toggleSidebar()}
                >
                  <LayoutGrid size={18} />
                  <span>{t('sidebar.presentPastFuture')}</span>
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/reading/celtic-cross" 
                  className={({ isActive }) => `${linkClasses} ${isActive ? activeLinkClasses : ''}`}
                  onClick={() => toggleSidebar()}
                >
                  <LayoutGrid size={18} />
                  <span>{t('sidebar.celticCross')}</span>
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Section Interpretation */}
          <div>
            <h3 className="text-sm uppercase text-indigo-300 font-semibold tracking-wider mb-3">
              {t('sidebar.interpretation')}
            </h3>
            <ul className="space-y-1 ml-2">
              <li>
                <NavLink 
                  to="/interpretation/major-arcana" 
                  className={({ isActive }) => `${linkClasses} ${isActive ? activeLinkClasses : ''}`}
                  onClick={() => toggleSidebar()}
                >
                  <Book size={18} />
                  <span>{t('sidebar.majorArcana')}</span>
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/interpretation/minor-arcana" 
                  className={({ isActive }) => `${linkClasses} ${isActive ? activeLinkClasses : ''}`}
                  onClick={() => toggleSidebar()}
                >
                  <Book size={18} />
                  <span>{t('sidebar.minorArcana')}</span>
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Other Links */}
          <div className="space-y-1">
            <NavLink 
              to="/daily-card" 
              className={({ isActive }) => `${linkClasses} ${isActive ? activeLinkClasses : ''}`}
              onClick={() => toggleSidebar()}
            >
              <Star size={18} />
              <span>{t('sidebar.dailyCard')}</span>
            </NavLink>
            
            <NavLink 
              to="/buy-decks" 
              className={({ isActive }) => `${linkClasses} ${isActive ? activeLinkClasses : ''}`}
              onClick={() => toggleSidebar()}
            >
              <ShoppingBag size={18} />
              <span>{t('sidebar.buyDecks')}</span>
            </NavLink>
            
            <NavLink 
              to="/settings" 
              className={({ isActive }) => `${linkClasses} ${isActive ? activeLinkClasses : ''}`}
              onClick={() => toggleSidebar()}
            >
              <Settings size={18} />
              <span>{t('sidebar.settings')}</span>
            </NavLink>
            
            <NavLink 
              to="/help" 
              className={({ isActive }) => `${linkClasses} ${isActive ? activeLinkClasses : ''}`}
              onClick={() => toggleSidebar()}
            >
              <HelpCircle size={18} />
              <span>{t('sidebar.help')}</span>
            </NavLink>
          </div>
        </nav>
      </motion.aside>
    </>
  );
};

export default Sidebar;
