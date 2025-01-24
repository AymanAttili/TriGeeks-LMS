import { Button, Divider, Grid2 as Grid, IconButton, InputAdornment, Pagination, Paper, TextField, Typography } from "@mui/material";
import SquaredCourseCard from "../ui/SquaredCourseCard";
import { useDialogs } from "@toolpad/core";
import AddCourseDialog from "../features/courses/AddCourseDialog";
import { useCourses } from "../features/courses/useCourses";
import { useUser } from "../features/users/useUser";
import { roleNames } from "../Enums/roles";
import SpinnerLoader from "../ui/SpinnerLoader";
import { useState } from "react";
import { Search, X } from "@mui/icons-material";

function Courses() {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('')
  const payload = {
    filters: `name@=${query}`,
    page,
    pageSize: 12
  }
  const dialogs = useDialogs()
  const { user } = useUser();
  const { courses, metadata, isError, isLoading: fetchingCourses } = useCourses(payload);

  const openCoursesDialog = () => {
    dialogs.open(AddCourseDialog);
  }


  return (
    <Grid component={Paper} container flexDirection={'column'} padding={2} spacing={3} flex={1} justifyContent={'space-between'}>
      <Grid container flexDirection={'column'}>
        <Grid container justifyContent={'space-between'} alignItems={'center'}>
          <Typography variant="h4" color="primary.main">
            Courses
          </Typography>
          <Grid container alignItems={'center'}>
            <TextField
              margin={'none'}
              value={query}
              label="Search course"
              onChange={e => setQuery(e.target.value)}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <Search />
                    </InputAdornment>
                  ),
                }
              }}
            />
            {
              roleNames[user?.role] !== 'Staff' && <Button variant="contained" onClick={openCoursesDialog}>Add Course</Button>
            }
          </Grid>
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
      <Grid container justifyContent={'center'}>
        <Pagination count={metadata?.totalPages}
          disabled={fetchingCourses}
          page={page}
          onChange={(e, val) => setPage(val)}
          variant="outlined" color="primary" />
      </Grid>
    </Grid>
  );
}

export default Courses;
