import { ApiCard, TarotCard } from '../models/tarotTypes';

export function transformApiCardToTarotCard(apiCard: ApiCard): TarotCard {
  return {
    id: apiCard.value_int,
    name: {
      es: apiCard.name,
      en: apiCard.name,
    },
    image: apiCard.image,
    description: {
      es: apiCard.desc,
      en: apiCard.desc,
    },
    keywords: {
      es: [],
      en: [],
    },
    upright: {
      es: apiCard.meaning_up,
      en: apiCard.meaning_up,
    },
    reversed: {
      es: apiCard.meaning_rev,
      en: apiCard.meaning_rev,
    }
  };
}

export async function fetchAndTransformCards(): Promise<TarotCard[]> {
  const response = await fetch('https://tarot-api-es.vercel.app/api/v1/cards');
  const data = await response.json();
  return data.cards.map(transformApiCardToTarotCard);
}
