import {
  Button,
  Card,
  CardContent,
  Grid2 as Grid,
  Typography,
} from "@mui/material";
import DataPieChart from "../../ui/DataPieChart";

import CoursesStatusCard from "../../ui/CoursesStatusCard";
import { Refresh } from "@mui/icons-material";

function StaffDashboard() {
  return (
    <Grid
      container
      alignItems={"center"}
      component={Card}
      sx={{
        borderRadius: 2,
        alignSelf: "center",
      }}
    >
      <Grid container component={CardContent} spacing={2} width={"100%"}>
        <Grid container justifyContent={"end"} size={{ xs: 12 }}>
          <Button startIcon={<Refresh />} variant="contained">
            Refresh Data
          </Button>
        </Grid>
        <Grid container>
          <Grid
            container
            size={{ xs: 12, md: 6, lg: 8 }}
            justifyContent={"center"}
            height={"100%"}
          >
            <CoursesStatusCard
              title={"Completed"}
              filter={"completed"}
              num={6}
              key={"completed"}
            />
            <CoursesStatusCard
              title={"In Progress"}
              filter={"inProgress"}
              num={5}
              key={"inProgress"}
            />
            <CoursesStatusCard
              title={"Failed"}
              filter={"failed"}
              num={2}
              key={"failed"}
            />
            <CoursesStatusCard
              title={"Not Started"}
              filter={"notStarted"}
              num={8}
              key={"notStarted"}
            />
            <CoursesStatusCard
              title={"Overall courses"}
              filter={"overall"}
              num={20}
              key={"overall"}
            />
            <CoursesStatusCard
              title={"Expired"}
              filter={"expired"}
              num={3}
              key={"expired"}
            />
          </Grid>

          <Grid
            component={Card}
            columns={2}
            size={{ md: 6, lg: 4 }}
            alignItems={"center"}
            justifyContent={"center"}
            variant="outlined"
            sx={{
              borderRadius: 1,
              borderWidth: 1.5,
              padding: 1,
              display: { xs: "none", md: "block" },
            }}
          >
            <Grid
              component={Typography}
              p={1}
              sx={{ fontWeight: "600", fontSize: 24 }}
            >
              Training Status
            </Grid>
            <DataPieChart
              data={[
                { label: "Not Started", value: 8, color: "#bdbdbd" },
                { label: "In Progress", value: 5, color: "#e0efef" },
                { label: "Completed", value: 6, color: "#027e7b" },
              ]}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default StaffDashboard;
