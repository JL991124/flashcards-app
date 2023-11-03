export interface FlashcardT {
  id: string;
  topic: string;
  cards: CardT[];
}

export interface CardT {
  id: string;
  question: string;
  answer: string;
}
