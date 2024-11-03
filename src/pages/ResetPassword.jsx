import { Button, FormHelperText, Grid2 as Grid, InputLabel, Typography } from "@mui/material"
import logo from '../images/logo.jpg'
import { useState } from "react"
import { Link } from "react-router-dom";
import InputPassword from "../ui/InputPassword";
import { useForm } from "react-hook-form";

const ResetPassword = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { register, handleSubmit, formState: { errors: formErrors } } = useForm();


    const handleClickShowPassword = () => {
        setShowPassword((prev) => !prev);
    };

    const onReset = (data) => {
        console.log(data);
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
                        <InputPassword id='password' showPassword={showPassword} handleClickShowPassword={handleClickShowPassword} register={register} />
                    </Grid>

                    <Grid size={{ xs: 12 }}>
                        <InputLabel htmlFor="confirmPassword" >
                            Confirm new Password
                        </InputLabel>
                        <InputPassword id='confirmPassword' showPassword={showPassword} handleClickShowPassword={handleClickShowPassword} register={register} />

                    </Grid>
                    {/* <FormHelperText error>{formErrors}</FormHelperText> */}
                </Grid>

                <Button to='/' component={Link} variant="contained"
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