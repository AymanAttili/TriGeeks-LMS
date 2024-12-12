import AnalysisCard from '../../ui/AnalysisCard';
import { Card, CardContent, Divider, Grid2 as Grid, Typography } from '@mui/material';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { PiCertificateFill } from 'react-icons/pi';
import { AccountBox } from '@mui/icons-material';
import { useDepartments } from '../../features/departments/useDepartments';
import { useUsers } from '../../features/users/useUsers';


function AdminDashboard() {
    // const {courses} = useCourses()
    const { departments } = useDepartments();
    const { users } = useUsers();

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
                <Typography variant="h4" sx={{ color: "primary.main" }}>
                    System analysis
                </Typography>
                <Divider />
            </Grid>
            <Grid container component={CardContent} size={12} justifyContent={'center'} spacing={2} margin={2}>
                <Grid
                    container
                    size={{ xs: 12, md: 10, lg: 8 }}
                    justifyContent={"center"}
                    height={"100%"}
                >
                    <AnalysisCard
                        title={"#Active Courses"}
                        filter={"courses"}
                        num={6}
                        icon={<MenuBookIcon />}
                        key={"courses"}
                    />
                    <AnalysisCard
                        title={"#Users"}
                        filter={"users"}
                        num={users?.metadata.totalItems}
                        icon={<AccountBox />}
                        key={"users"}
                    />
                    <AnalysisCard
                        title={"#Departments"}
                        filter={"departments"}
                        icon={<HomeWorkIcon />}
                        num={departments?.length}
                        key={"departments"}
                    />
                    <AnalysisCard
                        title={"#Certificates"}
                        filter={"certificates"}
                        num={8}
                        icon={<PiCertificateFill size='24' />}
                        key={"certificates"}
                    />
                </Grid>
            </Grid>
        </Grid>
    )
}

export default AdminDashboard