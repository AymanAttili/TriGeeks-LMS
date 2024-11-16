import { Box, Divider, Grid2, Typography } from "@mui/material";
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
    <>
      <Typography
        variant="h3"
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

      <Box
        sx={{
          display: "flex",
          // flexDirection: "column",
          justifyContent: "center",
          padding: 3,
          margin: "0 auto",

          flexWrap: "wrap",
          maxWidth: "1900px",
          width: { xs: "auto", lg: "66rem", xl: "auto" },
        }}
      >
        <Grid2
          container
          gap={5}
          sx={{
            justifyContent: { xs: "center", lg: "space-between" },
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
        </Grid2>
      </Box>
    </>
  );
}

export default Courses;
