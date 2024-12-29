import { Button, Grid2 as Grid, Link, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

function PageNotFound() {
    return (
        <Grid container flexDirection={'column'} height={'100dvh'} width={'100dvw'} alignItems={'center'} justifyContent={'center'} spacing={3}>
            <Typography variant="h1" fontWeight={700} color="error">
                404
            </Typography>
            <Typography variant="h3">
                Page not found!
            </Typography>
            <Typography variant="h3">
                😕
            </Typography>

            <Button size={'large'} variant={'contained'} sx={{ marginTop: 20 }}>
                <Link component={RouterLink} to='/dashboard' underline="none" color="white">
                    Return to dashboard
                </Link>
            </Button>
        </Grid>
    )
}

export default PageNotFound