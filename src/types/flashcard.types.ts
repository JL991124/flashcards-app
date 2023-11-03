export interface Flashcard {
  id: number;
  topic: string;
  cards: QACard[];
}

export interface QACard {
  id: number;
  question: string;
  answer: string;
}
