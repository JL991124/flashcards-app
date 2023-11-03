import { useLocation } from "react-router-dom";
import { Grid, Typography } from "@mui/material";
import QuestionCards from "../components/QuestionCards";
import { Flashcard } from "../types/flashcard.types";

const FlashCardPage = () => {
  const location = useLocation();
  const flashcard: Flashcard = location.state ? location.state.flashcard : null;

  console.log("flashcard page - ", flashcard);
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      padding={3}
      spacing={3}
    >
      <Grid item container justifyContent="center">
        <Typography variant="h4">Topic: {flashcard.topic}</Typography>
      </Grid>
      <Grid item>
        <QuestionCards cards={flashcard.cards} />
      </Grid>
    </Grid>
  );
};

export default FlashCardPage;
