import { Card, Grid2 as Grid, Link, Typography, } from "@mui/material"
import { Link as RouterLink } from "react-router-dom"

function AnalysisCard({ title, filter = null, num, icon }) {
    return (
        <Grid component={Card} size={{ xs: 12, sm: 6 }} variant="outlined" sx={{
            borderRadius: 1,
            borderWidth: 1.5,
            minWidth: '170px'
        }}>
            <Grid flexDirection={'column'} sx={{
                p: 2,
            }}>
                <Grid container alignItems={'center'} paddingY={1} spacing={1}>
                    {icon}
                    <Typography sx={{ fontWeight: 'bold', fontSize: 18, color: 'text.secondary' }}>
                        {title?.toUpperCase()}
                    </Typography>
                </Grid>
                <Grid component={Typography} sx={{ fontWeight: 'bold', fontSize: 32 }}>
                    {num}
                </Grid>
                {filter &&
                    <Link component={RouterLink} to={`/${filter}`} sx={{
                        textDecoration: 'none',
                        fontWeight: 600
                    }}>
                        View All
                    </Link>
                }
            </Grid>

        </Grid>
    )
}

export default AnalysisCard