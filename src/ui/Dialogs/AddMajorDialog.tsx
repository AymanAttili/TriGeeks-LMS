import { Add } from '@mui/icons-material';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useDispatchMajors } from '../../features/departments/useDispatchMajors';

function AddMajorDialog({ payload, open, onClose }) {
    const { register, handleSubmit } = useForm();
    const { majorsDispatch, isLoading } = useDispatchMajors();


    const handleAddDep = (data) => {
        if (!data)
            return;

        if (payload?.departmentId)
            majorsDispatch({ action: 'edit', payload: { departmentId: payload.departmentId, majorId: payload.id, name: data.name } })

        else
            majorsDispatch({ action: 'add', payload: { departmentId: payload.id, name: data.name } })

        onClose();
    }
    return (
        <Dialog component='form' onSubmit={handleSubmit(handleAddDep)} fullWidth maxWidth={'xs'} open={open} onClose={() => onClose()}>
            <DialogTitle>
                {payload.departmentId ? 'Edit ' : 'Add '}
                new major
            </DialogTitle>
            <DialogContent>
                <TextField label="Major name" margin='dense' disabled={isLoading} fullWidth defaultValue={payload?.name} {...register('name', { required: true })} />
            </DialogContent>
            <DialogActions>
                <Button color='error' variant='outlined' disabled={isLoading} onClick={() => onClose()}>Cancel</Button>
                <Button type='submit' variant='outlined' disabled={isLoading} endIcon={<Add />} >
                    {payload.departmentId ? 'Edit' : 'Add'}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default AddMajorDialog