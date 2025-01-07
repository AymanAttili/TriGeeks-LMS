import { Navigate, useParams, Link as RouterLink } from "react-router-dom";
import { Button, Card, Grid2 as Grid, Link, Paper, Typography } from "@mui/material";
import { useNotificationsReader } from "./useNotificationsReader";
import { useEffect } from "react";
import { convertDate } from "../../utils/helpers";
import SpinnerLoader from "../../ui/SpinnerLoader";
import { useSysNotification } from "./useSysNotification";

function NotificationPage() {
    const { notificationId } = useParams();

    const { notification, isLoading } = useSysNotification(notificationId)
    const { notificationsReader } = useNotificationsReader();

    useEffect(() => {
        if (notificationId != null)
            notificationsReader({ action: 'readOne', payload: { id: notificationId } })
    }, [notificationsReader, notificationId])

    if (isLoading)
        return <SpinnerLoader />

    if (notificationId == null || !notification)
        return <Navigate to='/404' />

    return (
        <Grid component={Paper} container flexDirection={'column'} padding={2} spacing={3} flex={1}>
            <Link component={RouterLink} to={'/notifications'} >
                ⇠ To all notifications
            </Link>
            <Grid container justifyContent={'space-between'}>
                <Typography variant="h4" color="primary.main">
                    {notification?.title}
                </Typography>
            </Grid>
            <Grid component={Card} container flexDirection={'column'} alignItems={'start'} justifyContent={'space-between'} padding={2} minHeight={'50%'}>
                <Grid container flexDirection={'column'} >
                    <Typography variant="h5">
                        {notification?.content}
                    </Typography>
                    <Typography fontSize={16} color="grey" marginTop={2} >
                        {convertDate(notification?.createdAtUtc)}
                    </Typography>
                </Grid>

                {
                    notification?.link &&
                    <Button variant="outlined" sx={{
                        alignSelf: 'center',
                        justifySelf: 'end'
                    }}>
                        <Link component={RouterLink} to={notification?.link} underline={'none'}>Go to material</Link>
                    </Button>
                }

            </Grid>
        </Grid >
    )
}

export default NotificationPage