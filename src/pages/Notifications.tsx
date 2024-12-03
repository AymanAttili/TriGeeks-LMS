import { Badge, Button, FormHelperText, Grid2 as Grid, MenuItem, Paper, Typography } from "@mui/material"
import { useSysNotifications } from "../features/notifications/useSysNotifications"
import { useNavigate } from "react-router-dom";

function Notifications() {
    const { notifications } = useSysNotifications();

    const navigate = useNavigate();
    return (
        <Grid component={Paper} container flexDirection={'column'} padding={2} spacing={3} flex={1} margin={{ md: 2 }}>
            <Grid container justifyContent={'space-between'}>
                <Typography variant="h4" color="primary.main">
                    Notifications
                </Typography>
                <Button variant="contained" >Mark all as read</Button>
            </Grid>

            <Grid container flexDirection={'column'} spacing={0}>
                {notifications?.map((item, ind) =>
                    <Grid container flexDirection={'column'}
                        sx={{
                            padding: 2,
                            bgcolor: `${item.read == 1 ? '' : 'primary.light'}`,
                            '&:hover': {
                                bgcolor: 'whiteSmoke',
                                cursor: 'pointer'
                            }
                        }}
                        key={ind}
                        onClick={
                            () => {
                                navigate(`/notifications/${item.link}`)
                            }
                        }
                    >
                        <Grid container width={'100%'} justifyContent={'space-between'} alignItems={'center'} gap={3}>
                            <Grid container flexDirection={'column'} >
                                <Typography fontWeight={500} variant="h6">
                                    {item.courseName}
                                </Typography>

                                <Typography sx={{
                                    fontSize: 14
                                }}>
                                    {item.title}
                                </Typography>

                                <FormHelperText sx={{ marginTop: 2 }}>
                                    {item.date}
                                </FormHelperText>


                            </Grid>
                            {
                                item.read == 0
                                &&
                                <Badge color="primary" variant="dot" sx={{ marginRight: 2 }}>
                                </Badge>
                            }

                        </Grid>
                    </Grid>
                )
                }
            </Grid>

        </Grid>
    )
}

export default Notifications