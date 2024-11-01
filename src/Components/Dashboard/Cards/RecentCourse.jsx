import { Button, Grid, Typography } from "@mui/material"
import { LinearProgressWithLabel } from "../LinearProgressWithLabel"
const RecentCourse = ({ course }) => {
    return (
        <Grid container alignItems={'center'} justifyContent={'space-between'} gap={1} p={2} sx={{
            borderTop: 2,
            borderColor: 'primary.border',
        }}>
            <Grid container xs={12} sm={6} spacing={2} sx={{
                textAlign: {
                    xs: 'center',
                    sm: 'unset'
                }
            }}>
                <Grid item xs={12} sm={3} md={2.5} lg={2} component='img' src={course.image} alt="Course's Image" sx={{
                    height: {
                        xs: 200,
                        sm: 50
                    }
                }} />
                <Grid component={Typography} item xs={12} sm={9} variant='h6'>
                    {course.name}
                </Grid>
            </Grid>

            <Grid container xs={12} sm={6} alignItems={'center'} gap={2} sx={{
                justifyContent: {
                    xs: 'center',
                    sm: 'flex-end'
                }
            }}>
                <Grid xs={12} sm={5} md={5.5} lg={7}>
                    <LinearProgressWithLabel value={course.progress} />
                </Grid>
                <Grid xs={12} sm={'auto'} item component={Button} variant='outlined' sx={{
                    outline: 2,
                    borderRadius: 10
                }}>
                    Continue
                </Grid>
            </Grid>
        </Grid>
    )
}

export default RecentCourse