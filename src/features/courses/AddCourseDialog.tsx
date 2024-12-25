import { Add } from '@mui/icons-material';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid2 as Grid, InputAdornment, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useDispatchCourse } from './useDispatchCourse';
import LoadingButton from '@mui/lab/LoadingButton';

function AddCourseDialog({ payload, open, onClose }) {
    const { register, handleSubmit, setValue, formState: { isLoading, errors: formErrors } } = useForm();
    const { courseDispatch, isLoading: dispatchingCourse } = useDispatchCourse();

    const handleAddCourse = async (data) => {
        if (!data)
            return;

        await courseDispatch({
            action: 'add', payload: {
                data:
                {
                    name: data.courseName,
                    expectedTimeToFinishHours: data.expectedTimeToFinish,
                    expirationMonths: data.expiration
                }
            }
        }).then(() => onClose());
    }
    return (
        <Dialog component='form' onSubmit={handleSubmit(handleAddCourse)} fullWidth maxWidth={'sm'} open={open} onClose={() => onClose()}>
            <DialogTitle>
                Add new course
            </DialogTitle>
            <DialogContent>
                <TextField label="Course name" margin='dense' fullWidth
                    disabled={isLoading}
                    error={!!formErrors.courseName}
                    helperText={formErrors.courseName?.message}
                    {...register('courseName', { required: "Course Name is required", })}
                />

                <Grid container spacing={2} pt={2}>

                    <TextField label="Expiration" margin='dense'
                        type={'number'}
                        slotProps={{
                            input: {
                                endAdornment: <InputAdornment position="end">Months</InputAdornment>,
                            },
                        }}
                        defaultValue={12}
                        disabled={isLoading || dispatchingCourse}
                        error={!!formErrors.expiration}
                        helperText={formErrors.expiration?.message}
                        {...register('expiration', {
                            required: "Expiration months is required",
                            min: { value: 1, message: "Number of months should be more than 0" }
                        })}
                    />

                    <TextField label="Expected time to finish" margin='dense'
                        type={'number'}
                        slotProps={{
                            input: {
                                endAdornment: <InputAdornment position="end">Hours</InputAdornment>,
                            },
                        }}
                        defaultValue={90}
                        disabled={isLoading || dispatchingCourse}
                        error={!!formErrors.expectedTimeToFinish}
                        helperText={formErrors.expectedTimeToFinish?.message}
                        {...register('expectedTimeToFinish', {
                            required: "Expected time to finish is required",
                            min: { value: 1, message: "Number of hours should be more than 0" }
                        })}
                    />
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button color='error' variant='outlined' disabled={isLoading || dispatchingCourse} onClick={() => onClose()}>Cancel</Button>
                <LoadingButton type='submit' variant='outlined' disabled={isLoading || dispatchingCourse} loading={dispatchingCourse} loadingPosition='end' endIcon={<Add />} >
                    Add
                </LoadingButton>
            </DialogActions>
        </Dialog >
    );
}

export default AddCourseDialog