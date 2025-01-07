import { Button, Grid2 as Grid, Link, Typography } from "@mui/material";
import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";
import { checkStartedQuiz } from "../../services/apiQuizSession";
function QuizSessionEnded() {
    const { courseId, quizId } = useParams();
    const navigate = useNavigate();

    const handleEndQuiz = () => {
        checkStartedQuiz(quizId)
        navigate(`/courses/${courseId}`, { replace: true })
    }
    return (
        <Grid container flexDirection={'column'} size={12} flex={1} alignItems={'center'} justifyContent={'center'} spacing={3}>
            <Typography variant="h1" fontWeight={700} color="error">
                409
            </Typography>
            <Typography variant="h3">
                Quiz Session ended!
            </Typography>
            <Typography variant="h2">
                ⌛
            </Typography>

            <Button size={'large'} variant={'contained'} sx={{ marginTop: 20 }} onClick={handleEndQuiz}>
                Return to course
            </Button>

        </Grid>
    )
}

export default QuizSessionEnded