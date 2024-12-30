import { Button, Divider, Grid2 as Grid, Paper, Typography } from "@mui/material";
import SquaredCourseCard from "../ui/SquaredCourseCard";
import { useDialogs } from "@toolpad/core";
import AddCourseDialog from "../features/courses/AddCourseDialog";
import { useCourses } from "../features/courses/useCourses";
import { useUser } from "../features/users/useUser";
import { roleNames } from "../Enums/roles";
import SpinnerLoader from "../ui/SpinnerLoader";

function Courses() {
  const dialogs = useDialogs()
  const { user } = useUser();
  const { courses, isError, isLoading: fetchingCourses } = useCourses();

  const openCoursesDialog = () => {
    dialogs.open(AddCourseDialog);
  }


  return (
    <Grid component={Paper} container flexDirection={'column'} padding={2} spacing={3} flex={1}>
      <Grid container justifyContent={'space-between'}>
        <Typography variant="h4" color="primary.main">
          Courses
        </Typography>
        {
          roleNames[user?.role] !== 'Staff' && <Button variant="contained" onClick={openCoursesDialog}>Add Course</Button>
        }
      </Grid>

      <Divider />
      {
        fetchingCourses ? <SpinnerLoader />
          :
          <Grid
            container
            spacing={3}
            sx={{
              justifyContent: { xs: "center", sm: "flex-start" },
            }}
          >
            {courses?.map((course) => (
              <SquaredCourseCard
                key={course.id}
                courseId={course.id}
                courseName={course.name}
                progress={course.progress}
                createdBy={{
                  id: course.createdBy,
                  name: course.createdByName
                }}
              />
            ))}

            {
              courses?.length === 0 && <Typography variant="h6">
                No courses yet!🤌
              </Typography>
            }
          </Grid>
      }

    </Grid>
  );
}

export default Courses;
