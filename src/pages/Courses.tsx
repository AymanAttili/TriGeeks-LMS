import { Divider, Grid2 as Grid, Typography } from "@mui/material";
import SquaredCourseCard from "../ui/SquaredCourseCard";

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
  return (
    <Grid>
      <Typography
        variant="h4"
        color="primary.main"
        sx={{
          width: "100%",
          mt: "2rem",
          ml: "2rem",
          mb: "2rem",
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        Courses Veiw
        <Divider />
      </Typography>


      <Grid
        container
        padding={2}
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
