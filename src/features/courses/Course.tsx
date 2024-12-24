import React from "react";
import { Box, Button, Grid2 as Grid, LinearProgress, Paper, Typography } from "@mui/material";

import Category from "../../ui/course/Category";
import { Add } from "@mui/icons-material";
import { useDialogs } from "@toolpad/core";
import AddSectionDialog from "./AddSectionDialog";

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
  const dialogs = useDialogs();
  const openAddSection = async () => {
    await dialogs.open(AddSectionDialog);
  }

  return (
    <Grid
      flex={1}
      container
      flexDirection={'column'}
      component={Paper}
      spacing={2}
      sx={{
        alignItems: "center", // Vertically align content
      }}
    >
      <Grid
        spacing={2}
        container
        sx={{
          width: "100%",

          borderRadius: 2,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid
          spacing={2}
          sx={{
            width: "90%",
            padding: 2,
            borderRadius: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Left Section */}
          <Box
            sx={{
              width: "100%",
              textAlign: "left",
            }}
          >
            {/* Course Title */}
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Course Title
            </Typography>

            {/* Progress Bar */}
            <Grid
              container
              sx={{ width: "40%", maxWidth: "250px" }}
              alignItems={"center"}
            >
              <LinearProgress
                variant="determinate"
                value={60}
                sx={{
                  flexGrow: 1,
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: "#e0e0e0",
                  "& .MuiLinearProgress-bar": {
                    backgroundColor: "primary",
                  },
                }}
              />
              <Typography sx={{ marginLeft: 1, fontSize: 12 }}>
                {60}%
              </Typography>
            </Grid>

            {/*TODO : add grade here*/}
            <Typography variant="body1" fontWeight="bold" sx={{ marginTop: 2 }}>
              Grade: <span style={{ fontWeight: "normal" }}>--</span>
            </Typography>
          </Box>

          {/* Right Section */}
          <Box sx={{ width: "35%", textAlign: "right" }}>
            <Button
              variant="contained"
              sx={{
                borderRadius: 4,
                padding: 1.5,
                backgroundColor: "primary",
                color: "#fff",
                textTransform: "none",
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: "#027a66",
                },
              }}
            >
              Download Certificate
            </Button>
          </Box>
        </Grid>
        {/* {Categories} */}
        <Box
          sx={{
            border: "1px solid #008080",
            borderRadius: 3,

            width: "90%",
            padding: 2,
            borderRaduis: "20%",
          }}
        >
          <Grid container spacing={1} flexDirection={"column"}>
            <Category />
            <Category />
            <Category />
            <Grid container paddingTop={2}>
              <Button
                onClick={openAddSection}
                variant="outlined"
                startIcon={<Add />}
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
                Add new section
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Course;

// const { courseId } = useParams();
// const { course } = useCourse(courseId);
