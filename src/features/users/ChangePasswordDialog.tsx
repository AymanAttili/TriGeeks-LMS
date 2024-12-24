import { Edit, Visibility, VisibilityOff } from '@mui/icons-material';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, InputAdornment, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useDispatchUsers } from '../../features/users/useDispatchUsers';
import LoadingButton from '@mui/lab/LoadingButton';

function ChangePasswordDialog({ payload, open, onClose }) {
    const [showPassword, setShowPassword] = useState(false)

    const { register, handleSubmit, watch, formState: { errors: formErrors, isLoading } } = useForm();
    const currentPassword = watch('currentPassword')
    const newPassword = watch('newPassword')

    const { usersDispatch, isError, isLoading: dispatchingUser } = useDispatchUsers();


    const handleAddDep = async (data) => {
        if (!data)
            return;

        await usersDispatch({ action: 'changePassword', payload: { currentPassword: data.currentPassword, newPassword: data.newPassword } })

        if (!isError)
            return onClose();
    }

    const handleClickShowPassword = () => {
        setShowPassword(val => !val)
    }

    return (
        <Dialog component='form' onSubmit={handleSubmit(handleAddDep)} fullWidth maxWidth={'xs'} open={open} onClose={() => onClose()}>
            <DialogTitle>
                Change Password
            </DialogTitle>
            <DialogContent>
                <TextField label="Current password" margin='dense' fullWidth
                    type={showPassword ? 'text' : 'password'}
                    disabled={isLoading}
                    error={!!formErrors.currentPassword}
                    helperText={formErrors.currentPassword?.message}
                    slotProps={{
                        input: {
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={handleClickShowPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }
                    }}
                    {...register('currentPassword', { required: "Current password is required", })}
                />

                <TextField label="New password" margin='dense' fullWidth
                    type={showPassword ? 'text' : 'password'}
                    disabled={isLoading}
                    error={!!formErrors.newPassword}
                    helperText={formErrors.newPassword?.message}
                    slotProps={{
                        input: {
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={handleClickShowPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }
                    }}
                    {...register('newPassword', {
                        required: "New password is required",
                        validate: (val) => val !== currentPassword || "New paassword must be different than old one.",
                        pattern: {
                            value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                            message:
                                "Password must be at least 8 characters, include one letter, one number, and one special character",
                        },
                    })}
                />

                <TextField label="Confirm new password" margin='dense' fullWidth
                    type={showPassword ? 'text' : 'password'}
                    disabled={isLoading}
                    error={!!formErrors.confrimNewPassword}
                    helperText={formErrors.confrimNewPassword?.message}
                    slotProps={{
                        input: {
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={handleClickShowPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }
                    }}
                    {...register('confrimNewPassword', {
                        required: "Confirm new password is required",
                        validate: (val) => val === newPassword || "New password and its confirm must be equal."
                    })}
                />
            </DialogContent>
            <DialogActions>
                <Button color='error' variant='outlined' disabled={isLoading || dispatchingUser} onClick={() => onClose()}>Cancel</Button>
                <LoadingButton type='submit' variant='outlined' loading={dispatchingUser} disabled={isLoading || dispatchingUser} loadingPosition='end' endIcon={<Edit />} >
                    Change
                </LoadingButton>
            </DialogActions>
        </Dialog>
    );
}

export default ChangePasswordDialog