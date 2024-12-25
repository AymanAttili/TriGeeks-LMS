import { Add, AttachFile, Link } from '@mui/icons-material';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid2 as Grid, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import VisuallyHiddenInput from '../../ui/VisuallyHiddenInput';
import LoadingButton from '@mui/lab/LoadingButton';
import { useDispatchCourse } from './useDispatchCourse';


function AddMaterialDialog({ payload, open, onClose }) {
    const { register, handleSubmit, watch, formState: { errors: formErrors, isLoading } } = useForm();
    const { courseDispatch, isLoading: dispatchingCourse } = useDispatchCourse();


    const [type, setMaterialType] = useState(payload?.sectionPart?.materialType || 2)

    const handleAddMaterial = async (data) => {
        if (!data)
            return;
        const materialType = type === 1 ? 'File' : 'Link'

        if (payload.sectionPart) {
            let newPayload = {
                sectionId: payload.sectionPart.sectionId,
                sectionPartId: payload.sectionPart.id,
                data: {
                    title: data.title,
                    materialType,
                }
            }
            if (materialType === 'Link')
                newPayload = {
                    ...newPayload,
                    data: {
                        ...(newPayload.data),
                        link: data.link
                    }
                }

            else if (payload.sectionPart.materialType === '1', data.file > 0) {
                newPayload = {
                    ...newPayload,
                    data: {
                        ...(newPayload.data),
                        file: data.file[0]
                    }
                }
            }
            await courseDispatch({
                action: 'editSectionPart', payload: newPayload
            }
            ).then(() => onClose());
        }

        else
            await courseDispatch({
                action: 'addSectionPart', payload: {
                    sectionId: payload.sectionId,
                    data: {
                        title: data.title,
                        materialType,
                        link: data.link,
                        file: data.file ? data.file[0] : ''
                    }
                }
            }).then(() => onClose());
    }



    return (
        <Dialog component='form' onSubmit={handleSubmit(handleAddMaterial)} fullWidth maxWidth={'sm'} open={open} onClose={() => onClose()}>
            <Typography component={DialogTitle} variant='h5' color='primary.main' fontWeight={600} textAlign={'center'}>
                {
                    payload.sectionPart ? 'Edit ' : 'Add '
                }
                Material
            </Typography>
            <Grid component={DialogContent} container spacing={2} height={300} marginY={3}>
                <Grid container flexDirection={'column'} size={3} paddingRight={2} borderRight={2} borderColor={'primary.main'} paddingTop={2}>
                    <Button
                        variant={type === 2 ? 'outlined' : 'text'}
                        startIcon={<Link />}
                        onClick={() => setMaterialType(2)}>
                        Link
                    </Button>
                    <Button
                        variant={type === 1 ? 'outlined' : 'text'}
                        startIcon={<AttachFile />}
                        onClick={() => setMaterialType(1)}>
                        File
                    </Button>
                </Grid>
                <Grid container flexDirection={'column'} spacing={2} size={9} paddingTop={2}>
                    <TextField label="Material title" disabled={isLoading}
                        error={!!formErrors.title}
                        helperText={formErrors.title?.message}
                        defaultValue={payload.sectionPart?.title}
                        {...register('title', { required: "Material Title is required", })}
                    />

                    {type === 2 && <TextField label="Link" disabled={isLoading}
                        fullWidth
                        error={!!formErrors.link}
                        helperText={formErrors.link?.message}
                        defaultValue={payload.sectionPart?.link}
                        {...register('link', { required: "Link is required", })}
                    />
                    }

                    {type === 1 && <Grid container spacing={1} alignItems={'center'}>
                        <Button
                            component="label"
                            variant="contained"
                            tabIndex={-1}
                            startIcon={<AttachFile />}
                        >
                            Upload file
                            <VisuallyHiddenInput
                                type="file"
                                {...register('file', (payload.sectionPart?.materialType === 1 ? {} : { required: "File is required", }))}
                            />
                        </Button>
                        <Typography fontSize={14}>
                            {watch('file')?.length > 0 ? watch('file')[0]?.name : formErrors.file ? formErrors.file?.message : payload.sectionPart?.file?.name}
                        </Typography>
                    </Grid>
                    }
                </Grid>
            </Grid>
            <DialogActions>
                <Button color='error' variant='outlined' disabled={isLoading || dispatchingCourse} onClick={() => onClose()}>Cancel</Button>
                <LoadingButton type='submit' variant='outlined' loading={dispatchingCourse} disabled={isLoading || dispatchingCourse} loadingPosition='end' endIcon={<Add />} >
                    {
                        payload.sectionPart ? 'Edit ' : 'Add '
                    }
                    material
                </LoadingButton>
            </DialogActions>
        </Dialog>
    );
}

export default AddMaterialDialog; 
