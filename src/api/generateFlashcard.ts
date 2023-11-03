import axios from "axios";

const generateFlashcard = async (topic: string) => {
  const apiKey = import.meta.env.VITE_API_KEY;
  const prompt = `Create 10 Q&A for the topic: ${topic}. Result should be in JSON format with a list of "question" tag and "answer" tag`;

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/engines/text-davinci-003-playground/completions",
      {
        prompt,
        max_tokens: 1000, // Adjust the length of each flashcard
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    console.log(response.data.choices[0].text);
    const result = response.data.choices[0].text;

    const startIndex = result.indexOf("[");
    const endIndex = result.lastIndexOf("]");

    if (startIndex !== -1 && endIndex !== -1) {
      // Extract the JSON content between the square brackets
      const jsonContent = result.slice(startIndex, endIndex + 1);

      try {
        const jsonData = JSON.parse(jsonContent);
        const qaCards = jsonData.map(
          (item: { question: string; answer: string }, index: number) => ({
            id: index,
            question: item.question,
            answer: item.answer,
          })
        );
        return qaCards;
      } catch (error) {
        console.error("Error parsing JSON:", error);
        return [];
      }
    } else {
      console.error("No valid JSON content found between square brackets.");
      return [];
    }
  } catch (error) {
    console.error("Error generating flashcards:", error);
    return [];
  }
};

export default generateFlashcard;
