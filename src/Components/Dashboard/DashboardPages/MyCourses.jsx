import { Grid } from '@mui/material'
import CourseCard from '../Cards/CourseCard'
import { myCoursesData } from '../../../testData/myCoursesData'

const MyCourses = () => {
    console.log(myCoursesData)
    return (
        <Grid container gap={2} p={2} flexWrap={'wrap'} color={'primary.main'}>
            {
                myCoursesData.map((course) => <CourseCard course={course} />)
            }

        </Grid>
    )
}

export default MyCourses