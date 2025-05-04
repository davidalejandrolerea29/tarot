export interface TarotCard {
  id: number;
  name: {
    es: string;
    en: string;
  };
  image: string;
  description: {
    es: string;
    en: string;
  };
  keywords: {
    es: string[];
    en: string[];
  };
  upright: {
    es: string;
    en: string;
  };
  reversed: {
    es: string;
    en: string;
  };
}

// Major Arcana cards
export const majorArcana: TarotCard[] = [
  {
    id: 0,
    name: {
      es: 'El Loco',
      en: 'The Fool'
    },
    image: 'https://www.trustedtarot.com/img/cards/the-fool.png',
    description: {
      es: 'El Loco representa nuevos comienzos, fe en el futuro, inocencia, espíritu libre y originalidad.',
      en: 'The Fool represents new beginnings, faith in the future, innocence, free spirit, and originality.'
    },
    keywords: {
      es: ['Nuevo comienzo', 'Inocencia', 'Aventura', 'Espontaneidad'],
      en: ['New beginning', 'Innocence', 'Adventure', 'Spontaneity']
    },
    upright: {
      es: 'Nuevos comienzos, fe en el futuro, optimismo, aventura',
      en: 'New beginnings, faith in the future, optimism, adventure'
    },
    reversed: {
      es: 'Imprudencia, riesgo, despreocupación, impulsividad',
      en: 'Recklessness, risk-taking, carelessness, impulsivity'
    }
  },
  {
    id: 1,
    name: {
      es: 'El Mago',
      en: 'The Magician'
    },
    image: 'https://www.trustedtarot.com/img/cards/the-magician.png',
    description: {
      es: 'El Mago representa manifestación, poder personal, habilidad, concentración y acción.',
      en: 'The Magician represents manifestation, personal power, skill, concentration, and action.'
    },
    keywords: {
      es: ['Manifestación', 'Poder', 'Acción', 'Inspiración'],
      en: ['Manifestation', 'Power', 'Action', 'Inspiration']
    },
    upright: {
      es: 'Manifestación, poder personal, inspiración, determinación',
      en: 'Manifestation, personal power, inspiration, determination'
    },
    reversed: {
      es: 'Manipulación, inseguridad, uso incorrecto del poder',
      en: 'Manipulation, insecurity, poor planning, untapped talents'
    }
  },
  {
    id: 2,
    name: {
      es: 'La Suma Sacerdotisa',
      en: 'The High Priestess'
    },
    image: 'https://www.trustedtarot.com/img/cards/the-high-priestess.png',
    description: {
      es: 'La Suma Sacerdotisa representa intuición, sabiduría inconsciente, misterio y espiritualidad.',
      en: 'The High Priestess represents intuition, unconscious knowledge, mystery, and spirituality.'
    },
    keywords: {
      es: ['Intuición', 'Sabiduría', 'Misterio', 'Espiritualidad'],
      en: ['Intuition', 'Wisdom', 'Mystery', 'Spirituality']
    },
    upright: {
      es: 'Intuición, sabiduría inconsciente, conocimiento divino',
      en: 'Intuition, unconscious knowledge, divine feminine, inner voice'
    },
    reversed: {
      es: 'Secretos, desconexión de la intuición, información oculta',
      en: 'Secrets, disconnected from intuition, hidden information'
    }
  },
  // Add more cards here...
];

// Spread types
export interface SpreadType {
  id: string;
  name: {
    es: string;
    en: string;
  };
  description: {
    es: string;
    en: string;
  };
  cardCount: number;
  positions: {
    es: string[];
    en: string[];
  };
}

export const spreadTypes: SpreadType[] = [
  {
    id: 'single',
    name: {
      es: 'Carta Única',
      en: 'Single Card'
    },
    description: {
      es: 'Una sola carta para obtener una visión rápida sobre un tema específico.',
      en: 'A single card for a quick insight into a specific issue.'
    },
    cardCount: 1,
    positions: {
      es: ['Visión general'],
      en: ['Overview']
    }
  },
  {
    id: 'past-present-future',
    name: {
      es: 'Pasado-Presente-Futuro',
      en: 'Past-Present-Future'
    },
    description: {
      es: 'Tres cartas que representan las influencias pasadas, la situación presente y el resultado potencial.',
      en: 'Three cards representing past influences, present situation, and potential outcome.'
    },
    cardCount: 3,
    positions: {
      es: ['Pasado', 'Presente', 'Futuro'],
      en: ['Past', 'Present', 'Future']
    }
  },
  {
    id: 'celtic-cross',
    name: {
      es: 'Cruz Celta',
      en: 'Celtic Cross'
    },
    description: {
      es: 'Una tirada de diez cartas que ofrece una visión detallada de diferentes aspectos de una situación.',
      en: 'A ten-card spread offering a detailed view of different aspects of a situation.'
    },
    cardCount: 10,
    positions: {
      es: [
        'Situación actual', 
        'Desafío', 
        'Pasado reciente', 
        'Futuro cercano', 
        'Aspiraciones', 
        'Influencias inconscientes', 
        'Tu influencia', 
        'Influencias externas', 
        'Esperanzas o temores', 
        'Resultado'
      ],
      en: [
        'Current situation', 
        'Challenge', 
        'Recent past', 
        'Near future', 
        'Aspirations', 
        'Unconscious influences', 
        'Your influence', 
        'External influences', 
        'Hopes or fears', 
        'Outcome'
      ]
    }
  }
];

// Tarot Deck types
export interface TarotDeck {
  id: string;
  name: {
    es: string;
    en: string;
  };
  image: string;
  description: {
    es: string;
    en: string;
  };
  amazonLink: string;
}

export const tarotDecks: TarotDeck[] = [
  {
    id: 'rider-waite',
    name: {
      es: 'Rider-Waite',
      en: 'Rider-Waite'
    },
    image: 'https://m.media-amazon.com/images/I/81XT7+hbvIL._AC_UF1000,1000_QL80_.jpg',
    description: {
      es: 'El mazo de tarot más popular y reconocible, perfecto para principiantes.',
      en: 'The most popular and recognizable tarot deck, perfect for beginners.'
    },
    amazonLink: 'https://www.amazon.com/dp/0913866083'
  },
  {
    id: 'thoth',
    name: {
      es: 'Tarot Thoth',
      en: 'Thoth Tarot'
    },
    image: 'https://m.media-amazon.com/images/I/71MQ9xTJiTL._AC_UF1000,1000_QL80_.jpg',
    description: {
      es: 'Creado por Aleister Crowley, un mazo con simbolismo profundo y místico.',
      en: 'Created by Aleister Crowley, a deck with deep and mystical symbolism.'
    },
    amazonLink: 'https://www.amazon.com/dp/0877282684'
  },
  {
    id: 'marseille',
    name: {
      es: 'Tarot de Marsella',
      en: 'Marseille Tarot'
    },
    image: 'https://m.media-amazon.com/images/I/71I0R8JhH0L._AC_UF1000,1000_QL80_.jpg',
    description: {
      es: 'Un mazo tradicional con orígenes en el siglo XV, conocido por su diseño clásico.',
      en: 'A traditional deck with origins in the 15th century, known for its classical design.'
    },
    amazonLink: 'https://www.amazon.com/dp/0738700118'
  }
];