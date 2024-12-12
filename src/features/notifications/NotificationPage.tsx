import { Navigate, useParams, Link as RouterLink } from "react-router-dom";
import { Button, Card, Grid2 as Grid, Link, Paper, Typography } from "@mui/material";
import { useNotificationsReader } from "./useNotificationsReader";
import { useEffect, useMemo } from "react";
import { useSysNotifications } from "./useSysNotifications";

function NotificationPage() {
    const { notificationId } = useParams();
    const payload = useMemo(() => {
        return {
            filter: `id==${notificationId}`,
            page: 1,
            pageSize: 1
        }
    }, [notificationId])
    const { notifications } = useSysNotifications(payload)
    const notification = notifications?.items.at(0);
    const { notificationsReader } = useNotificationsReader();

    useEffect(() => {
        if (notificationId != null)
            notificationsReader({ action: 'readOne', payload: { id: notificationId } })
    }, [notificationsReader, notificationId])

    if (notificationId == null)
        return <Navigate replace to='/' />

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
                        {notification?.title}
                    </Typography>
                    <Typography>
                        {notification?.content}
                    </Typography>
                </Grid>

                <Button variant="outlined" sx={{
                    alignSelf: 'center',
                    justifySelf: 'end'
                }}>
                    <Link component={RouterLink} to={notification?.link} underline={'none'}>Go to material</Link>
                </Button>
            </Grid>
        </Grid>
    )
}

export default NotificationPage