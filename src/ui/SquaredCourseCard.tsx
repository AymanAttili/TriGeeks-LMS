import {
  Card,
  CardContent,
  Typography,
  LinearProgress,
  CardMedia,
  Box,
  Divider,
  Grid2 as Grid,
  IconButton,
  Grid2,
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import HorizIconOptions from "./HorizIconOptions";
interface CourseCardProps {
  courseId: string;
  courseName: string;
  department: string;
  progress: number;
}

function CourseCard(props: CourseCardProps) {
  const { courseId, courseName, department, progress } = props; // todo implementing course hook (react query)

  return (
    <Grid2
      size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
      component={Card}
      variant="outlined"
      sx={{
        // width: { xs: "20rem", sm: "30rem" },
        height: "26rem",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          transform: "scale(1.04)",
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)",
        },

        border: "1px #dddddd solid",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        borderRadius: "4%",
      }}
    >
      <CardMedia
        component="img"
        sx={{ height: "17.3rem", width: "100%", objectFit: "contain" }}
        image="../logo.jpg"
        alt="Digital Literacy"
      />

      <Divider />
      <CardContent sx={{ padding: 2 }}>
        <Grid
          container
          sx={{ justifyContent: "space-between", alignItems: "center" }}
        >
          <Grid
            container
            sx={{
              flexDirection: "column",

              alignItems: "start",
              width: "80%",
            }}
          >
            <Typography
              variant="subtitle2"
              fontSize={"large"}
              color="text.secondary"
            >
              {courseId}
            </Typography>
            <Typography variant="h6" color="text.primary">
              {courseName}
            </Typography>
            <Typography variant="h5" color="text.primary">
              {department}
            </Typography>
          </Grid>
          <HorizIconOptions />
        </Grid>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mt: 2,
            justifyContent: "space-between",
            gap: 3,
            width: "100%",
          }}
        >
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
              height: 13,
              borderRadius: 5,
              width: "100%",
              "& .MuiLinearProgress-bar": {
                borderRadius: 4,
              },
            }}
          />
          <Typography
            sx={{ width: "fit-content" }}
            variant="body2"
            color="text.secondary"
          >{`${progress}% `}</Typography>
        </Box>
      </CardContent>
    </Grid2>
  );
}

export default CourseCard;
