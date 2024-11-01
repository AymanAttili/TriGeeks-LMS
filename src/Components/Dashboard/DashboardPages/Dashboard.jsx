
import { Button, Grid, Grid2, IconButton, Typography } from '@mui/material';
import RecentCourse from '../Cards/RecentCourse';
import { useState } from 'react';
import { recentCoursesData } from '../../../testData/recentCoursesData';
import DashboardCalendar from '../Cards/DashboardCalendar'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import SchoolIcon from '@mui/icons-material/School';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import TaskOutlinedIcon from '@mui/icons-material/TaskOutlined';

const Dashboard = () => {
    const [recentCourses, setRecentCourses] = useState(recentCoursesData)
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Grid container alignItems={'center'} justifyContent={'flex-start'} gap={2} color='primary.main' p={2} height={'100%'}>
                <Grid container alignItems={'flex-start'} justifyContent={'space-between'}>
                    <Grid container xs={12} sm={7} gap={1}>
                        <Grid container bgcolor={'white'} p={2} borderRadius={5} alignItems={'center'} sm={'5.5'} lg={'auto'} sx={{
                            boxShadow: 3
                        }}>
                            <Grid component={SchoolIcon} xs={3} sx={{
                                fontSize: '72px'

                            }} >
                            </Grid>
                            <Grid item container xs={9} sx={{
                                flexDirection: {
                                    sm: 'column'
                                },
                                gap: {
                                    xs: 1,
                                    sm: 0
                                },
                                alignItems: {
                                    xs: 'flex-end',
                                    sm: 'flex-start'
                                }
                            }}>
                                <Typography variant='h3'>
                                    5
                                </Typography>
                                <Typography fontWeight={'bold'} color={'primary.third'}>
                                    Courses TO DO
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container bgcolor={'white'} p={2} borderRadius={5} alignItems={'center'} sm={'5.5'} lg={'auto'} sx={{
                            boxShadow: 3
                        }}>
                            <Grid component={MilitaryTechIcon} xs={3} sx={{
                                fontSize: '72px'
                            }} >

                            </Grid>
                            <Grid item container xs={9} sx={{
                                flexDirection: {
                                    sm: 'column'
                                },
                                gap: {
                                    xs: 1,
                                    sm: 0
                                },
                                alignItems: {
                                    xs: 'flex-end',
                                    sm: 'flex-start'
                                }
                            }}>
                                <Typography variant='h3'>
                                    5
                                </Typography>
                                <Typography fontWeight={'bold'} color={'primary.third'}>
                                    Completed Courses
                                </Typography>
                            </Grid>
                        </Grid>

                        <Grid container item bgcolor={'white'} p={2} borderRadius={5} xs={12} lg={10} rowGap={1} sx={{
                            boxShadow: 3
                        }}>
                            <Grid item component={Typography} variant='h5' color='primary' xs={12}>
                                CERTIFICATES: {5}
                            </Grid>

                            <Grid item component={Typography} variant='h6' color='primary.third' xs={12}>
                                Your latest certificates
                            </Grid>

                            <Grid item container alignItems={'center'} justifyContent={'space-between'}>
                                <Button variant='contained' size={'small'}>
                                    View All
                                </Button>
                                <Grid item container xs={'auto'}>
                                    <IconButton size='large' color='primary'>
                                        <TaskOutlinedIcon fontSize='large' />
                                    </IconButton>
                                    <IconButton size='large' color='primary'>
                                        <TaskOutlinedIcon fontSize='large' />
                                    </IconButton>
                                    <IconButton size='large' color='primary'>
                                        <TaskOutlinedIcon fontSize='large' />
                                    </IconButton>
                                    <IconButton size='large' color='primary'>
                                        <TaskOutlinedIcon fontSize='large' />
                                    </IconButton>
                                    <IconButton size='large' color='primary'>
                                        <TaskOutlinedIcon fontSize='large' />
                                    </IconButton>


                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>

                    <DashboardCalendar p={1} item xs={12} sm={'5'} lg={'auto'} />
                </Grid>
                <Grid container bgcolor={'white'} p={2} borderRadius={5} sx={{
                    boxShadow: 3
                }}>
                    <Typography variant='h6' color='primary'>
                        RECENT COURSES:
                    </Typography>
                    <Grid2 container p={2}>
                        {
                            recentCourses.map((course) => <RecentCourse course={course} key={course.id} />)
                        }
                        <Button variant='contained' size={'small'}
                            sx={{
                                marginTop: 2
                            }}>
                            View All
                        </Button>
                    </Grid2>
                </Grid>
            </Grid >
        </LocalizationProvider>
    )
}

export default Dashboard