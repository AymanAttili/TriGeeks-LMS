import { Add, AttachFile, Link } from '@mui/icons-material';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid2 as Grid, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import CloudUpload from '@mui/icons-material/CloudUpload';
import { useDispatchFiles } from '../../features/courses/useDispatchFiles';
import VisuallyHiddenInput from '../VisuallyHiddenInput';


function AddMaterialDialog({ payload, open, onClose }) {
    const { register, handleSubmit, watch, formState: { errors: formErrors } } = useForm();
    const { filesDispatch, isLoading, isError } = useDispatchFiles();

    const [materialType, setMaterialType] = useState(0)

    const handleAddMaterial = async (data) => {
        console.table(data)
        if (!data)
            return;


        if (!isError)
            onClose();
    }
    return (
        <Dialog component='form' onSubmit={handleSubmit(handleAddMaterial)} fullWidth maxWidth={'sm'} open={open} onClose={() => onClose()}>
            <Typography component={DialogTitle} variant='h5' color='primary.main' fontWeight={600} textAlign={'center'}>
                Add Material
            </Typography>
            <Grid component={DialogContent} container spacing={2} height={300} marginY={3}>
                <Grid container flexDirection={'column'} size={3} paddingRight={2} borderRight={2} borderColor={'primary.main'} paddingTop={2}>
                    <Button
                        variant={materialType === 0 ? 'outlined' : 'text'}
                        startIcon={<Link />}
                        onClick={() => setMaterialType(0)}>
                        Link
                    </Button>
                    <Button
                        variant={materialType === 1 ? 'outlined' : 'text'}
                        startIcon={<AttachFile />}
                        onClick={() => setMaterialType(1)}>
                        File
                    </Button>
                </Grid>
                <Grid container flexDirection={'column'} spacing={2} size={9} paddingTop={2}>
                    <TextField label="Material title" disabled={isLoading}
                        error={!!formErrors.title}
                        helperText={formErrors.title?.message}
                        {...register('title', { required: "Material Title is required", })}
                    />

                    {materialType === 0 && <TextField label="Link" disabled={isLoading}
                        fullWidth
                        error={!!formErrors.link}
                        helperText={formErrors.link?.message}
                        {...register('link', { required: "Link is required", })}
                    />
                    }

                    {materialType === 1 && <Grid container spacing={1} alignItems={'center'}>
                        <Button
                            component="label"
                            variant="contained"
                            tabIndex={-1}
                            startIcon={<AttachFile />}
                        >
                            Upload file
                            <VisuallyHiddenInput
                                type="file"
                                {...register('file', { required: "File is required", })}
                            />
                        </Button>
                        <Typography fontSize={14}>
                            {watch('file') ? watch('file')[0]?.name : formErrors.file ? formErrors.file?.message : ''}
                        </Typography>
                    </Grid>
                    }
                </Grid>
            </Grid>
            <DialogActions>
                <Button color='error' variant='outlined' disabled={isLoading} onClick={() => onClose()}>Cancel</Button>
                <Button type='submit' variant='outlined' disabled={isLoading} endIcon={<Add />} >
                    Add material
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default AddMaterialDialog; 
