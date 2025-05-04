import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import MainLayout from './components/Layout/MainLayout';
import HomePage from './pages/HomePage';
import ReadingPage from './pages/ReadingPage';
import DailyCardPage from './pages/DailyCardPage';
import BuyDecksPage from './pages/BuyDecksPage';
import SingleCardReadingPage from './pages/SingleCardReadingPage';
import ThreeCardReadingPage from './pages/ThreeCardReadingPage';
import CelticCrossReadingPage from './pages/CelticCrossReadingPage';

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<HomePage />} />
              <Route path="reading/:spreadId" element={<ReadingPage />} />
              <Route path="daily-card" element={<DailyCardPage />} />
              <Route path="buy-decks" element={<BuyDecksPage />} />
              <Route path="/reading/one-card" element={<SingleCardReadingPage />} />
              <Route path="/reading/three-cards" element={<ThreeCardReadingPage />} />
              <Route path="/reading/celtic-cross" element={<CelticCrossReadingPage />} />
              {/* Add more routes as needed */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;