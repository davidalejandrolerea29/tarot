export interface ApiCard {
    type: string;
    name_short: string;
    name: string;
    value: string;
    value_int: number;
    meaning_up: string;
    meaning_rev: string;
    image: string;
    desc: string;
    amor: string;
    trabajo: string;
    finanzas: string;
    espiritualidad: string;
    salud: string;
  }
  
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
  