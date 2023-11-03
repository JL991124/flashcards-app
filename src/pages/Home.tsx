import {
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { experimentalStyled as styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Flashcard } from "../types/flashcard.types";
import generateFlashcard from "../api/generateFlashcard";

// const sampleFlashcards: Flashcard[] = [
//   {
//     id: "1",
//     topic: "Math",
//     cards: [
//       {
//         id: "1",
//         question: "What is 2 + 2?",
//         answer: "4",
//       },
//       {
//         id: "2",
//         question: "What is 5 * 7?",
//         answer: "35",
//       },
//     ],
//   },
//   {
//     id: "2",
//     topic: "Science",
//     cards: [
//       {
//         id: "1",
//         question: "What is the capital of France?",
//         answer: "Paris",
//       },
//       {
//         id: "2",
//         question: "What is the chemical symbol for water?",
//         answer: "H2O",
//       },
//     ],
//   },
//   // Add more Flashcards here
// ];

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body1,
  padding: theme.spacing(5),
  textAlign: "center",
  color: theme.palette.text.secondary,
  cursor: "pointer",
}));

function Home() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [topic, setTopic] = useState("");
  const [flashcards, setFlashcards] = useState<Flashcard[]>(() => {
    const savedFlashcards = localStorage.getItem("flashcards");
    return JSON.parse(savedFlashcards || "[]");
  });
  //const [flashcards, setFlashcards] = useState<Flashcard[]>(sampleFlashcards);

  useEffect(() => {
    localStorage.setItem("flashcards", JSON.stringify(flashcards));
  }, [flashcards]);

  const handleClickGenerate = () => {
    setLoading(true);
    generateFlashcard(topic)
      .then((qaCards) => {
        setFlashcards([
          ...flashcards,
          {
            id: flashcards.length + 1,
            topic: topic,
            cards: qaCards,
          },
        ]);

        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        console.log("ERROR");
      });
  };

  const handleClickFlashCard = (flashcard: Flashcard) => {
    navigate(`/flashcard/${flashcard.id}`, { state: { flashcard } });
  };

  return (
    <Container>
      <Grid container spacing={3} direction="column">
        <Grid item container direction="column" spacing={2}>
          <Grid item>
            <TextField
              fullWidth
              placeholder="Enter a topic to generate new flashcard"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              sx={{ background: "#ffffff" }}
            />
          </Grid>
          <Grid item container justifyContent="center">
            <Button variant="outlined" onClick={handleClickGenerate}>
              {loading ? "Generating ..." : "Generate New Flashcard"}
            </Button>
          </Grid>
        </Grid>
        <Grid item>
          <h2>Your Cards</h2>
        </Grid>
        <Grid item>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {flashcards.length > 0 ? (
              flashcards.map((flashcard) => (
                <Grid item xs={2} sm={4} md={4} key={flashcard.id}>
                  <Item onClick={() => handleClickFlashCard(flashcard)}>
                    {flashcard.topic}
                  </Item>
                </Grid>
              ))
            ) : (
              <Grid item>
                <Typography variant="body1">It's empty!</Typography>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Home;
