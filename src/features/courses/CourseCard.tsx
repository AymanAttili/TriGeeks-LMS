import React from 'react';
import PropTypes from "prop-types";
import {
  Avatar,
  Box,
  CardContent,
  Chip,
  Grid2 as Grid,
  TableCell,
  Typography,
  useMediaQuery,
} from "@mui/material";
import theme from "../../utils/theme";
import GreenCheckIcon from "../../ui/GreenCheckIcon";

function CourseCard({ course }) {
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <TableCell sx={{ p: 0 }}>
      <CardContent
        style={{
          display: "flex",

          alignItems: "center",
          flexDirection: isSmallScreen ? "column" : "row",
          justifyContent: isSmallScreen ? "center" : "",
          gap: 20,
        }}
      >
        <Avatar
          src={"./logo.jpg"}
          style={{
            width: "9rem",
            height: "9rem",
            marginRight: isSmallScreen ? 0 : 13,
            borderRadius: 15,
          }}
          variant="square"
        />
        <Grid
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: isSmallScreen ? "center" : "",
            alignItems: isSmallScreen ? "center" : "",
            gap: 2,
          }}
          // height={150}
        >
          <Typography variant="h6">{course.title}</Typography>
          <Typography variant="body2" color="textSecondary">
            Created: {course.created}
          </Typography>
          <Box>
            <Chip
              icon={<GreenCheckIcon />}
              label={course.status}
              color={course.status === "Published" ? "success" : "default"}
              size="large"
              style={{
                backgroundColor: "#cecece", // Adjust the color to match your needs
                color: "#353b33", // Text color
                fontWeight: "500",
                position: "relative",
                width: "8rem",
              }}
            />
          </Box>
        </Grid>
      </CardContent>
    </TableCell>
  );
}

CourseCard.propTypes = {
  course: PropTypes.shape({
    title: PropTypes.string.isRequired,
    created: PropTypes.string.isRequired,
    duration: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    level: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  }).isRequired,
};

export default CourseCard;
