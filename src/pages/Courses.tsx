import React from 'react';
import {
  Box,
  Card,
  Grid2 as Grid,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import theme from "../utils/theme";
import NetworkStrength from "../ui/NetworkStrength";
import CourseCard from "../features/courses/CourseCard";
const courses = [
  {
    title: "Master Design System In Figma",
    created: "April 13, 2022 - 4:24 PM",
    duration: "20h 10m",
    price: "$150",
    level: "Advanced",
    image: "./logo.jpg",
    status: "Published",
  },
  {
    title: "Master Design System In Figma",
    created: "April 13, 2022 - 4:24 PM",
    duration: "20h 10m",
    price: "$150",
    level: "Advanced",
    image: "./logo.jpg",
    status: "Published",
  },
  // {
  //   title: "Master Design System In Figma",
  //   created: "April 13, 2022 - 4:24 PM",
  //   duration: "20h 10m",
  //   price: "$150",
  //   level: "Advanced",
  //   image: "./logo.jpg",
  //   status: "Published",
  // },
  // {
  //   title: "Master Design System In Figma",
  //   created: "April 13, 2022 - 4:24 PM",
  //   duration: "20h 10m",
  //   price: "$150",
  //   level: "Advanced",
  //   image: "./logo.jpg",
  //   status: "Published",
  // },
  // {
  //   title: "Master Design System In Figma",
  //   created: "April 13, 2022 - 4:24 PM",
  //   duration: "20h 10m",
  //   price: "$150",
  //   level: "Advanced",
  //   image: "./logo.jpg",
  //   status: "Published",
  // },
];

function Courses() {
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <TableContainer
      component={Card}
      variant="outlined"
      sx={{
        maxHeight: "auto", // Set the desired height for scrollable content
        overflowY: "auto", // Enable vertical scrolling
      }}
    >
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell sx={{ color: "primary.main" }}>
              <Grid
                container
                sx={{
                  flexDirection: isSmallScreen ? "column" : "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography>{isSmallScreen ? "" : "Courses"}</Typography>
                <TextField
                  variant="outlined"
                  size="small"
                  placeholder={isSmallScreen ? "Courses" : "Search"}
                  sx={{ width: isSmallScreen ? "100%" : "60%" }}
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                    },
                  }}
                />
              </Grid>
            </TableCell>
            <TableCell sx={{ color: "primary.main" }}>Duration</TableCell>
            <TableCell sx={{ color: "primary.main" }}>Level</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {courses.map((course, index) => (
            <TableRow key={index}>
              <CourseCard course={course} />
              <TableCell>
                <Typography
                  variant="body2"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <AccessTimeIcon fontSize="small" style={{ marginRight: 4 }} />
                  {course.duration}
                </Typography>
              </TableCell>

              <TableCell>
                <Grid
                  container
                  gap={1}
                  sx={{
                    // flexDirection: isSmallScreen ? "column" : "row",
                    flexDirection: { xs: "row", sm: "column", md: "row" },
                    justifyContent: isSmallScreen ? "center" : "",
                    alignItems: isSmallScreen ? "center" : "",
                  }}
                >
                  <NetworkStrength strength={course.level} />
                  <Box>{course.level}</Box>
                </Grid>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default Courses;
