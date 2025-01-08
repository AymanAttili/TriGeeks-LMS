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

            <Typography variant="h2">
                Quiz Session ended!
            </Typography>
            <Typography variant="h2">
                ⌛
            </Typography>
            <Typography variant="h6">
                All your answers have been saved, so 'Don't worry'.
            </Typography>

            <Button size={'large'} variant={'contained'} sx={{ marginTop: 20 }} onClick={handleEndQuiz}>
                Return to course
            </Button>

        </Grid>
    )
}

export default QuizSessionEnded