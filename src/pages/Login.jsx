import { useEffect, useState } from "react"
import { Navigate, Link as RouterLink } from 'react-router-dom'
import { useForm } from "react-hook-form";
import VpnKey from "@mui/icons-material/VpnKey"
import VisibilityOff from "@mui/icons-material/VisibilityOff"
import Visibility from "@mui/icons-material/Visibility"
import { Box, Button, Checkbox, FormControlLabel, Grid2 as Grid, IconButton, InputAdornment, Link, TextField, Typography } from "@mui/material"

import logo from '../images/logo.jpg'
import { useAuth } from "../hooks/useAuth";
import { useNotifications } from "@toolpad/core";
import InputPassword from "../ui/InputPassword";

const Login = () => {
    const notifications = useNotifications()

    const { register, handleSubmit, formState: { errors: formErrors } } = useForm();

    const { loginUser, isAuthenticated, error: authError } = useAuth();
    const [showPassword, setShowPassword] = useState(false)


    const onLogin = async (data) => {
        loginUser(data)
    };


    const handleClickShowPassword = () => {
        setShowPassword((prev) => !prev);
    };



    useEffect(() => {
        if (authError) {
            var key = notifications.show(authError, {
                severity: 'error',
                autoHideDuration: 4000,
            })
        }
        return () => {
            notifications.close(key)
        }
    })

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

                <Grid component="form" onSubmit={handleSubmit(onLogin)} item container size={{ md: 9 }} sx={{
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

                    <Button type={'submit'} variant="contained" startIcon={<VpnKey />}>
                        <span color='primary'>Login</span>
                    </Button>
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