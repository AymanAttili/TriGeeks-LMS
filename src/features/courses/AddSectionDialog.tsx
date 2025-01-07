import { Add, Edit } from '@mui/icons-material';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useDispatchCourse } from './useDispatchCourse';
import LoadingButton from '@mui/lab/LoadingButton';
import { cleanFormData, trimFormInputStart } from '../../utils/helpers';

function AddSectionDialog({ payload, open, onClose }) {
    const { register, handleSubmit, setValue, formState: { isLoading, errors: formErrors } } = useForm();

    const { courseDispatch, isLoading: dispatchingCourse } = useDispatchCourse();

    const handleAddSection = async (data) => {
        data = cleanFormData(data)
        if (!data)
            return;

        if (payload.section)
            await courseDispatch({
                action: 'editSection', payload: { courseId: payload.courseId, sectionId: payload.section.id, data: { title: data.sectionName } }
            }).then(() => onClose());
        else
            await courseDispatch({
                action: 'addSection', payload: { courseId: payload.courseId, data: { title: data.sectionName } }
            }).then(() => onClose());

    }
    return (
        <Dialog component='form' onSubmit={handleSubmit(handleAddSection)} fullWidth maxWidth={'sm'} open={open} onClose={() => onClose()}>
            <DialogTitle>
                {
                    payload.section ? 'Edit ' : 'Add new '
                }
                course section
            </DialogTitle>
            <DialogContent>
                <TextField label="Section name" margin='dense' fullWidth
                    disabled={isLoading || dispatchingCourse}
                    error={!!formErrors.sectionName}
                    helperText={formErrors.sectionName?.message}
                    defaultValue={payload.section?.title}
                    {...register('sectionName', { required: "Section Name is required", })}
                    onChange={(e) => trimFormInputStart(e, setValue)}

                />
            </DialogContent>
            <DialogActions>
                <Button color='error' variant='outlined' disabled={isLoading || dispatchingCourse} onClick={() => onClose()}>Cancel</Button>
                <LoadingButton type='submit' variant='outlined' loading={dispatchingCourse} loadingPosition='end' disabled={isLoading || dispatchingCourse} endIcon={payload.section ? <Edit /> : <Add />} >
                    {
                        payload.section ? 'Edit' : 'Add'
                    }
                </LoadingButton>
            </DialogActions>
        </Dialog >
    );
}

export default AddSectionDialog