import { Edit } from '@mui/icons-material';
import { Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid2 as Grid, TextField, Typography } from '@mui/material';
import { useDispatchCourse } from './useDispatchCourse';
import LoadingButton from '@mui/lab/LoadingButton';
import { useState } from 'react';
import { useUsers } from '../users/useUsers';

function ChangeManagerDialog({ payload, open, onClose }) {
    const { courseDispatch, isLoading: dispatchingCourse } = useDispatchCourse();
    const { users, isLoading } = useUsers({
        page: 1,
        pageSize: 9999,
        filters: `role==SubAdmin`,
        userStatus: true
    })
    const [subAdminId, setSubAdminId] = useState(null);
    const handleChangeManager = async (e) => {
        e.preventDefault();
        if (subAdminId !== null)
            await courseDispatch({
                action: 'assignManager', payload: {
                    courseId: payload.course.id,
                    subAdminId
                }
            }).then(() => onClose())
    }
    return (
        <Dialog component='form' onSubmit={handleChangeManager} fullWidth maxWidth={'sm'} open={open} onClose={() => onClose()}>
            <DialogTitle>
                Change course manager
            </DialogTitle>
            <Grid container flexDirection={'column'} spacing={2} component={DialogContent} sx={{
                height: 370
            }}>
                <Autocomplete
                    disablePortal
                    options={users?.items.map((user) => {
                        return {
                            label: `${user.id} - ${user.firstName} ${user.middleName} ${user.lastName} (${user.workId})`,
                            id: user.id,
                        }
                    })}
                    sx={{
                        marginTop: 2
                    }}
                    renderInput={(params) => <TextField {...params} label="Sub Admin" />}
                    onChange={(_, value) => setSubAdminId(value.id)
                    }
                />

                <Typography>
                    Current Manager: {` ${payload?.course.createdByName || 'No one assigned yet.'}`}
                </Typography>
            </Grid>
            <DialogActions>
                <Button color='error' variant='outlined'
                    disabled={isLoading || dispatchingCourse}
                    onClick={() => onClose()}>Cancel</Button>
                <LoadingButton type='submit' variant='outlined'
                    disabled={isLoading || dispatchingCourse} loading={dispatchingCourse}
                    loadingPosition='end' endIcon={<Edit />} >
                    Change
                </LoadingButton>
            </DialogActions>
        </Dialog >
    );
}

export default ChangeManagerDialog