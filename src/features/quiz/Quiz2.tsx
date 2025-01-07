import React, { useState, useEffect } from "react";
import {
  Typography,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Box,
  Grid2,
} from "@mui/material";
import { Navigate, useLoaderData, useNavigate, useParams } from "react-router-dom";
import { useCurrentQuestion } from "../quizSession/useCurrentQuestion";
import { getQuizSession } from "../../services/apiQuizSession";
import SpinnerLoader from "../../ui/SpinnerLoader";
import QuizSessionEnded from "./QuizSessionEnded";
import { useDispatchQuiz } from "../quizSession/useDispatchQuiz";
import { useDialogs } from "@toolpad/core";

const Quiz: React.FC = () => {
  const { quizId, courseId } = useParams();
  const quizSession = useLoaderData();
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [questionId, setQuestionId] = useState(quizSession?.questions[questionIndex].id)
  const { quizDispatch, isLoading } = useDispatchQuiz()
  const { currentQuestion } = useCurrentQuestion({ quizId, questionId });
  const navigate = useNavigate();

  const dialogs = useDialogs()

  const [timeLeft, setTimeLeft] = useState(300); // todo bring time from API

  const handleSelectAnswer = (e) => {
    const val = e.target.value;
    setSelectedAnswer(val)
  }

  const handleSubmit = async () => {
    if (selectedAnswer)
      quizDispatch({ action: 'submitAnswer', payload: { quizId, questionId, answer: selectedAnswer } }).then(async () => {


        if (questionIndex < quizSession.questions.length - 1)
          setQuestionIndex(val => val + 1)
        else {
          const confirm = await dialogs.confirm('Are you sure you want to submit quiz?', {
            title: 'Submit Quiz',
            okText: 'Submit',
            cancelText: 'Cancel'
          })
          if (confirm)
            await quizDispatch({ action: 'finish', payload: { quizId } }).then(() => navigate(`/courses/${courseId}`, { replace: true }))
        }
      })
  };

  useEffect(() => {
    setQuestionId(quizSession?.questions[questionIndex].id)
  }, [questionIndex, setQuestionId, quizSession])

  if (!quizSession)
    return <QuizSessionEnded />

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        p: 2,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Grid2
        container
        spacing={2}
        direction="column"
        size={8}
        sx={{ boxShadow: 4, p: 5, borderRadius: 2 }}
      >
        <Grid2 container xs={12} justifyContent="flex-end">
          <Typography
            variant="body2"
            sx={{
              border: 1,
              borderColor: "primary.main",
              color: "primary.main",
              borderRadius: 1,
              p: 1,
              textAlign: "right",
              width: "fit-content",
            }}
          >
            Time left: {Math.floor(timeLeft / 60)}:
            {timeLeft % 60 < 10 ? `0${timeLeft % 60}` : timeLeft % 60}
          </Typography>
        </Grid2>
        <Grid2>
          <Typography variant="h5" gutterBottom>
            Question {+questionIndex + 1}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <div dangerouslySetInnerHTML={{ __html: currentQuestion?.text }} />
          </Typography>
          <FormControl component="fieldset" fullWidth>
            <FormLabel component="legend">Select one:</FormLabel>
            <RadioGroup
              aria-label="degree"
              name="radio-buttons-group"
              value={selectedAnswer}
              onChange={handleSelectAnswer}
            >
              {
                currentQuestion?.choices.map((choice) => <FormControlLabel value={choice.id} control={<Radio />} label={choice.text} />)
              }

            </RadioGroup>
          </FormControl>
        </Grid2>
        <Grid2 item xs={12} display="flex" justifyContent="flex-end">
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Next page
          </Button>
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default Quiz;

export async function loader({ params }) {
  const { quizId } = params;
  let quizSession;
  try {
    quizSession = (await getQuizSession(quizId)).data;
  }
  catch (err) {
    if (err.message.status === 409)
      quizSession = null
  }
  return quizSession;
}