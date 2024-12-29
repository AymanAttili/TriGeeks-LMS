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

    const [value, setValue] = useState('<h1><img src="data:image/png;base64,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"></h1>');

    useEffect(() => {
        console.log(value);

    }, [value])

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

            <ReactQuill theme="snow" value={value} onChange={setValue} />
        </>
    )
}

export default AdminDashboard