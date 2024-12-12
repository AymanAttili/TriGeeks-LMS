import React from "react";
import { Box, Button, Grid2, LinearProgress, Typography } from "@mui/material";

import Category from "../../ui/course/Category";

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
  return (
    <Grid2
      container
      spacing={2}
      sx={{
        height: "fit-content",
        alignItems: "center", // Vertically align content
        justifyContent: "center", // Horizontally center content
      }}
    >
      <Grid2
        spacing={2}
        container
        sx={{
          width: "100%",
          backgroundColor: "#f5f5f5",
          borderRadius: 2,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid2
          spacing={2}
          sx={{
            width: "90%",
            backgroundColor: "#f5f5f5",
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
            <Grid2
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
            </Grid2>

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
        </Grid2>
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
          <Grid2 container spacing={1} flexDirection={"column"}>
            <Category />
            <Category />
            <Category />
          </Grid2>
        </Box>
      </Grid2>
    </Grid2>
  );
};

export default Course;

// const { courseId } = useParams();
// const { course } = useCourse(courseId);
