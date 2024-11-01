import { Button, FormHelperText, Grid, IconButton, TextField, Typography } from '@mui/material'
import logo from '../../images/logo.jpg'
import LoginIcon from '@mui/icons-material/Login'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { DialogsProvider, useDialogs } from '@toolpad/core/useDialogs';


const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const dialogs = useDialogs();
    const navigate = useNavigate();
    const handleSending = async () => {
        const confirmed = await dialogs.confirm('The Reset Link has been sent successfully to your e-mail✅!', {
            okText: `I didn't recieve the link.`,
            cancelText: `Recieved`,
            title: 'Link sent'
        });
        if (confirmed) {
            await dialogs.alert("The link has been sent again✅!", {
                title: 'Link sent'
            });

        }
        navigate('/')
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
            <Grid container flexDirection={'column'} alignItems={'center'} justifyContent={'flex-start'} gap={6} paddingBlockStart={5} bgcolor='main.secondary' minHeight={'100vh'}>
                <Grid item component='div' className='LogoContainer' xs={4} sm={2.5} md={2} lg={1.5}>
                    <img src={logo} className='Logo' alt="Logo" />
                </Grid>

                <Grid item container component="form" flexDirection={'column'} justifyContent={'center'} gap={3} bgcolor='secondary.secondary' xs={11} sm={8} md={6} lg={4} borderRadius={4} padding={3}>
                    <Typography variant='h5' fontWeight={'700'} textAlign={'center'}>
                        Reset password
                    </Typography>

                    <Grid container >
                        <label htmlFor="email" sx={{ color: 'primary.main' }}>
                            Email
                        </label>
                        <TextField id='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type='email'
                            aria-describedby="email-helper-text"
                            size='small'
                            fullWidth
                            required
                        ></TextField>
                        <FormHelperText id="email-helper-text" >
                            Use your registered email to receive the link to reset your password.
                        </FormHelperText>
                    </Grid>

                    <Button variant="contained" fullWidth
                        onClick={handleSending}
                    >Send link</Button>
                </Grid>
            </Grid>
        </>
    )
}

export default ForgotPassword