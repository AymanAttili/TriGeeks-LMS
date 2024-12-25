import React from "react";
import { Box, Button, Grid2 as Grid, LinearProgress, Paper, Typography } from "@mui/material";

import Category from "../../ui/course/Category";
import { Add } from "@mui/icons-material";
import { useDialogs } from "@toolpad/core";
import AddSectionDialog from "./AddSectionDialog";
import CertificateGenerator from "../certificates/CertificateTemplate";
import { display } from "html2canvas/dist/types/css/property-descriptors/display";
import { useCourse } from "./useCourse";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useUser } from "../users/useUser";
import { roleNames } from "../../Enums/roles";
import { useDispatchCourse } from "./useDispatchCourse";
import SpinnerLoader from "../../ui/SpinnerLoader";

interface Material {
  id: string;
  title: string;
  type: "link" | "file" | "quiz"; // Types of materials
}

interface Category {
  id: string;
  title: string;
  materials: Material[];
}

const Course: React.FC = () => {
  const { courseId } = useParams()
  const navigate = useNavigate();

  const { user } = useUser();
  const { course, isError, isLoading: fetchingCourse } = useCourse(courseId);
  const dialogs = useDialogs();


  const { courseDispatch, isLoading } = useDispatchCourse()

  const openAddSection = async () => {
    await dialogs.open(AddSectionDialog, { courseId });
  }

  const handleDelete = async () => {
    const ok = await dialogs.confirm('Are you sure you want to delete this Course?', {
      severity: "error",
      okText: 'Delete',
      title: 'Delete Material',
    }
    )

    if (ok) {
      await courseDispatch({ action: 'delete', payload: { courseId } }).then(() => navigate('/courses'))

    }
  }

  const handleEdit = async () => {

  }

  if (isError)
    return <Navigate replace to={'/courses'} />

  if (fetchingCourse)
    return <SpinnerLoader />

  return (
    <Grid component={Paper} container flexDirection={'column'} size={{ xs: 12 }} spacing={2} padding={2} flex={1}>
      <Grid container size={12} flexDirection={{ xs: 'column', sm: 'row' }} alignItems={'start'} justifyContent={'space-between'} spacing={2} paddingY={1} borderBottom={1} borderColor={'primary.main'}>
        <Grid container size={{ xs: 12, sm: 8, md: 7 }} flexDirection={'column'} spacing={1}>
          <Typography variant="h5" fontWeight={600}>
            {course?.name}
          </Typography>

          {roleNames[user?.role] === 'Staff' &&
            (
              <>
                <Grid container size={12} spacing={2} alignItems={'center'}>
                  <Grid component={LinearProgress} variant="determinate" value={course?.progress || 0} sx={{ height: 6, width: 250, maxWidth: 250, borderRadius: 6 }} />
                  <Typography>
                    {course?.progress}%
                  </Typography>
                </Grid>
                <Grid container size={12} spacing={2} alignItems={'center'} justifyContent={'space-between'}>
                  <Typography variant="h6">
                    Grade: {course?.grade || '--'}
                  </Typography>

                  {
                    course?.status === 'completed' &&

                    <CertificateGenerator sx={{ display: { sm: 'none' } }} userDetails={{
                      name: `${user.firstName} ${user.lastName}`,
                      course: course?.name,
                      date: new Date()
                    }} />
                  }
                </Grid>
              </>
            )
          }



        </Grid>
        {
          (roleNames[user?.role] === 'Staff' && course?.status === 'completed') ?
            <Grid sx={{ display: { xs: 'none', sm: 'flex' } }}>
              <CertificateGenerator userDetails={{
                name: `${user.firstName} ${user.lastName}`,
                course: course.name,
                date: new Date()
              }} />
            </Grid>
            :
            <Grid container>
              <Button color="error" size="small" variant='outlined' onClick={handleDelete}>
                Delete
              </Button>
              <Button color="primary" size="small" variant='contained' onClick={handleEdit}>
                Edit
              </Button>
            </Grid>
        }

      </Grid>

      <Grid container size={12} flexDirection={'column'} spacing={1} paddingY={2}>
        {
          roleNames[user?.role] !== 'Staff' &&
          <Grid container paddingBottom={1}>
            <Button
              onClick={openAddSection}
              variant="outlined"
              startIcon={<Add />}
              sx={{
                fontWeight: "bold",
              }}
            >
              Add new section
            </Button>
          </Grid>
        }
        {
          course?.sections?.sort((it1, it2) => it1.index - it2.index).map((section) => <Category key={section.id} section={section} courseId={course.id} />)
        }

      </Grid>
    </Grid>
  );
};

export default Course;