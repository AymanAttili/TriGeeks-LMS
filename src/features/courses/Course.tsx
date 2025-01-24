import React, { useEffect, useState } from "react";
import { Button, ButtonGroup, Grid2 as Grid, LinearProgress, Link, Paper, Typography } from "@mui/material";

import { Link as RouterLink } from "react-router-dom";
import Category from "../../ui/course/Category";
import { Add } from "@mui/icons-material";
import { useDialogs } from "@toolpad/core";
import AddSectionDialog from "./AddSectionDialog";
import CertificateGenerator from "../certificates/CertificateTemplate";
import { useCourse } from "./useCourse";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useUser } from "../users/useUser";
import { roleNames } from "../../Enums/roles";
import { useDispatchCourse } from "./useDispatchCourse";
import SpinnerLoader from "../../ui/SpinnerLoader";
import AddCourseDialog from "./AddCourseDialog";
import AssignToCourseDialog from "./AssignToCourseDialog";
import { courseStatuses } from "../../Enums/courseStatuses";
import CourseParticipants from "./CourseParticipants";
import ChangeManagerDialog from "./ChangeManagerDialog";

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

const findGrade = (course) => {
  if (!course?.sections)
    return 0;

  const [maxPoints, mark] = course.sections?.map((sec) => {
    return sec.sectionParts
      .reduce(([sumTotal, sum], part) => {
        sumTotal += part.exam?.maxGradePoints || 0
        sum += part.exam?.lastGottenGradePoints || 0
        return [sumTotal, sum];
      }, [0, 0])
  })
    .reduce(([sumTotal, sum], [it1, it2]) => {
      sumTotal += it1;
      sum += it2;
      return [sumTotal, sum]
    }, [0, 0])

  if (maxPoints === 0)
    return 0;
  const grade = (mark / maxPoints) * 100
  return grade;
}

const passedQuizzes = (course) => {
  if (!course?.sections)
    return false;

  return course.sections?.map((sec) => {
    return sec.sectionParts
      .reduce((passed, part) => {
        if (part.exam) {

          if (!part.exam.lastGottenGradePoints)
            return false;

          return passed && part.exam.lastGottenGradePoints >= part.exam.passThresholdPoints
        }
        return passed;
      }, true)
  })
    .reduce((passed, it) => passed && it, true)
}


