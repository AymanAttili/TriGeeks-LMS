import {
  Accordion,
  accordionClasses,
  AccordionDetails,
  accordionDetailsClasses,
  AccordionSummary,
  Button,
  Grid2 as Grid,
  IconButton,
  List,
  Tooltip,
  Typography,
} from "@mui/material";
import QuizIcon from "@mui/icons-material/Quiz";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MaterialListItem from "../../ui/course/MaterialListItem";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useState } from "react";
import { useDialogs } from "@toolpad/core";
import AddMaterialDialog from "../../features/courses/AddMaterialDialog";
import { useUser } from "../../features/users/useUser";
import { roleNames } from "../../Enums/roles";
import { useDispatchCourse } from "../../features/courses/useDispatchCourse";
import { Delete, Edit } from "@mui/icons-material";
import AddSectionDialog from "../../features/courses/AddSectionDialog";

interface CategoryProps {
  section: {
    id: number,
    title: string
    index: number,
    sectionParts: []
  },
  courseId: string
}


const Category: React.FC<CategoryProps> = ({ section, courseId }) => {
  const dialogs = useDialogs();

  const { user } = useUser();
  const { courseDispatch, isLoading } = useDispatchCourse();

  const [expanded, setExpanded] = useState(true);

  const handleExpansion = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };
  const openAddMaterial = async () => {
    await dialogs.open(AddMaterialDialog, { sectionId: section.id });
  };

  const handleEdit = async () => {
    await dialogs.open(AddSectionDialog, { section, courseId });
  };

  const handleDelete = async () => {
    const ok = await dialogs.confirm('Are you sure you want to delete this Course?', {
      severity: "error",
      okText: 'Delete',
      title: 'Delete Course',
    }
    )

    if (ok) {
      await courseDispatch({ action: 'deleteSection', payload: { courseId, sectionId: section.id } })
    }
  }
  return (
    <Grid container flexDirection={'column'} padding={1.5} border={2} borderRadius={2} borderColor={'primary.light'}>
      <Accordion
        expanded={expanded}
        onChange={handleExpansion}
        // slots={{ transition: Grow as AccordionSlots["transition"] }}
        slotProps={{ transition: { timeout: 600 } }}
        sx={[
          {
            borderRadius: 5,
            // Curved corners on the overall Accordion component
            overflow: "hidden", // Ensures that contents respect the rounded corners
          },
          expanded
            ? {
              [`& .${accordionClasses.region}`]: {
                height: "auto",
              },
              [`& .${accordionDetailsClasses.root}`]: {
                display: "block",
              },
            }
            : {
              [`& .${accordionClasses.region}`]: {
                height: 0,
              },
              [`& .${accordionDetailsClasses.root}`]: {
                display: "none",
              },
            },
        ]}
      >
        <Grid
          container
          flexDirection={{ sx: 'column', sm: 'row' }}
          sx={{
            backgroundColor: "primary.light",
            alignItems: "center",
            justifyContent: "space-between",
            // mb: 1,
          }}
        >
          <AccordionSummary
            sx={{
              flexDirection: "row-reverse", // Moves the expand icon to the left
            }}
            expandIcon={
              <ExpandMoreIcon
                sx={{
                  width: "26px",
                  height: "26px",
                  borderRadius: "50%",
                }}
              />
            }
            aria-controls="panel2-content"
            id="panel2-header"
          >
            <Grid container size={12} alignItems={'center'} justifyContent={'space-between'}>
              <Typography
                variant="h6"
                sx={{ ml: 1 }}
                fontWeight="bold"
                color="primary.main"
              >
                {section.title}
              </Typography>
              { //TODO: fixing view
                roleNames[user?.role] !== 'Staff' &&
                <Grid container spacing={1}>
                  <Tooltip title={'Edit'}>
                    <IconButton onClick={handleEdit} disabled={isLoading} >
                      <Edit />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title={'Delete'}>
                    <IconButton color="error" onClick={handleDelete} disabled={isLoading} >
                      <Delete />
                    </IconButton>
                  </Tooltip>
                </Grid>
              }
            </Grid>
          </AccordionSummary>

        </Grid>
        <AccordionDetails>
          {/* Materials : )  */}
          <List sx={{ padding: 0 }}>
            {
              section.sectionParts?.sort((it1, it2) => it1.index - it2.index).map((sectionPart) => <MaterialListItem key={sectionPart.id} sectionPart={sectionPart} />)
            }

          </List>

          {
            roleNames[user?.role] !== 'Staff' &&
            <Grid
              container
              spacing={1}
              flexDirection={{ xs: 'column', sm: 'row' }}
              sx={{
                padding: 2,
                borderTop: "1px solid #E0E0E0",
              }}
            >
              <Button
                variant="outlined"
                startIcon={<AddCircleOutlineIcon />}
                sx={{
                  textTransform: "none",
                  fontWeight: "bold",
                }}
                onClick={openAddMaterial}
              >
                Add new material
              </Button>
              <Button
                variant="outlined"
                startIcon={<QuizIcon />}
                sx={{
                  textTransform: "none",
                  fontWeight: "bold",
                }}
              >
                Add new Quiz
              </Button>
            </Grid>
          }
        </AccordionDetails>
      </Accordion >
    </Grid>
  );
};

export default Category;
