import { CircularProgress, Grid2 as Grid } from '@mui/material';
function SpinnerLoader() {
    return (
        <Grid container alignItems={'center'} justifyContent={'center'} sx={{ height: '100dvh' }}>
            <CircularProgress size={64} />
        </Grid >
    )
}

export default SpinnerLoader