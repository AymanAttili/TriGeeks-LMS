import { Add } from '@mui/icons-material';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useDispatchMajors } from './useDispatchMajors';
import LoadingButton from '@mui/lab/LoadingButton';

function AddMajorDialog({ payload, open, onClose }) {
    const { register, handleSubmit } = useForm();
    const { majorsDispatch, isLoading } = useDispatchMajors();


    const handleAddDep = async (data) => {
        if (!data)
            return;

        if (payload?.departmentId)
            await majorsDispatch({
                action: 'edit', payload: { departmentId: payload.departmentId, majorId: payload.id, name: data.name }
            }).then(() => onClose());

        else
            await majorsDispatch({
                action: 'add', payload: { departmentId: payload.id, name: data.name }
            }).then(() => onClose());
    }
    return (
        <Dialog component='form' onSubmit={handleSubmit(handleAddDep)} fullWidth maxWidth={'xs'} open={open} onClose={() => onClose()}>
            <DialogTitle>
                {payload.departmentId ? 'Edit ' : 'Add new '}
                major
            </DialogTitle>
            <DialogContent>
                <TextField label="Major name" margin='dense' disabled={isLoading} fullWidth defaultValue={payload?.name} {...register('name', { required: true })} />
            </DialogContent>
            <DialogActions>
                <Button color='error' variant='outlined' disabled={isLoading} onClick={() => onClose()}>Cancel</Button>
                <LoadingButton type='submit' variant='outlined' loading={isLoading} disabled={isLoading} loadingPosition='end' endIcon={<Add />} >
                    {payload ? 'Edit' : 'Add'}
                </LoadingButton>
            </DialogActions>
        </Dialog>
    );
}

export default AddMajorDialog