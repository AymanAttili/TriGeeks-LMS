import AnalysisCard from '../../ui/AnalysisCard';
import { Card, CardContent, Divider, Grid2 as Grid, Typography } from '@mui/material';
import ReactQuill from 'react-quill';

import HomeWorkIcon from '@mui/icons-material/HomeWork';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { AccountBox } from '@mui/icons-material';
import { useDepartments } from '../../features/departments/useDepartments';
import { useUsers } from '../../features/users/useUsers';
import { useCourses } from '../../features/courses/useCourses';
import { useEffect, useState } from 'react';


function AdminDashboard() {
    // const {courses} = useCourses()
    const { departments } = useDepartments();
    const { users } = useUsers();
    const { courses } = useCourses();

    return (
        <>
            <Grid
                container
                alignItems={"center"}
                component={Card}
                sx={{
                    width: "100%",
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
                            title={"#Courses"}
                            filter={"courses"}
                            num={courses?.length}
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
                    </Grid>
                </Grid>
            </Grid>

        </>
    )
}

export default AdminDashboard