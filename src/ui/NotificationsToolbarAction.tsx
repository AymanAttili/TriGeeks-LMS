import { Notifications } from "@mui/icons-material"
import { Badge, Button, Divider, FormHelperText, Grid2 as Grid, IconButton, Link, Menu, MenuItem, Paper, Tooltip, Typography } from "@mui/material"
import { useSysNotifications } from "../features/notifications/useSysNotifications"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { convertDate } from "../utils/helpers";
import { useUnreadSysNotifications } from "../features/notifications/useUnreadSysNotifications";

function NotificationsToolbarAction() {
    const { notifications } = useSysNotifications();
    const { unreadCount } = useUnreadSysNotifications();

    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    }
    return (
        <>
            <Tooltip title="Notifications">

                <IconButton
                    aria-controls={open ? 'notifications-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                >
                    <Badge color="primary" invisible={unreadCount === 0} badgeContent={unreadCount}>
                        <Notifications />
                    </Badge>
                </IconButton>
            </Tooltip>

            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                <Paper sx={{ width: 600, maxWidth: '100%', padding: 0, boxShadow: 0 }}>
                    <Typography padding={2} fontWeight={'600'} fontSize={22} color="primary.main" >
                        Notifications
                    </Typography>
                    <Divider />
                    {
                        notifications?.items?.map((item, ind) =>
                            <Grid container flexDirection={'column'} component={MenuItem}
                                sx={{
                                    bgcolor: `${item.isRead ? '' : 'primary.light'}`,
                                }}
                                key={ind}
                                onClick={
                                    () => {
                                        navigate(`/notifications/${item.id}`)
                                        handleClose();
                                    }
                                }
                            >
                                <Grid container width={'100%'} justifyContent={'space-between'} alignItems={'center'} gap={3}>
                                    <Grid container flexDirection={'column'} mr={5}>
                                        <Typography fontWeight={500}>
                                            {item.title} - <small>{item.content}</small>
                                        </Typography>

                                        <FormHelperText>
                                            {convertDate(item.createdAtUtc)}
                                        </FormHelperText>

                                    </Grid>
                                    {
                                        !item.isRead
                                        &&
                                        <Badge color="primary" variant="dot" sx={{ marginRight: 2 }}>
                                        </Badge>
                                    }

                                </Grid>
                                <Link alignSelf={'end'} sx={{
                                    fontSize: 14,
                                }}>
                                    view full notification
                                </Link>
                            </Grid>
                        )
                    }

                    <Button fullWidth onClick={
                        () => {
                            navigate('notifications')
                            handleClose();
                        }
                    }
                    >See all</Button>
                </Paper>
            </Menu>

        </>
    )
}

export default NotificationsToolbarAction