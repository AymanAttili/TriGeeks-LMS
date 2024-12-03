import { useParams } from "react-router-dom";
import { useSysNotification } from "./useSysNotification";
import { Button, Card, Grid2 as Grid, Paper, Typography } from "@mui/material";
import { useNotificationsReader } from "./useNotificationsReader";
import { useEffect } from "react";

function NotificationPage() {
    const { notificationId } = useParams();
    const { notification } = useSysNotification(notificationId)
    const { notificationsReader } = useNotificationsReader();

    useEffect(() => {
        notificationsReader({ ids: [notificationId], newStatus: 1 })
    }, [notificationsReader, notificationId])

    return (
        <Grid component={Paper} container flexDirection={'column'} padding={2} spacing={3} flex={1} margin={{ md: 2 }}>
            <Grid container justifyContent={'space-between'}>
                <Typography variant="h4" color="primary.main">
                    Notification: {notificationId}
                </Typography>
            </Grid>
            <Grid component={Card} container flexDirection={'column'} alignItems={'start'} justifyContent={'space-between'} padding={2} minHeight={'50%'}>
                <Grid container flexDirection={'column'}>
                    <Typography variant="h5">
                        Course name
                    </Typography>
                    <Typography>
                        notification body with {` {links}`}
                    </Typography>
                </Grid>

                <Button variant="outlined" sx={{
                    alignSelf: 'center',
                    justifySelf: 'end'
                }}>Go to material</Button>
            </Grid>
        </Grid>
    )
}

export default NotificationPage