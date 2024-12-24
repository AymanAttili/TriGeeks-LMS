import {
  Accordion,
  accordionClasses,
  AccordionDetails,
  accordionDetailsClasses,
  AccordionSlots,
  AccordionSummary,
  Box,
  Button,
  Grid2,
  Grow,
  List,
  Typography,
} from "@mui/material";
import QuizIcon from "@mui/icons-material/Quiz";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MaterialListItem from "../../ui/course/MaterialListItem";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useState } from "react";
import { useDialogs } from "@toolpad/core";
import AddMaterialDialog from "../../features/courses/AddMaterialDialog";

const Category: React.FC = () => {
  const dialogs = useDialogs();
  const [expanded, setExpanded] = useState(false);

  const handleExpansion = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };
  const openAddMaterial = () => {
    dialogs.open(AddMaterialDialog);
  };
  return (
    <>
      <Accordion
        expanded={expanded}
        onChange={handleExpansion}
        slots={{ transition: Grow as AccordionSlots["transition"] }}
        slotProps={{ transition: { timeout: 400 } }}
        sx={[
          {
            // Curved corners on the overall Accordion component
            borderRadius: 1,
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
        <Box
          sx={{
            backgroundColor: "primary.main",
            // padding: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "",
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
                  backgroundColor: "white",
                  borderRadius: "50%",
                }}
              />
            }
            aria-controls="panel2-content"
            id="panel2-header"
          >
            <Typography
              sx={{ ml: 1 }}
              fontWeight="bold"
              color="white"
              fontSize={18}
            >
              Category 1
            </Typography>
          </AccordionSummary>
        </Box>
        <AccordionDetails>
          {/* Materials : )  */}
          <List sx={{ padding: 0 }}>
            <MaterialListItem isLink={true} isFile={false} />
            <MaterialListItem isLink={false} isFile={true} />
            <MaterialListItem isLink={true} isFile={false} />
          </List>

          <Grid2
            container
            spacing={1}
            sx={{
              padding: 2,

              borderTop: "1px solid #E0E0E0",
            }}
          >
            <Button
              variant="outlined"
              startIcon={<AddCircleOutlineIcon />}
              sx={{
                borderColor: "#008080",
                color: "#008080",
                textTransform: "none",
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: "#E0F7F7",
                  borderColor: "#008080",
                },
              }}
              onClick={openAddMaterial}
            >
              Add new material
            </Button>
            <Button
              variant="outlined"
              startIcon={<QuizIcon />}
              sx={{
                borderColor: "#008080",
                color: "#008080",
                textTransform: "none",
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: "#E0F7F7",
                  borderColor: "#008080",
                },
              }}
            >
              Add new Quiz
            </Button>
          </Grid2>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default Category;
