import { Add } from '@mui/icons-material';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid2 as Grid, MenuItem, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useMajors } from '../../features/departments/useMajors';
import { useDepartments } from '../../features/departments/useDepartments';

function AddCourseDialog({ payload, open, onClose }) {
    const { register, handleSubmit, watch, formState: { isLoading, errors: formErrors } } = useForm();
    const { majors, isLoading: fetchingMajors } = useMajors(watch('departmentId'))
    const { departments, isLoading: fetchingDeps } = useDepartments();


    const handleAddCourse = (data) => {
        if (!data)
            return;

        // if (payload)
        //     departmentDispatch({ action: 'edit', payload: { name: data.name, id: payload.id } })

        // else
        //     departmentDispatch({ action: 'add', payload: { name: data.name } })

        onClose();
    }
    return (
        <Dialog component='form' onSubmit={handleSubmit(handleAddCourse)} fullWidth maxWidth={'sm'} open={open} onClose={() => onClose()}>
            <DialogTitle>
                Add new course
            </DialogTitle>
            <DialogContent>
                <TextField label="Department name" margin='dense' fullWidth
                    disabled={isLoading}
                    error={!!formErrors.depName}
                    helperText={formErrors.depName?.message}
                    {...register('depName', { required: "Department Name is required", })}
                />
                <Grid container spacing={2}>
                    <TextField select label="Department" margin='normal' disabled={isLoading || fetchingDeps}
                        error={!!formErrors.departmentId}
                        helperText={formErrors.departmentId?.message}
                        {...register('departmentId', { required: "Department is required", })}
                        sx={{
                            minWidth: '200px'
                        }}
                    >
                        {departments?.map((option) => (
                            <MenuItem key={option.id} value={option.id}>
                                {option.name}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField select label="Major" margin='normal'
                        disabled={isLoading || fetchingMajors || fetchingDeps || !watch('departmentId')}
                        error={!!formErrors.majorId}
                        helperText={formErrors.majorId?.message}
                        {...register('majorId', { required: "Major is required", })}
                        sx={{
                            minWidth: '200px',
                        }}
                    >
                        {majors?.map((option) => (
                            <MenuItem key={option.id} value={option.id}>
                                {option.name}
                            </MenuItem>
                        ))}
                    </TextField>
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