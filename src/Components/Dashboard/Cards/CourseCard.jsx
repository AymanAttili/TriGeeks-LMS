import { Box, FormHelperText, Grid, IconButton, LinearProgress, Rating, Stack, Typography } from '@mui/material'
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import beginnerSignal from '../../../icons/beginnerSignal.svg'
import mediumSignal from '../../../icons/mediumSignal.svg'
import professionalSignal from '../../../icons/professionalSignal.svg'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { useState } from 'react';

const CourseCard = ({ course }) => {
    const [courseSaved, setCourseSaved] = useState(course.saved)
    const [saveIcon, setSaveIcon] = useState(courseSaved == 1 ? <BookmarkIcon /> : <BookmarkBorderIcon />)
    const hours = ~~(course.time / 60);
    const mins = course.time % 60;
    const level = course.level == 'Beginner' ? beginnerSignal : course.level == 'Medium' ? mediumSignal : professionalSignal

    const handleSaveCourse = () => {
        if (courseSaved == 1) {
            setSaveIcon(<BookmarkBorderIcon />);
            setCourseSaved(0);
        }
        else {
            setSaveIcon(<BookmarkIcon />);
            setCourseSaved(1);
        }
    }
    return (
        <Grid container item flexDirection={'column'} justifyContent={'space-between'} sm={5.6} md={3.7} lg={2.8} xl={2.27} borderRadius={3} overflow={'clip'} gap={1} sx={{
            boxShadow: 3
        }}>
            <Grid container flexDirection={'column'}>
                <img src={course.image} alt="Course" width={'100%'} height={'150px'} />
                <Typography fontSize={12} alignSelf={'end'} paddingX={2} bgcolor={'success.main'} color={'white'} fontWeight={'700'} sx={{
                    borderTopLeftRadius: 25,
                    marginTop: -2.7
                }}>
                    {course.progress}% completed
                </Typography>
                <LinearProgress variant="determinate" value={course.progress} color='success' sx={{
                    width: '100%'
                }} />
            </Grid>
            <Typography variant='h5' textAlign={'center'} paddingX={2}>
                {course.name}
            </Typography>
            <Grid container gap={1} alignItems={'center'} flexDirection={'column'} justifyContent={'space-between'} padding={2}>
                <Grid container item justifyContent={'space-between'} alignItems={'center'}>
                    <Grid container item gap={0.5} xs={6}>
                        <AccessTimeIcon />
                        <Typography>
                            {hours > 9 ? hours : `0${hours}`}:{mins > 9 ? mins : `0${mins}`}
                        </Typography>
                    </Grid>
                    <Grid container item justifyContent={'end'} gap={0.5} xs={6}>
                        <img src={level} />
                        <Typography style={{
                            fontSize: '14px'
                        }}>
                            {course.level}
                        </Typography>
                    </Grid>
                </Grid>

                <Grid container item justifyContent={'space-between'}>
                    <Grid container item gap={0.5} xs={9}>
                        <Stack>
                            <Rating name="half-rating-read" defaultValue={course.rating} precision={0.5} readOnly sx={{
                                fontSize: 22
                            }} />
                        </Stack>
                        {course.rating}
                    </Grid>

                    ({course.ratingReviews})
                </Grid>

                <Grid container item justifyContent={'space-between'}>
                    <Grid container item alignItems={'center'} gap={0.5} xs={9} overflow={'visible'}>
                        <img src={course.lecturer.avatar} alt="lecturer avatar" height={24} width={24} style={{
                            borderRadius: 25
                        }} />
                        <Typography sx={{
                            fontSize: 13,
                            fontWeight: 700
                        }}>
                            {course.lecturer.name}
                        </Typography>
                    </Grid>
                    <IconButton aria-label="save" onClick={handleSaveCourse}>
                        {saveIcon}
                    </IconButton>
                </Grid>
            </Grid>

        </Grid>
    )
}

export default CourseCard