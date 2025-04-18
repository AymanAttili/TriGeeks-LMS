import {
  Card,
  CardContent,
  Typography,
  LinearProgress,
  CardMedia,
  Box,
  Divider,
  Grid2 as Grid,

} from "@mui/material";
import logo from '../images/logo.png'
import { useNavigate } from "react-router-dom";
import { useUser } from "../features/users/useUser";
import { roleNames } from "../Enums/roles";

interface CourseCardProps {
  courseId: string;
  courseName: string;
  progress: number;
  createdBy: {
    name: string,
    id: number
  }
}


function CourseCard(props: CourseCardProps) {
  const { courseId, courseName, progress = 0, createdBy = '' } = props;
  const { user } = useUser();

  const navigate = useNavigate();

  return (
    <Grid
      size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
      maxWidth={360}
      component={Card}
      variant="outlined"
      sx={{
        // width: { xs: "20rem", sm: "30rem" },
        height: "20rem",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        cursor: 'pointer',
        "&:hover": {
          transform: "scale(1.015)",
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
        },

        border: "1px #dddddd solid",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        borderRadius: "4%",
      }}

      onClick={() => navigate(`${courseId}`)}
    >
      <CardMedia
        component="img"
        sx={{ height: "10rem", width: "100%", objectFit: "contain" }}
        image={logo}
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
            }}
          >
            <Typography
              variant="subtitle2"
              fontSize={"large"}
              color="text.secondary"
            >
              {courseId}
            </Typography>
            <Typography color="text.primary" variant="h6">
              {courseName}
            </Typography>
            <Typography color="text.secondary">
              {createdBy.name}
            </Typography>
          </Grid>
        </Grid>
        {
          roleNames[user.role] === 'Staff' &&
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
              value={Math.floor(progress * 100)}
              sx={{
                height: 8,
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
            >{`${Math.floor(progress * 100)}% `}</Typography>
          </Box>
        }

      </CardContent>
    </Grid>
  );
}

export default CourseCard;
