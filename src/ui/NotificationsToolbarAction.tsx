import { Notifications } from "@mui/icons-material"
import { Badge, Button, Divider, FormHelperText, Grid2 as Grid, IconButton, Link, Menu, MenuItem, Tooltip, Typography } from "@mui/material"
import { useSysNotifications } from "../features/notifications/useSysNotifications"
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function NotificationsToolbarAction() {
    const { notifications } = useSysNotifications();

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
                    <Notifications />
                </IconButton>
            </Tooltip>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                {
                    notifications?.map((item, ind) =>
                        <Grid container flexDirection={'column'} component={MenuItem}
                            sx={{
                                bgcolor: `${item.read == 1 ? '' : 'primary.light'}`,
                            }}
                            key={ind}
                            onClick={
                                () => {
                                    navigate(`/notifications/${item.link}`)
                                    handleClose();
                                }
                            }
                        >
                            <Grid container width={'100%'} justifyContent={'space-between'} alignItems={'center'} gap={3}>
                                <Grid container flexDirection={'column'} >
                                    <Typography fontWeight={500}>
                                        {item.courseName} - <small>{item.title}</small>
                                    </Typography>

                                    <FormHelperText>
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
                            <Link alignSelf={'end'} sx={{
                                fontSize: 14
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
                }>See all</Button>
            </Menu>
        </>
    )
}

export default NotificationsToolbarAction