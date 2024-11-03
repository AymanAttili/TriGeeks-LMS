import { useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";

import { Button, Grid2 as Grid, InputLabel, Typography } from "@mui/material"
import { useNotifications } from "@toolpad/core";
import InputPassword from "../ui/InputPassword";

import { resetPassword } from "../services/apiAuth";

import logo from '../images/logo.jpg'

const ResetPassword = () => {
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();
    const notifications = useNotifications();
    const
        { register,
            handleSubmit,
            //  formState: { errors: formErrors }
        } = useForm();
    const [searchParams] = useSearchParams();


    let token = searchParams.get('token');
    token = token.replaceAll(' ', '+');
    const workId = searchParams.get('workId');

    const handleClickShowPassword = () => {
        setShowPassword((prev) => !prev);
    };

    const onReset = async ({ password }) => {
        console.log(workId, token, password);
        const response = await resetPassword(workId, token, password);

        if (response.ok) {
            notifications.show('Password updaed successfully ✅', {
                severity: 'success',
                autoHideDuration: 3000,
            });
            navigate('/login', { replace: true });
        }

        else {
            notifications.show('Something went wrong! 😕', {
                severity: 'error',
                autoHideDuration: 3000,
            });
        }
    }

    return (
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
                        <InputPassword id='password' size="small" showPassword={showPassword} handleClickShowPassword={handleClickShowPassword} register={register} />
                    </Grid>

                    <Grid size={{ xs: 12 }}>
                        <InputLabel htmlFor="confirmPassword" >
                            Confirm new Password
                        </InputLabel>
                        <InputPassword id='confirmPassword' size="small" showPassword={showPassword} handleClickShowPassword={handleClickShowPassword} register={register} />

                    </Grid>
                    {/* <FormHelperText error>{formErrors}</FormHelperText> */}
                </Grid>

                <Button variant="contained"
                    fullWidth
                    type='submit'
                >
                    Set new password
                </Button>
            </Grid>
        </Grid>
    )
}

export default ResetPassword