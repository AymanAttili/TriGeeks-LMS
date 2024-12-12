import AnalysisCard from '../../ui/AnalysisCard';
import { Button, Card, CardContent, Divider, Grid2 as Grid, Typography } from '@mui/material';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { Unpublished } from '@mui/icons-material';
import { useDialogs } from '@toolpad/core';
import AddCourseDialog from '../../ui/Dialogs/AddCourseDialog';


function SubAdminDashboard() {
    // const {courses} = useCourses()

    const dialogs = useDialogs();
    const openCoursesDialog = () => {
        dialogs.open(AddCourseDialog);
    }
    return (
        <Grid
            container
            alignItems={"center"}
            component={Card}
            sx={{
                width: "100%",
                margin: 1,
                padding: 2,
                borderRadius: 2,
                alignSelf: "center",
            }}
        >
            <Grid container flexDirection={'column'} size={12} gap={3}>
                <Grid container justifyContent={'space-between'} alignItems={'center'} px={2}>
                    <Typography variant="h4" sx={{ color: "primary.main" }}>
                        My courses analysis
                    </Typography>
                    <Button variant="contained" onClick={openCoursesDialog}>Add Course</Button>
                </Grid>
                <Divider />
            </Grid>
            <Grid container component={CardContent} size={12} spacing={2} margin={2}>
                <Grid
                    container
                    size={{ xs: 12, md: 10, lg: 8 }}
                    justifyContent={"center"}
                    height={"100%"}
                >
                    <AnalysisCard
                        title={"#Active Courses"}
                        filter={"my-courses"}
                        num={6}
                        icon={<MenuBookIcon />}
                        key={"courses"}
                    />

                    <AnalysisCard
                        title={"#Inactive courses"}
                        filter={"my-courses"}
                        num={8}
                        icon={<Unpublished />}
                        key={"certificates"}
                    />
                </Grid>
            </Grid>
        </Grid >
    )
}

export default SubAdminDashboard