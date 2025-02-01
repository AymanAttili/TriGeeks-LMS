import React, { useState, useEffect } from "react";
import dayjs from 'dayjs'
import {
    Typography,
    Button,
    Radio,
    RadioGroup,
    FormControlLabel,
    Grid2,
    Paper,
    FormControl,
    FormLabel,
} from "@mui/material";
import { useParams } from "react-router-dom";
import QuizNavigation from "./QuizNavigation";
import QuizSessionEnded from "./QuizSessionEnded";
import { useDialogs } from "@toolpad/core";
import { useCurrentQuestion } from "../quizSession/useCurrentQuestion";
import { useDispatchQuiz } from "../quizSession/useDispatchQuiz";
import SpinnerLoader from "../../ui/SpinnerLoader";
import { useQuizSession } from "../quizSession/useQuizSession";


const Quiz: React.FC = () => {
    const { quizId, courseId } = useParams();
    const { quizSession, isLoading: fetchingSession } = useQuizSession(quizId);
    const [questionIndex, setQuestionIndex] = useState(0);
    const [questionId, setQuestionId] = useState(0)
    const { quizDispatch, isLoading } = useDispatchQuiz()
    const { currentQuestion, isLoading: fetchingQuestion } = useCurrentQuestion({ quizId, questionId });
    const [selectedAnswer, setSelectedAnswer] = useState(0)

    const dialogs = useDialogs()

    const [timeLeft, setTimeLeft] = useState(300); // todo bring time from API

    const handleSelectAnswer = (e) => {
        const val = e.target.value;
        setSelectedAnswer(val)
    }

    const handleSelectQuestion = async (index) => {
        await handleSubmitAnswer()

        setQuestionIndex(index)
        setSelectedAnswer(0)

    }

    const handleSubmitAnswer = async () => {
        if (selectedAnswer !== 0)
            await quizDispatch({ action: 'submitAnswer', payload: { quizId, questionId, answer: selectedAnswer } })
    };

    const handleFinishQuiz = async () => {
        const confirm = await dialogs.confirm('Are you sure you want to submit and finish quiz?', {
            title: 'Submit Quiz',
            okText: 'Submit',
            cancelText: 'Cancel'
        })
        if (confirm) {
            await handleSubmitAnswer();
            await quizDispatch({ action: 'finish', payload: { quizId } })
        }
    }

    const handleNext = async () => {
        await handleSubmitAnswer()

        if (questionIndex < quizSession?.questions.length - 1)
            setQuestionIndex(val => +val + 1)

    }

    const handlePrevious = async () => {
        await handleSubmitAnswer()
        setQuestionIndex(val => val - 1)
    }

    useEffect(() => {
        setQuestionId(quizSession?.questions[questionIndex].id)
        const startTime = dayjs(quizSession?.startDateUtc);

        let endTime = startTime.add(quizSession?.durationMinutes, 'minute');
        endTime = endTime.add(2, 'hour');

        const currentTime = dayjs();

        const remainingSeconds = Math.max(endTime.diff(currentTime, 'second'), 0);

        setTimeLeft(remainingSeconds);
    }, [questionIndex, setQuestionId, quizSession])

    useEffect(() => {
        setSelectedAnswer(currentQuestion?.chosenAnswer || 0)

    }, [currentQuestion])

    useEffect(() => {
        const timer =
            timeLeft > 0 && setInterval(() => setTimeLeft(timeLeft - 1), 1000);
        if (timeLeft === 1 && selectedAnswer)
            handleSubmitAnswer()
        return () => clearInterval(timer as ReturnType<typeof setInterval>);
    }, [timeLeft]);


    if ((!fetchingSession && quizSession === undefined) || timeLeft === 0)
        return <QuizSessionEnded />

    return (

        <Grid2 container flexDirection={{ xs: 'column', sm: 'row' }} width={"100%"} height={"100%"} padding={1} spacing={{ xs: 1, sm: 0 }}>
            <Grid2
                container
                component={Paper}
                alignItems={"center"}
                flexDirection={"column"}
                spacing={4}
                size={{ xs: 12, sm: 3.5, md: 3, lg: 2.5 }}
                padding={2}
            >
                <Typography
                    variant="h5"
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
                <QuizNavigation handleSubmit={handleFinishQuiz} questions={quizSession?.questions} handleSelectQuestion={handleSelectQuestion} questionIndex={questionIndex} />

            </Grid2>
            <Grid2 container flexDirection={{ xs: 'column-reverse', sm: 'row' }} flex={1} size={{ xs: 12, sm: 8.5, md: 9, lg: 9.5 }} justifyContent={'center'}>
                {
                    fetchingQuestion ? <SpinnerLoader /> :
                        <>
                            <Grid2
                                flexDirection={"column"}
                                alignItems={"center"}
                                flex={1}
                                size={12}
                                paddingLeft={{ sm: 2 }}
                            >
                                <Grid2 container flexDirection={'column'} justifyContent={'space-between'} height={'100%'} >
                                    <Grid2 container size={12} flexDirection={'column'} component={Paper} padding={2} spacing={4}>
                                        <Typography fontSize={22} width={'100%'}>
                                            <div
                                                dangerouslySetInnerHTML={{ __html: currentQuestion?.text }}
                                                style={{
                                                    wordWrap: 'normal', // Ensures long words wrap
                                                    maxWidth: '100%'
                                                }}
                                            />
                                        </Typography>
                                        <Grid2 container justifyContent={'center'}>

                                            <img src={currentQuestion.image?.path} />
                                        </Grid2>
                                        <FormControl component="fieldset" fullWidth>
                                            <FormLabel component="legend">Select one:</FormLabel>
                                            <RadioGroup
                                                sx={{ ml: 3 }}
                                                value={selectedAnswer}
                                                onChange={handleSelectAnswer}
                                            >
                                                {
                                                    currentQuestion?.choices?.map((choice) => <FormControlLabel key={choice.id} value={choice.id} control={<Radio />} label={choice.text}
                                                    />)
                                                }

                                            </RadioGroup>
                                        </FormControl>

                                        <Grid2 container size={12} flexDirection={{ xs: 'column', sm: 'row' }} justifyContent={'space-between'} paddingTop={8}>
                                            <Button color="error" disabled={selectedAnswer === 0} onClick={() => setSelectedAnswer(0)}>
                                                Clear answer
                                            </Button>
                                            <Grid2
                                                container
                                                spacing={3}
                                                justifyContent={"center"}
                                                style={{ marginTop: 10 }}
                                            >
                                                <Button
                                                    variant="outlined"
                                                    onClick={handlePrevious}
                                                    sx={{
                                                        minWidth: 40,
                                                        rotate: '180deg'
                                                    }}
                                                    disabled={questionIndex === 0}
                                                >
                                                    ▶
                                                </Button>

                                                <Button
                                                    variant="outlined"
                                                    onClick={handleNext}
                                                    sx={{
                                                        minWidth: 40
                                                    }}
                                                    disabled={questionIndex === quizSession?.questions?.length - 1}
                                                >
                                                    ▶
                                                </Button>
                                            </Grid2>
                                            {
                                                questionIndex === quizSession?.questions?.length - 1 ?
                                                    <Button variant="contained" onClick={handleFinishQuiz} disabled={selectedAnswer === 0}>
                                                        Finish quiz
                                                    </Button>
                                                    :
                                                    <Button variant="outlined" onClick={handleNext} disabled={selectedAnswer === 0}>
                                                        Submit answer
                                                    </Button>
                                            }

                                        </Grid2>
                                    </Grid2>
                                </Grid2>
                            </Grid2>
                            <Grid2 container flexDirection={'column'} size={{ xs: 12, sm: 4, md: 3, lg: 2.5 }} paddingLeft={{ sm: 2 }}
                            >
                                <Grid2 container flexDirection={'column'} component={Paper} padding={2} alignItems={'center'} spacing={2}>
                                    <Typography variant="h6">
                                        Question {+questionIndex + 1}
                                    </Typography>
                                    <Typography color={currentQuestion?.chosenAnswer === null ? 'error' : 'success'}>
                                        {
                                            currentQuestion?.chosenAnswer === null ? 'Not answered yet.' : 'Answered'
                                        }
                                    </Typography>
                                    <Typography>
                                        Marked out of {currentQuestion?.points}
                                    </Typography>
                                </Grid2>
                            </Grid2>
                        </>
                }
            </Grid2>
        </Grid2 >
    );
};

export default Quiz;
