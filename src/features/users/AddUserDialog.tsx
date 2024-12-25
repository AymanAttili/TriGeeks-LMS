import { Box, Chip, Dialog, DialogContent, DialogTitle, Grid2 as Grid, MenuItem, TextField, Typography } from '@mui/material';
import { MuiTelInput } from 'mui-tel-input'
import { Controller, useForm } from 'react-hook-form';
import AddUserDialogStepper from './Admin/AddUserDialogStepper';
import { useState } from 'react';
import { levels } from '../../Enums/educationLevels';
import { roles } from '../../Enums/roles';
import { useMajors } from '../majors/useMajors';
import { useDepartments } from '../departments/useDepartments';
import { useDispatchUsers } from './useDispatchUsers';
import { gender } from '../../Enums/gender';
import SpinnerLoader from '../../ui/SpinnerLoader';

function AddUserDialog({ payload, open, onClose }) {
    const { usersDispatch, isError, isLoading: dispatchingUser } = useDispatchUsers();
    const { register, handleSubmit, watch, control, formState: { isLoading, isValid, isValidating, errors: formErrors } } = useForm();
    const [activeStep, setActiveStep] = useState(0);
    const { majors, isLoading: fetchingMajors } = useMajors(watch('departmentId'))
    const { departments, isLoading: fetchingDeps } = useDepartments();

    const user = payload?.user

    const handleAddUser = async (data) => {
        if (!isValid)
            return;

        if (user)
            await usersDispatch({ action: 'edit', payload: { id: user.id, user: data } }).then(() => onClose());

        else
            await usersDispatch({ action: 'add', payload: { user: data } }).then(() => onClose());
    }


    return (
        <Dialog component='form' onSubmit={handleSubmit(handleAddUser)} fullWidth maxWidth={'sm'} open={open} onClose={() => onClose()}>
            <DialogTitle>
                {payload ? 'Edit ' : 'Add new '}
                user
            </DialogTitle>
            <DialogContent>
                <AddUserDialogStepper activeStep={activeStep} setActiveStep={setActiveStep} isValid={isValid} isEdit={!!user} isLoading={dispatchingUser || isValidating}>
                    <Box display={activeStep === 0 ? 'box' : 'none'} sx={{ justifySelf: 'start' }}>
                        <Typography variant='h5' mt={3} mb={1} >
                            User Information
                        </Typography>
                        <Grid container spacing={1} >
                            <TextField label="Work ID" margin='normal' disabled={isLoading}
                                error={!!formErrors.workId}
                                helperText={formErrors.workId?.message}
                                {...register('workId', { required: "Work ID is required", })}
                                defaultValue={user?.workId}
                            />

                            <Grid container spacing={1}>
                                <TextField label="First name" margin='normal' disabled={isLoading}
                                    error={!!formErrors.firstName}
                                    helperText={formErrors.firstName?.message}
                                    {...register('firstName', { required: "First name is required", })}
                                    defaultValue={user?.firstName}
                                />

                                <TextField label="Middle name" margin='normal' disabled={isLoading}
                                    error={!!formErrors.middleName}
                                    helperText={formErrors.middleName?.message}
                                    {...register('middleName', { required: "Middle name is required", })}
                                    defaultValue={user?.middleName}
                                />

                                <TextField label="Last name" margin='normal' disabled={isLoading}
                                    error={!!formErrors.lastName}
                                    helperText={formErrors.lastName?.message}
                                    {...register('lastName', { required: "Last name is required", })}
                                    defaultValue={user?.lastName}
                                />
                            </Grid>
                            <Grid container spacing={1} size={12}>
                                <TextField component={Grid} select label="Gender" margin='normal' disabled={isLoading}
                                    error={!!formErrors.gender}
                                    helperText={formErrors.gender?.message}
                                    {...register('gender', { required: "Gender is required", })}
                                    sx={{
                                        minWidth: '160px'
                                    }}
                                    defaultValue={user?.gender}

                                >
                                    {gender.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <TextField label="Birthdate" margin='normal' disabled={isLoading}
                                    type='date'
                                    slotProps={{ inputLabel: { shrink: true } }}
                                    error={!!formErrors.birthDate}
                                    helperText={formErrors.birthDate?.message}
                                    {...register('birthDate', { required: "Birthdate is required", })}
                                    sx={{
                                        minWidth: '160px'
                                    }}
                                    defaultValue={user?.birthDate}
                                />
                                <TextField select label="Educational level" margin='normal' disabled={isLoading}
                                    error={!!formErrors.educationalLevel}
                                    helperText={formErrors.educationalLevel?.message}
                                    {...register('educationalLevel', { required: "Educational level is required", })}
                                    sx={{
                                        minWidth: '200px'
                                    }}
                                    defaultValue={user?.educationalLevel}
                                >
                                    {levels.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                        </Grid>
                    </Box>
                    <Box display={activeStep === 1 ? 'box' : 'none'}>
                        <Typography variant='h5' mt={3} mb={1} >
                            Contact Information
                        </Typography>
                        <Grid container flexDirection={'column'} spacing={1} >
                            <TextField label="Email address" margin='normal' disabled={isLoading}
                                error={!!formErrors.email}
                                helperText={formErrors.email?.message}
                                {...register('email', {
                                    required: "Email address is required",
                                    pattern: {
                                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                        message: "Invalid email address",
                                    }
                                })}
                                sx={{
                                    width: {
                                        xs: '100%',
                                        sm: '50%'
                                    }
                                }}
                                defaultValue={user?.email}
                            />

                            <Controller
                                name="phoneNumber"
                                control={control}
                                rules={{
                                    required: "Phone number is required",
                                    pattern: {
                                        value: /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{3}[-\s.]?[0-9]{3,6}$/,
                                        message: "Invalid phone number format",
                                    },
                                }}
                                defaultValue={user?.phoneNumber}
                                render={({ field }) => (
                                    <MuiTelInput
                                        {...field}
                                        defaultCountry="US"  // Example prop for MUITelInput
                                        onChange={(value) => field.onChange(value)} // Update form state
                                        error={!!formErrors.phoneNumber} // Show error styling
                                        helperText={formErrors.phoneNumber?.message}
                                        sx={{
                                            width: {
                                                xs: '100%',
                                                sm: '50%'
                                            }
                                        }}
                                    />
                                )} />
                        </Grid>
                    </Box>
                    <Box display={activeStep === 2 ? 'box' : 'none'}>
                        <Typography variant='h5' mt={3} mb={1} >
                            Job Information
                        </Typography>
                        <Grid container flexDirection={'column'} spacing={1}>
                            {
                                !user &&
                                <TextField select label="Role" margin='normal' disabled={isLoading}
                                    error={!!formErrors.role}
                                    helperText={formErrors.role?.message}
                                    {...register('role', { required: "Role is required", })}
                                    sx={{
                                        maxWidth: '200px'
                                    }}
                                >
                                    {roles.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            }

                            <Grid container>
                                {
                                    !fetchingDeps &&
                                    <TextField select label="Department" margin='normal' disabled={isLoading || fetchingDeps}
                                        error={!!formErrors.departmentId}
                                        helperText={formErrors.departmentId?.message}
                                        {...register('departmentId', { required: "Department is required", })}
                                        sx={{
                                            minWidth: '200px'
                                        }}
                                        defaultValue={user?.department?.id}
                                    >
                                        {departments?.map((option) => (
                                            <MenuItem key={option.id} value={option.id}>
                                                {option.name}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                }

                                {
                                    (!fetchingMajors && !fetchingDeps) &&
                                    <TextField select label="Major" margin='normal'
                                        error={!!formErrors.majorId}
                                        helperText={formErrors.majorId?.message}
                                        {...register('majorId', { required: "Major is required", })}
                                        sx={{
                                            minWidth: '200px',
                                        }}
                                        defaultValue={user?.major?.id}
                                    >
                                        {majors?.map((option) => (
                                            <MenuItem key={option.id} value={option.id}>
                                                {option.name}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                }

                            </Grid>
                        </Grid>
                    </Box>
                    <Box display={activeStep === 3 ? 'box' : 'none'}>
                        <Grid container flexDirection={'column'} size={12} spacing={1} mt={3}>
                            <Grid container>
                                <Typography variant='h5'>
                                    Validation status:
                                </Typography>
                                <Typography variant='h5' color={
                                    isValid
                                        ? 'success'
                                        : isValidating
                                            ? 'warning'
                                            : 'error'
                                }>
                                    {
                                        isValid
                                            ? ' Done'
                                            : isValidating
                                                ? ' Validating...'
                                                : ' Invalid'
                                    }
                                </Typography>
                            </Grid>
                            {
                                formErrors && !isValid
                                    ? <Grid container spacing={2}>
                                        {
                                            Object.keys(formErrors).map((key, ind) =>
                                                <Chip key={ind} color='error' size='small' label={`${formErrors[key].message}`} sx={{ fontSize: 14 }} />
                                            )
                                        }
                                    </Grid>
                                    : <p>
                                        All validations Succeeded
                                    </p>
                            }
                        </Grid>
                    </Box>
                </AddUserDialogStepper>
            </DialogContent>
        </Dialog >
    );
}

export default AddUserDialog