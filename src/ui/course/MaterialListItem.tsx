import React, { useState } from "react";
import { Button, Chip, FormHelperText, Grid2 as Grid, IconButton, Link, ListItem, ListItemIcon, ListItemText, Tooltip } from "@mui/material";
import LinkIcon from "@mui/icons-material/Link";
import MarkDone from "./MarkDone";
import { Delete, Edit, ExpandLess, ExpandMore, Quiz } from "@mui/icons-material";
import { useUser } from "../../features/users/useUser";
import { roleNames } from "../../Enums/roles";
import { Link as RouterLink, useParams } from "react-router-dom";
import { useDialogs } from "@toolpad/core";
import { useDispatchCourse } from "../../features/courses/useDispatchCourse";
import AddMaterialDialog from "../../features/courses/AddMaterialDialog";
import CreateQuizDialog from "../../features/quiz/CreateQuizDialog";
import { useDispatchQuestions } from "../../features/quiz/useDispatchQuestions";
import FileIcon from "./FileIcon";
import { useCourse } from "../../features/courses/useCourse";
import { courseStatuses } from "../../Enums/courseStatuses";
export interface MaterialListItemProps {
  sectionPart: {
    id: number,
    sectionId: number,
    title: string,
    index: number,
    materialType: number,
    file?: {
      id: string,
      name: string,
      contentType: string,
      extension: string,
      path: string
    },
    link?: string,
    exam: {
      durationMinutes?: number
      passThresholdPoints?: number,
      questions?: [],
    }
    status: 1 | 2 | 3
  }
}

