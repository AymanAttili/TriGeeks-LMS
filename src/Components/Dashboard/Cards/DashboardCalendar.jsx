import { Grid } from '@mui/material'
import React from 'react'
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

const DashboardCalendar = (props) => {
    return (
        <Grid {...props}>
            <DateCalendar sx={{ background: '#ffffff', borderRadius: 8, height: '320px', overflow: 'hidden', width: '100%', boxShadow: 3 }} />
        </Grid >
    )
}

export default DashboardCalendar