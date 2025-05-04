// src/pages/SingleCardReadingPage.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TarotCard } from '../models/tarotTypes';
import { fetchAndTransformCards } from '../utils/tarotUtils';

const SingleCardReadingPage: React.FC = () => {
  const [card, setCard] = useState<TarotCard | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function drawCard() {
      const cards = await fetchAndTransformCards();
      const randomIndex = Math.floor(Math.random() * cards.length);
      setCard(cards[randomIndex]);
    }

    drawCard();
  }, []);

  if (!card) {
    return <div className="text-white text-center mt-20">Cargando carta...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 text-white text-center">
      <h1 className="text-4xl font-serif font-bold mb-6">Tu Carta Única</h1>
      <img src={card.image} alt={card.name.es} className="mx-auto w-60 mb-6" />
      <h2 className="text-2xl font-bold">{card.name.es}</h2>
      <p className="italic text-indigo-300 mt-2 mb-4">{card.description.es}</p>
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2 text-yellow-300">Significado:</h3>
        <p className="text-indigo-200">{card.upright.es}</p>
      </div>
      <button
        onClick={() => navigate('/')}
        className="mt-10 px-6 py-3 bg-indigo-600 rounded-lg hover:bg-indigo-500 transition-colors"
      >
        Volver al Inicio
      </button>
    </div>
  );
};

export default SingleCardReadingPage;
