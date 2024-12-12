import { Card, Grid2 as Grid, Link, Typography, } from "@mui/material"
import { Link as RouterLink } from "react-router-dom"

function CoursesStatusCard({ title, filter, num }) {
    return (
        <Grid component={Card} size={{ lg: 4 }} variant="outlined" sx={{
            borderRadius: 1,
            borderWidth: 1.5,
            minWidth: '170px'
        }}>
            <Grid flexDirection={'column'} sx={{
                p: 2,
            }}>
                <Grid component={Typography} gutterBottom sx={{ fontWeight: 'bold', fontSize: 14, color: 'text.secondary' }}>
                    {title?.toUpperCase()}
                </Grid>
                <Grid component={Typography} sx={{ fontWeight: 'bold', fontSize: 32 }}>
                    {num}
                </Grid>
                <Link component={RouterLink} to={`/my-courses?filter=${filter}`} sx={{
                    textDecoration: 'none',
                    fontWeight: 600
                }}>
                    View All
                </Link>
            </Grid>

        </Grid>
    )
}

export default CoursesStatusCard