import { Button, Grid2 as Grid, Link, Paper, Typography } from "@mui/material";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import { checkStartedQuiz } from "../../services/apiQuizSession";
import { useDispatchQuiz } from "../quizSession/useDispatchQuiz";
import { getExamOverview } from "../../services/apiCourses";
function StartQuiz() {
    const data = useLoaderData();
    const { exam, started } = data;
    console.log(exam, started);


    const { courseId, quizId } = useParams();
    const { quizDispatch } = useDispatchQuiz()
    const navigate = useNavigate();

    const handleStartQuiz = async () => {
        await quizDispatch({ action: 'start', payload: { quizId } }).then(() => navigate('session', { replace: true }))
    }

    const handleResumeQuiz = async () => {
        navigate('session', { replace: true })
    }

    return (
        <Grid container flexDirection={'column'} flex={1} alignItems={'center'} justifyContent={'center'}>
            <Link component={RouterLink} to={`/courses/${courseId}`} position={'absolute'} left={10} top={75}>
                ⇐ Back to course
            </Link>
            <Grid container flexDirection={'column'} component={Paper} padding={2} size={{ xs: 12, sm: 10, md: 8, lg: 6 }} spacing={4}>
                <Typography variant="h4" textAlign={'center'} color="primary.main" fontWeight={600}>
                    {
                        started ? 'Resume last attempt' : ' Start Quiz'
                    }

                </Typography>
                <Grid container flexDirection={'column'} size={12} padding={2} spacing={2}>
                    {
                        started ?
                            <Typography fontSize={18}>
                                ● You have unfinished attempt for this quiz.
                            </Typography>
                            :
                            <>
                                <Typography fontSize={18}>
                                    ● You have
                                    <strong>
                                        {` ${exam.durationMinutes} `}
                                    </strong>
                                    minutes to finish the quiz.
                                </Typography>
                                <Typography fontSize={18}>
                                    ● The quiz consists of
                                    <strong>
                                        {` ${exam.questionsCount} `}
                                    </strong>
                                    questions.
                                </Typography>
                                <Typography fontSize={18}>
                                    ● You should earn <strong>
                                        {` ${exam.passThresholdPoints} `}
                                    </strong>
                                    points out of
                                    <strong>
                                        {` ${exam.maxGradePoints} `}
                                    </strong>
                                    to pass this quiz.
                                </Typography>
                                <Typography fontSize={16}>
                                    ● Once you click Start, the timer will start counting down.
                                </Typography></>
                    }
                </Grid>
                <Grid container justifyContent={'center'} marginTop={4}>
                    {
                        started ?
                            <Button variant="contained" size="large" onClick={handleResumeQuiz}>
                                Resume Quiz
                            </Button>
                            :
                            <Button variant="contained" size="large" onClick={handleStartQuiz}>
                                Start Quiz
                            </Button>
                    }

                </Grid>
            </Grid>
        </Grid>
    )
}

export default StartQuiz

export async function loader({ params }) {
    const { quizId } = params;
    const started = (await checkStartedQuiz(quizId)).data.isStarted;
    const exam = (await getExamOverview(quizId)).data;
    const data = {
        started,
        exam
    }
    return data;
}