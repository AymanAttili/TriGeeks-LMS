import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'

import { Button, FormHelperText, Grid2 as Grid, IconButton, InputLabel, TextField, Typography } from '@mui/material'
import { useNotifications } from '@toolpad/core'
import LoginIcon from '@mui/icons-material/Login'
import { useDialogs } from '@toolpad/core/useDialogs';

import { forgotPassword } from '../services/apiAuth'

import logo from '../images/logo.jpg'


const ForgotPassword = () => {
    const notifications = useNotifications();

    const {
        register,
        handleSubmit,
        // formState: { errors: formErrors }
    } = useForm();
    const dialogs = useDialogs();
    const navigate = useNavigate();

    const onSending = async ({ workId }) => {
        const response = await forgotPassword(workId);

        if (response.ok) {
            const confirmed = await dialogs.confirm('The Reset Link has been sent successfully to your e-mail✅!', {
                okText: `I didn't recieve the link.`,
                cancelText: `Recieved`,
                title: 'Link sent'
            });
            if (confirmed) {
                notifications.show('Please verify if the work ID is correct', {
                    severity: 'warning',
                    autoHideDuration: 3000,
                });
                return;
            }
            navigate('/login')
        }
        else {
            notifications.show('Please verify if the work ID is correct', {
                severity: 'warning',
                autoHideDuration: 3000,
            });
        }
    }


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

                <Grid container component="form" onSubmit={handleSubmit(onSending)} flexDirection={'column'} justifyContent={'center'} gap={3} boxShadow={1} size={{ xs: 11, sm: 8, md: 6, lg: 4 }} borderRadius={4} padding={3}>
                    <Typography variant='h5' fontWeight={'700'} textAlign={'center'} color='primary.main'>
                        Reset password
                    </Typography>
                    <Grid container gap={1}>
                        <Grid container >
                            <InputLabel htmlFor="id">
                                Work Id
                            </InputLabel>
                            <TextField id='id'
                                {...register('workId', { required: true })}
                                type='text'
                                aria-describedby="id-helper-text"
                                size='small'
                                fullWidth
                            ></TextField>
                            <FormHelperText id="id-helper-text" >
                                Use your registered workId to receive the link to reset your password.
                            </FormHelperText>
                        </Grid>

                        <Button type='submit' variant="contained" fullWidth
                        >Send link</Button>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}

export default ForgotPassword