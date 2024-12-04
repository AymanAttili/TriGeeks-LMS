import KeyIcon from "@mui/icons-material/Key";
import LoadingButton from "@mui/lab/LoadingButton";
import { useState } from "react"
import { Navigate, Link as RouterLink } from 'react-router-dom'
import { useForm } from "react-hook-form";

import { Box, Checkbox, FormControlLabel, Grid2 as Grid, Link, TextField, Typography } from "@mui/material"

import InputPassword from "../ui/InputPassword";
import { useLogin } from "../features/authentication/useLogin";

import logo from '../images/logo.jpg'
import { useUser } from "../features/users/useUser";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false)

    const { register, handleSubmit, formState: { errors: formErrors, isValid } } = useForm();
    const { isAuthenticated } = useUser();
    const { login, isLoading } = useLogin();

    const handleClickShowPassword = () => {
        setShowPassword((prev) => !prev);
    };

    const onLogin = async (data) => {
        await login(data)
    };

    if (isAuthenticated) {
        return <Navigate replace to="/" />
    }

    return (
        <Grid container justifyContent={'space-between'} textAlign={'center'} sx={{
            height: {
                md: '100vh'
            }
        }} bgcolor='primary.main' className='LoginPage'>
            <Grid container size={{ xs: 12, md: 6 }} padding={'30px'} className='LogoHalf'>
                <Grid size={{ xs: 4, sm: 3, md: 6 }} className='LogoContainer'>
                    <img src={logo} className='Logo' alt="Logo" />
                </Grid>
            </Grid>

            <Grid container height={'100%'} size={{ xs: 12, md: 6 }}
                bgcolor='white'
                justifyContent={'center'}>

                <Grid component="form" onSubmit={handleSubmit(onLogin)} container size={{ md: 9 }} sx={{
                    justifyContent: {
                        xs: 'flex-start',
                        md: 'center',
                    }
                }} flexDirection={'column'} gap={3} padding={'30px'}>
                    <Typography variant='h3' paddingBottom={5}>
                        Login
                    </Typography>
                    <Box >
                        <TextField id="workId" fullWidth label="Work ID" variant="outlined"
                            {...register('workId', { required: true })}
                        >
                        </TextField>
                        {formErrors.workId && <Typography mt={1} fontSize={12} textAlign={'left'} color="error">*Work id is required</Typography>}
                    </Box>
                    <Grid container flexDirection={'column'} gap={1}>
                        <InputPassword id="password" label="Password" showPassword={showPassword} register={register} handleClickShowPassword={handleClickShowPassword} />

                        {formErrors.password && <Typography fontSize={12} textAlign={'left'} color="error">*Password is required</Typography>}
                        <FormControlLabel control={<Checkbox
                            {...register('rememberUser')}
                        />} label="Remember me." />
                    </Grid>

                    <LoadingButton
                        type="submit"
                        disabled={isLoading || !isValid}
                        fullWidth
                        variant="contained"
                        startIcon={<KeyIcon />}
                        aria-label="Login"
                        loading={isLoading}
                        loadingPosition="start"
                    >
                        Log In
                    </LoadingButton>
                    <Link
                        component={RouterLink}
                        to={'/forgot-password'}
                        underline="none"
                    >
                        <Typography >FORGOT PASSWORD?</Typography>
                    </Link>
                </Grid>
            </Grid>
        </Grid >
    )
}

export default Login