import { OpenAI } from "openai";
import { v4 as uuidv4 } from "uuid";
import { FlashcardT, CardT } from "../types/flashcard.types";

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export async function addFlashcards(topic: string): Promise<FlashcardT> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant that generates flashcards.",
        },
        {
          role: "user",
          content: `Please generate a list of flashcards with questions and answers based on the topic: ${topic}.`,
        },
      ],
    });

    if (!response.choices[0].message.content) {
      throw new Error("Invalid response from OpenAI");
    }

    const output = response.choices[0].message.content.trim();
    console.log(output);
    console.log("------------------");
    const lines = output.split("\n");
    console.log(lines);
    console.log("------------------");
    const cards: CardT[] = [];
    let currentCard: Partial<CardT> = {};

    for (const line of lines) {
      if (line.match(/^\d*\.?\s*(Question:|Q:|Front:)/)) {
        currentCard.id = uuidv4();
        currentCard.question = line
          .replace(/^\d*\.?\s*(Question:|Q:|Front:)\s*/, "")
          .trim();
      } else if (line.match(/^\d*\.?\s*(Answer:|A:|Back:)/)) {
        currentCard.answer = line
          .replace(/^\d*\.?\s*(Answer:|A:|Back:)\s*/, "")
          .trim();
      }

      if (currentCard.question && currentCard.answer) {
        cards.push(currentCard as CardT);
        currentCard = {};
      }
    }

    const flashcardSet: FlashcardT = {
      id: uuidv4(),
      topic,
      cards,
    };
    console.log(flashcardSet);

    return flashcardSet;
  } catch (error) {
    console.error("Error fetching data from OpenAI:", error);
    throw error;
  }
}
