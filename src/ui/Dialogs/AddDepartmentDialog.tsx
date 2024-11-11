import { Add } from '@mui/icons-material';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useDispatchDepartment } from '../../features/departments/useDispatchDepartment';

function AddDepartmentDialog({ payload, open, onClose }) {
    const { register, handleSubmit } = useForm();
    const { departmentDispatch, isLoading } = useDispatchDepartment();


    const handleAddDep = (data) => {
        if (!data)
            return;

        if (payload)
            departmentDispatch({ action: 'edit', payload: { name: data.name, id: payload.id } })

        else
            departmentDispatch({ action: 'add', payload: { name: data.name } })

        onClose();
    }
    return (
        <Dialog component='form' onSubmit={handleSubmit(handleAddDep)} fullWidth maxWidth={'xs'} open={open} onClose={() => onClose()}>
            <DialogTitle>
                {payload ? 'Edit ' : 'Add '}
                new department
            </DialogTitle>
            <DialogContent>
                <TextField label="Department name" margin='dense' disabled={isLoading} fullWidth defaultValue={payload?.name} {...register('name', { required: true })} />
            </DialogContent>
            <DialogActions>
                <Button color='error' variant='outlined' disabled={isLoading} onClick={() => onClose()}>Cancel</Button>
                <Button type='submit' variant='outlined' disabled={isLoading} endIcon={<Add />} >
                    {payload ? 'Edit' : 'Add'}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default AddDepartmentDialog