const MaterialListItem: React.FC<MaterialListItemProps> = ({ sectionPart }) => {
  const { user } = useUser();
  const { courseId } = useParams();
  const { course } = useCourse(courseId);
  const { courseDispatch, isLoading } = useDispatchCourse();
  const [expanded, setExpanded] = useState(false);

  const { questionsDispatch } = useDispatchQuestions();

  const dialogs = useDialogs();

  const handleEdit = async () => {
    if (sectionPart.exam) {
      await questionsDispatch({ action: 'clear' })
      await questionsDispatch({ action: 'add', payload: { data: sectionPart.exam.questions } })
      await dialogs.open(CreateQuizDialog, { sectionPart, data: sectionPart.exam });
    }

    else
      await dialogs.open(AddMaterialDialog, { sectionPart });
  };


  const handleDelete = async () => {
    const ok = await dialogs.confirm('Are you sure you want to delete this material?', {
      severity: "error",
      okText: 'Delete',
      title: 'Delete Material',
    }
    )

    if (ok) {
      await courseDispatch({ action: 'deleteSectionPart', payload: { sectionPartId: sectionPart.id, sectionId: sectionPart.sectionId } })
    }
  }

  const handleViewMaterial = async () => {
    if (sectionPart.status === 1)
      await courseDispatch({ action: 'changeSectionPartStatus', payload: { sectionId: sectionPart.sectionId, sectionPartId: sectionPart.id, status: 2 } })
  }

  const handleExpand = async () => {
    setExpanded(val => !val)
    await handleViewMaterial();
  }
  return (

    <Grid component={ListItem}
      flexDirection={'column'}
      paddingX={0}
      paddingY={2}
      borderBottom={3}
      borderColor={'primary.light'}

    >
      <Grid container size={12} flexDirection={{ xs: 'column', sm: 'row' }} gap={2} sx={{
        alignItems: { xs: 'start', sm: "center" },
        justifyContent: "space-between",
      }}>
        <Grid container alignItems={'center'} >
          <ListItemIcon
            sx={{
              minWidth: "fit-content",
              mr: 1,
              padding: 0.2,
            }}
          >
            {sectionPart.materialType === 2 && <LinkIcon fontSize="large" sx={{ bgcolor: 'primary.main', padding: 0.5, color: 'white', borderRadius: 1 }} />}
            {sectionPart.materialType === 1 && <FileIcon type={sectionPart.file?.contentType} />}
            {sectionPart.materialType === 3 && <Quiz fontSize="large" />}
          </ListItemIcon>
          {
            sectionPart.materialType === 3 ?
              <ListItemText primary={sectionPart.title} />
              :
              <Link component={RouterLink} onClick={handleViewMaterial} to={sectionPart.file?.path || sectionPart.link || ' '} target="_blank" >
                <ListItemText primary={sectionPart.title} />
              </Link>
          }

        </Grid>
        {
          (roleNames[user?.role] === 'Staff' && sectionPart.materialType !== 3) &&
          <Grid container spacing={1}>
            {
              ['audio', 'video', 'image'].includes(sectionPart.file?.contentType.split('/')[0]) &&
              <IconButton onClick={handleExpand}>
                {
                  expanded ? <ExpandLess /> : <ExpandMore />
                }

              </IconButton>
            }
            {
              courseStatuses[course?.status] !== 'Finished' &&
              <MarkDone status={sectionPart.status} sectionId={sectionPart.sectionId} sectionPartId={sectionPart.id} />
            }
          </Grid>
        }
        {
          (roleNames[user?.role] === 'Staff' && sectionPart.materialType === 3) &&
          <Grid container spacing={2} alignItems={'center'}>
            {
              sectionPart.exam?.status !== 3 &&
              <>
                <FormHelperText>
                  Your latest grade: {` ${sectionPart.exam?.lastGottenGradePoints} `} / {` ${sectionPart.exam?.maxGradePoints}`}
                </FormHelperText>

                {
                  sectionPart.exam?.lastGottenGradePoints >= sectionPart.exam?.passThresholdPoints ?
                    <Chip label='Passed' color="success" size="small" />
                    :
                    <Chip label='Failed' color="error" size='small' />

                }

              </>
            }
            {
              courseStatuses[course?.status] !== 'Finished' &&
              <Link component={RouterLink} to={`quiz/${sectionPart.exam?.id}`} target="_blank" underline="none">
                <Button variant="outlined"
                  size={'small'}
                  sx={{
                    borderRadius: 5,
                    border: 2
                  }}
                >
                  {
                    sectionPart.exam?.status === 3 ? "Start " : "Retake "
                  }
                  Quiz
                </Button>
              </Link>
            }

          </Grid>

        }
        {
          roleNames[user?.role] !== 'Staff' &&
          <Grid container spacing={1}>
            <Tooltip title={'Edit'}>
              <IconButton size="small" onClick={handleEdit} disabled={isLoading} >
                <Edit />
              </IconButton>
            </Tooltip>
            <Tooltip title={'Delete'}>
              <IconButton size="small" color="error" onClick={handleDelete} disabled={isLoading} >
                <Delete />
              </IconButton>
            </Tooltip>
          </Grid>
        }
      </Grid>
      {
        expanded &&
        <>
          {
            sectionPart.file?.contentType.split('/')[0] === 'video' &&
            <Grid container size={12} justifyContent={'center'} alignItems={'center'} paddingY={4}>
              <video height="300" controls>
                <source src={sectionPart.file.path} type={sectionPart.file.contentType} />
              </video>
            </Grid>
          }
          {
            sectionPart.file?.contentType.split('/')[0] === 'audio' &&
            <Grid container size={12} justifyContent={'center'} alignItems={'center'} paddingY={4}>
              <audio controls>
                <source src={sectionPart.file.path} type={sectionPart.file.contentType} />
              </audio>
            </Grid>
          }
          {
            sectionPart.file?.contentType.split('/')[0] === 'image' &&
            <Grid container size={12} justifyContent={'center'} alignItems={'center'} paddingY={4}>
              <img height={300} src={sectionPart.file.path} type={sectionPart.file.contentType} />
            </Grid>
          }
        </>
      }
    </Grid>
  );
};
export default MaterialListItem;
