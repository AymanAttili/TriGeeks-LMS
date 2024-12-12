import { Add } from '@mui/icons-material';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid2 as Grid, InputAdornment, MenuItem, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

function AddCourseDialog({ payload, open, onClose }) {
    const { register, handleSubmit, watch, formState: { isLoading, errors: formErrors } } = useForm();

    const handleAddCourse = (data) => {
        if (!data)
            return;

        onClose();
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
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker
                            disabled={isLoading}
                            sx={{ marginTop: 1 }}
                            label="Expiration"
                            {...register('expiration')}
                        />
                    </LocalizationProvider>

                    <TextField label="Expected time to finish" margin='dense'
                        type={'number'}
                        slotProps={{
                            input: {
                                endAdornment: <InputAdornment position="end">Days</InputAdornment>,
                            },
                        }}
                        defaultValue={90}
                        disabled={isLoading}
                        error={!!formErrors.expectedTimeToFinish}
                        helperText={formErrors.expectedTimeToFinish?.message}
                        {...register('expectedTimeToFinish', {
                            required: "Expected time to finish is required",
                            min: { value: 1, message: "Number of days should be more than 0" }
                        })}
                    />
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button color='error' variant='outlined' disabled={isLoading} onClick={() => onClose()}>Cancel</Button>
                <Button type='submit' variant='outlined' disabled={isLoading} endIcon={<Add />} >
                    Add
                </Button>
            </DialogActions>
        </Dialog >
    );
}

export default AddCourseDialog