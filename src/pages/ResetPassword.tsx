import { useEffect } from 'react';
import { useState } from "react"
import { Link, Navigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";

import { Grid2 as Grid, IconButton, InputAdornment, InputLabel, TextField, Typography } from "@mui/material"

import { resetPasswordTokenValidation } from "../services/apiAuth";

import logo from '../images/logo.jpg'
import LoginIcon from '@mui/icons-material/Login'
import { useUser } from "../features/users/useUser";
import SpinnerLoader from '../ui/SpinnerLoader';
import LoadingButton from '@mui/lab/LoadingButton';
import { Key, Visibility, VisibilityOff } from '@mui/icons-material';
import { useResetPassword } from '../features/authentication/useResetPassword';

const ResetPassword = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [isValid, setIsValid] = useState(true);
    const [isChecking, setIsChecking] = useState(true);

    const { resetPassword, isLoading } = useResetPassword();

    const { isAuthenticated } = useUser();
    const
        { register,
            handleSubmit,
            watch,
            formState: { errors: formErrors }
        } = useForm();
    const [searchParams] = useSearchParams();


    let token = searchParams.get('token');
    token = token?.replaceAll(' ', '+');
    const workId = searchParams.get('workId');

    const handleClickShowPassword = () => {
        setShowPassword((prev) => !prev);
    };

    const onReset = async (data) => {
        if (!data)
            return

        await resetPassword({ workId, token, newPassword: data.newPassword })
    }
    useEffect(() => {
        async function ValidateToken(workId, token) {
            try {
                setIsValid(true);
                setIsChecking(true)
                const res = await resetPasswordTokenValidation(workId, token);
                setIsValid(res.data.isValid)
            }
            catch {
                setIsValid(false);
            }
            finally {
                setIsChecking(false);
            }
        }

        ValidateToken(workId, token);
    }, [])

    if (isAuthenticated || (!isChecking && !isValid))
        return <Navigate replace to='/' />

    if (isChecking)
        return <SpinnerLoader />

    return (
        <>
            <Link
                to="/"
            >
                <IconButton

                    style={{ position: 'absolute', top: 16, right: 16 }}
                    aria-label="go back"
                >
                    <LoginIcon />
                </IconButton>
            </Link>
            <Grid container flexDirection={'column'} justifyContent={'space-evenly'} alignItems={'center'} paddingBlockStart={5} bgcolor='main.secondary' height={'100dvh'}>
                <Grid className='LogoContainer' my={'0'} size={{ xs: 4, sm: 2.5, md: 2, lg: 1.5 }}>
                    <img src={logo} className='Logo' alt="Logo" />
                </Grid>

                <Grid container component="form" onSubmit={handleSubmit(onReset)} flexDirection={'column'} justifyContent={'center'} gap={3} boxShadow={1} size={{ xs: 11, sm: 8, md: 6, lg: 4 }} borderRadius={4} padding={3}>
                    <Typography variant='h5' fontWeight={'700'} textAlign={'center'} color='primary.main'>
                        Reset password
                    </Typography>

                    <Grid container gap={1}>

                        <Grid size={{ xs: 12 }}>
                            <InputLabel htmlFor="password" >
                                New password
                            </InputLabel>
                            <TextField id='password' margin='dense' fullWidth
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
                                    pattern: {
                                        value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                                        message:
                                            "Password must be at least 8 characters, include one letter, one number, and one special character",
                                    },
                                })}
                            />
                        </Grid>

                        <Grid size={{ xs: 12 }}>
                            <InputLabel htmlFor="confirmPassword" >
                                Confirm new Password
                            </InputLabel>

                            <TextField id='confirmPassword' margin='dense' fullWidth
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
                                    validate: (val) => val === watch('newPassword') || "New password and its confirm must be equal."
                                })}
                            />
                        </Grid>
                    </Grid>

                    <LoadingButton
                        type="submit"
                        disabled={isLoading}
                        fullWidth
                        variant="contained"
                        startIcon={<Key />}
                        aria-label="Login"
                        loading={isLoading}
                        loadingPosition="start"
                    >
                        Set new password
                    </LoadingButton>

                </Grid>
            </Grid>
        </>
    )
}

export default ResetPassword