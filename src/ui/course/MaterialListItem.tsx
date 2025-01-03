import React from "react";
import { Button, Grid2 as Grid, IconButton, Link, ListItem, ListItemIcon, ListItemText, Tooltip } from "@mui/material";
import LinkIcon from "@mui/icons-material/Link";
import MarkDone from "./MarkDone";
import DescriptionIcon from "@mui/icons-material/Description";
import { Delete, Edit, Quiz } from "@mui/icons-material";
import { useUser } from "../../features/users/useUser";
import { roleNames } from "../../Enums/roles";
import { Link as RouterLink } from "react-router-dom";
import { useDialogs } from "@toolpad/core";
import { useDispatchCourse } from "../../features/courses/useDispatchCourse";
import AddMaterialDialog from "../../features/courses/AddMaterialDialog";
import CreateQuizDialog from "../../features/quiz/CreateQuizDialog";
import { useDispatchQuestions } from "../../features/quiz/useDispatchQuestions";
interface MaterialListItemProps {
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
    isDone: boolean
  }
}

const MaterialListItem: React.FC<MaterialListItemProps> = ({ sectionPart }) => {
  const { user } = useUser();
  const { courseDispatch, isLoading } = useDispatchCourse();

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
  return (
    <Grid component={ListItem}
      flexDirection={{ xs: 'column', sm: 'row' }}
      gap={2}
      paddingX={0}
      paddingY={2}
      borderBottom={3}
      borderColor={'primary.light'}
      sx={{
        alignItems: { xs: 'start', sm: "center" },
        justifyContent: "space-between",
      }}
    >
      <Grid container alignItems={'center'} >
        <ListItemIcon
          sx={{
            backgroundColor: `${sectionPart.materialType === 2 ? "#027e7b" : ""}`,
            minWidth: "fit-content",
            mr: 1,
            borderRadius: 1,
            padding: 0.2,
          }}
        >
          {sectionPart.materialType === 2 && <LinkIcon sx={{ color: "#ffffff" }} />}
          {sectionPart.materialType === 1 && <DescriptionIcon sx={{ color: "#FFA726" }} />}
          {sectionPart.materialType === 3 && <Quiz />}
        </ListItemIcon>
        <Link component={RouterLink} to={sectionPart.file?.path || sectionPart.link || (sectionPart.exam ? `quiz/${sectionPart.exam.id}` : false) || ' '} target="_blank" >
          <ListItemText primary={sectionPart.title} />
        </Link>
      </Grid>
      {
        (roleNames[user?.role] === 'Staff' && sectionPart.materialType !== 3) &&
        <MarkDone done={sectionPart.isDone} sectionId={sectionPart.sectionId} sectionPartId={sectionPart.id} />
      }
      {
        (roleNames[user?.role] === 'Staff' && sectionPart.materialType === 3) &&
        <Button variant="outlined"
          size={'small'}
          sx={{
            borderRadius: 5,
            border: 2
          }}
        >
          <Link component={RouterLink} to={`quiz/${sectionPart.exam.id}`} target="_blank" underline="none">
            Start Quiz
          </Link>
        </Button>
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
  );
};
export default MaterialListItem;
