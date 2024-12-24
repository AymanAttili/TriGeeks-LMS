import { Add } from '@mui/icons-material';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';

function AddSectionDialog({ payload, open, onClose }) {
    const { register, handleSubmit, watch, formState: { isLoading, errors: formErrors } } = useForm();

    const handleAddSection = (data) => {
        if (!data)
            return;

        onClose();
    }
    return (
        <Dialog component='form' onSubmit={handleSubmit(handleAddSection)} fullWidth maxWidth={'sm'} open={open} onClose={() => onClose()}>
            <DialogTitle>
                Add new course section
            </DialogTitle>
            <DialogContent>
                <TextField label="Section name" margin='dense' fullWidth
                    disabled={isLoading}
                    error={!!formErrors.sectionName}
                    helperText={formErrors.sectionName?.message}
                    {...register('sectionName', { required: "Section Name is required", })}
                />
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

export default AddSectionDialog