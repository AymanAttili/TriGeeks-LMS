import { Add, AttachFile, Link } from '@mui/icons-material';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormHelperText, Grid2 as Grid, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import VisuallyHiddenInput from '../../ui/VisuallyHiddenInput';
import LoadingButton from '@mui/lab/LoadingButton';
import { useDispatchCourse } from './useDispatchCourse';
import { useDialogs } from '@toolpad/core';
import { cleanFormData, trimFormInputStart } from '../../utils/helpers';


function AddMaterialDialog({ payload, open, onClose }) {
    const { register, handleSubmit, setValue, watch, formState: { errors: formErrors, isLoading } } = useForm();
    const { courseDispatch, isLoading: dispatchingCourse } = useDispatchCourse();

    const dialogs = useDialogs();

    const [type, setMaterialType] = useState(payload?.sectionPart?.materialType || 2)

    const handleAddMaterial = async (data) => {
        data = cleanFormData(data)
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

            else if (data.file.length > 0) {
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

    useEffect(() => {
        const handleFileChange = () => {
            const file = watch('file') && watch('file')[0];
            if (file) {
                // Define accepted file extensions
                const acceptedExtensions = [
                    '.html', '.htm', '.txt', '.css', '.js', '.json', '.xml', '.md',
                    '.jpg', '.jpeg', '.png', '.gif', '.bmp', '.svg', '.webp', '.tiff',
                    '.tif', '.mp3', '.ogg', '.wav', '.mp4', '.webm', '.avi', '.mov',
                    '.flv', '.pdf', '.docx', '.xlsx', '.pptx', '.odt', '.doc', '.xls',
                    '.ppt', '.epub', '.mobi', '.csv', '.xml', '.zip', '.rar', '.tar',
                    '.tar.gz', '.tgz', '.7z', '.gz', '.xz', '.woff', '.woff2', '.ttf',
                    '.otf', '.log', '.swf'
                ];

                // Check if the file extension is allowed
                const fileExtension = file.name.toLowerCase().split('.').pop();
                if (!acceptedExtensions.includes(`.${fileExtension}`)) {
                    dialogs.alert('Unsupported file extension!')
                    setValue('file', null); // Clear the file input
                }
            }
        };


        handleFileChange();
    }, [watch('file'), setValue])

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
                        onChange={(e) => trimFormInputStart(e, setValue)}

                    />

                    {type === 2 && <TextField label="Link" disabled={isLoading}
                        fullWidth
                        error={!!formErrors.link}
                        helperText={formErrors.link?.message}
                        defaultValue={payload.sectionPart?.link}
                        {...register('link', { required: "Link is required", })}
                        onChange={(e) => trimFormInputStart(e, setValue)}

                    />
                    }

                    {type === 1 &&
                        <Grid container flexDirection={'column'} spacing={1} alignItems={'center'}>
                            <Grid container size={12}>
                                <Button
                                    component="label"
                                    variant="contained"
                                    tabIndex={-1}
                                    startIcon={<AttachFile />}
                                >
                                    Select file
                                    <VisuallyHiddenInput
                                        accept=".html, .htm, .txt, .css, .js, .json, .xml, .md, .jpg, .jpeg, .png, .gif, .bmp, .svg, .webp, .tiff, .tif, .mp3, .ogg, .wav, .mp4, .webm, .avi, .mov, .flv, .pdf, .docx, .xlsx, .pptx, .odt, .doc, .xls, .ppt, .epub, .mobi, .csv, .xml, .zip, .rar, .tar, .tar.gz, .tgz, .7z, .gz, .xz, .woff, .woff2, .ttf, .otf, .log, .swf"
                                        type="file"
                                        {...register('file', (payload.sectionPart?.materialType === 1 ? {} : { required: "File is required", }))}
                                    />
                                </Button>
                                <Typography fontSize={14}>
                                    {watch('file')?.length > 0 ? watch('file')[0]?.name : formErrors.file ? formErrors.file?.message : payload.sectionPart?.file?.name}
                                </Typography>
                            </Grid>
                            <Grid container size={12}>
                                <Typography>
                                    Supported file extensions:
                                </Typography>
                                <FormHelperText>
                                    Text and HTML Files: (.html, .htm, .txt, .css, .js, .json, .xml, .md).
                                </FormHelperText>
                                <FormHelperText>
                                    Images:  (.jpg, .jpeg, .png, .gif, .bmp, .svg, .webp, .tiff, .tif).
                                </FormHelperText>
                                <FormHelperText>
                                    Audio and Video: (.mp3, .ogg, .wav, .mp4, .webm, .avi, .mov, .flv).
                                </FormHelperText>
                                <FormHelperText>
                                    Documents: (.pdf, .docx, .xlsx, .pptx, .odt, .doc, .xls, .ppt, .epub, .mobi, .csv, .xml).
                                </FormHelperText>
                                <FormHelperText>
                                    Archive Files: (.zip, .rar, .tar, .tar.gz, .tgz, .7z, .gz, .xz).
                                </FormHelperText>
                            </Grid>
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
