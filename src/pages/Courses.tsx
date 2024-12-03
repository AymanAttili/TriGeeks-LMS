import { Button, Divider, Grid2 as Grid, Typography } from "@mui/material";
import SquaredCourseCard from "../ui/SquaredCourseCard";
import { useDialogs } from "@toolpad/core";
import AddCourseDialog from "../ui/Dialogs/AddCourseDialog";

const courses = [
  {
    courseId: "1",
    courseName: "C++",
    department: "Computer Engineering",
    progress: 30,
  },
  {
    courseId: "2",
    courseName: "JavaScript",
    department: "Software Engineering",
    progress: 45,
  },
  {
    courseId: "3",
    courseName: "Python",
    department: "Data Science",
    progress: 60,
  },
  {
    courseId: "4",
    courseName: "Java",
    department: "Backend Development",
    progress: 80,
  },
  {
    courseId: "4",
    courseName: "Java",
    department: "Backend Development",
    progress: 80,
  },
  {
    courseId: "4",
    courseName: "Java",
    department: "Backend Development",
    progress: 80,
  },
  {
    courseId: "4",
    courseName: "Java",
    department: "Backend Development",
    progress: 80,
  },
  {
    courseId: "4",
    courseName: "Java",
    department: "Backend Development",
    progress: 80,
  },
  {
    courseId: "4",
    courseName: "Java",
    department: "Backend Development",
    progress: 80,
  },
  {
    courseId: "4",
    courseName: "Java",
    department: "Backend Development",
    progress: 80,
  },
];
function Courses() {
  const dialogs = useDialogs()

  const openCoursesDialog = () => {
    dialogs.open(AddCourseDialog);
  }
  return (
    <Grid container flexDirection={'column'} padding={2} spacing={3}>
      <Grid container justifyContent={'space-between'}>
        <Typography variant="h4" color="primary.main">
          Courses
        </Typography>
        <Button variant="contained" onClick={openCoursesDialog}>Add Course</Button>
      </Grid>

      <Divider />
      <Grid
        container
        spacing={3}
        sx={{
          justifyContent: { xs: "center", sm: "flex-start" },
        }}
      >
        {courses.map((course) => (
          <SquaredCourseCard
            key={course.courseId}
            courseId={course.courseId}
            courseName={course.courseName}
            department={course.department}
            progress={course.progress}
          />
        ))}
      </Grid>
    </Grid>
  );
}

export default Courses;