const Course: React.FC = () => {
  const [page, setPage] = useState(0)

  const { courseId } = useParams()
  const navigate = useNavigate();

  const { user } = useUser();
  const { course, isError, isLoading: fetchingCourse } = useCourse(courseId);
  const dialogs = useDialogs();

  const grade = findGrade(course)
  const passed = passedQuizzes(course);

  const { courseDispatch, isLoading } = useDispatchCourse()

  const openAddSection = async () => {
    await dialogs.open(AddSectionDialog, { courseId });
  }

  const openAssignModal = async () => {
    await dialogs.open(AssignToCourseDialog, { courseId });
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
    await dialogs.open(AddCourseDialog, { course })
  }

  const handleFinishCourse = async () => {
    await courseDispatch({ action: 'finishCourse', payload: { courseId } })
  }

  const openChangeManagerDialog = async () => {
    await dialogs.open(ChangeManagerDialog, { course });
  }

  useEffect(() => {
    const startCourse = async () => {
      await courseDispatch({ action: 'startCourse', payload: { courseId } })
    }
    if (roleNames[user?.role] === 'Staff' && courseStatuses[course?.status] === 'NotStarted')
      startCourse();

  }, [user, courseDispatch, courseId, course])

  if (isError)
    return <Navigate to='/404' />

  if (fetchingCourse)
    return <SpinnerLoader />

  return (
    <Grid component={Paper} container flexDirection={'column'} size={{ xs: 12 }} spacing={2} padding={2} flex={1}>
      <Grid container alignItems={'center'} flexDirection={{ xs: 'column', sm: 'row' }} justifyContent={'space-between'}>
        <Link component={RouterLink} to="/courses" alignSelf={{ xs: 'start', sm: 'unset' }}>
          ⇐ Back to courses
        </Link>
        {
          roleNames[user.role] !== 'Staff' &&
          <ButtonGroup>
            <Button disabled={page === 0} onClick={() => setPage(0)}>
              Home
            </Button>
            <Button disabled={page === 1} onClick={() => setPage(1)}>
              participants
            </Button>
          </ButtonGroup>
        }

        {
          roleNames[user.role] === 'Admin' ?
            <Button size={'small'} variant={'contained'} onClick={openChangeManagerDialog}>
              Change manager
            </Button>
            :
            <Link component={RouterLink} to="/courses" display={{ xs: 'none', sm: 'block' }} sx={{ visibility: 'hidden' }}>
              ⇐ Back to courses
            </Link>
        }

      </Grid>
      <Grid container size={12} flexDirection={{ xs: 'column', sm: 'row' }} alignItems={'start'} justifyContent={'space-between'} spacing={2} paddingY={1} borderBottom={1} borderColor={'primary.main'}>
        <Grid container size={{ xs: 12, sm: 8, md: 7 }} flexDirection={'column'} spacing={1}>
          <Typography variant="h5" fontWeight={600}>
            {course?.name}
          </Typography>

          {roleNames[user?.role] === 'Staff' &&
            (
              <>
                <Grid container size={12} spacing={2} alignItems={'center'}>
                  <Grid component={LinearProgress} variant="determinate" value={Math.floor(course?.progress * 100)} sx={{ height: 6, width: 250, maxWidth: 250, borderRadius: 6 }} />
                  <Typography>
                    {Math.floor(course?.progress * 100)}%
                  </Typography>
                </Grid>
                <Grid container size={12} spacing={2} alignItems={'center'} justifyContent={'space-between'}>
                  <Typography variant="h6" color={passed ? 'success' : 'error'}>
                    Grade: {Math.floor(grade)}%
                  </Typography>

                  {
                    courseStatuses[course?.status] === 'Finished' &&

                    <CertificateGenerator sx={{ display: { sm: 'none' } }} userDetails={{
                      name: `${user.firstName} ${user.lastName}`,
                      course: course?.name,
                      date: course.finishedAtUtc
                    }} />
                  }
                  {
                    (roleNames[user?.role] === 'Staff' && course?.progress === 1 && courseStatuses[course?.status] !== 'Finished') &&
                    <Grid sx={{ display: { sm: 'none' } }}>
                      <Button variant="contained" onClick={handleFinishCourse}>
                        Finish Course
                      </Button>
                    </Grid>
                  }
                </Grid>
              </>
            )
          }



        </Grid>
        {
          (roleNames[user?.role] === 'Staff' && courseStatuses[course?.status] === 'Finished') &&
          <Grid sx={{ display: { xs: 'none', sm: 'flex' } }}>
            <CertificateGenerator userDetails={{
              name: `${user.firstName} ${user.lastName}`,
              course: course.name,
              date: course.finishedAtUtc
            }} />
          </Grid>
        }
        {
          (roleNames[user?.role] === 'Staff' && course?.progress === 1 && courseStatuses[course?.status] !== 'Finished') &&
          <Grid sx={{ display: { xs: 'none', sm: 'flex' } }}>
            <Button variant="contained" onClick={handleFinishCourse}>
              Finish Course
            </Button>
          </Grid>
        }
        {
          roleNames[user?.role] !== 'Staff' &&
          <Grid container>
            <Button color="error" size="small" variant='outlined' onClick={handleDelete}>
              Delete
            </Button>
            <Button color="primary" size="small" variant='outlined' onClick={handleEdit}>
              Edit
            </Button>
            <Button color="primary" size="small" variant='contained' onClick={openAssignModal}>
              Assign to
            </Button>
          </Grid>
        }

      </Grid>
      {
        (page === 0 || roleNames[user.role] === 'Staff') &&
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
      }
      {
        (page === 1 && roleNames[user.role] !== 'Staff') &&
        <CourseParticipants />
      }

    </Grid>
  );
};

export default Course;