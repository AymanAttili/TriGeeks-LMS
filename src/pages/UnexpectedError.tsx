import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Grid2 as Grid } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { Link } from '@mui/material';

const UnexpectedError = ({
    error = {},
    resetErrorBoundary,
}) => {
    return (
        <Grid container flexDirection={'column'} height={'100dvh'} width={'100dvw'} alignItems={'center'} justifyContent={'center'} spacing={3}>
            <Typography variant="h1" fontWeight={700} color="error">
                500
            </Typography>
            <Typography variant="h3">
                Unexpected Error
            </Typography>
            <Typography variant="h3">
                😵‍💫
            </Typography>

            <Button size={'large'} variant={'contained'} sx={{ marginTop: 20 }} onClick={resetErrorBoundary}>
                Reset
            </Button>
        </Grid>
    );
};

export default UnexpectedError;