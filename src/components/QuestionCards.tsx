import { useState } from "react";
import { Button, Card, CardContent, Grid } from "@mui/material";
import { CardT } from "../types/flashcard.types";

interface QuestionCardsProp {
  cards: CardT[];
}

const QuestionCards: React.FC<QuestionCardsProp> = ({ cards }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleCardFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setIsFlipped(false);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < cards.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setIsFlipped(false);
    }
  };

  const currentQuestion = cards[currentQuestionIndex];

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <Card
          style={{
            minHeight: 200,
          }}
        >
          <CardContent>
            {isFlipped ? currentQuestion.answer : currentQuestion.question}
          </CardContent>
        </Card>
      </Grid>
      <Grid item container direction="row" justifyContent="center">
        <Button
          onClick={handlePrevQuestion}
          disabled={currentQuestionIndex === 0}
          sx={{ marginRight: 2 }}
        >
          Previous
        </Button>
        <Button onClick={handleCardFlip} sx={{ marginRight: 2 }}>
          {isFlipped ? "Show Question" : "Show Answer"}
        </Button>
        <Button
          onClick={handleNextQuestion}
          disabled={currentQuestionIndex === cards.length - 1}
          sx={{ marginRight: 2 }}
        >
          Next
        </Button>
      </Grid>
    </Grid>
  );
};

export default QuestionCards;
