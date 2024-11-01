import VpnKey from "@mui/icons-material/VpnKey"
import VisibilityOff from "@mui/icons-material/VisibilityOff"
import Visibility from "@mui/icons-material/Visibility"
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { Button, Checkbox, FormControlLabel, Grid, IconButton, InputAdornment, Link, TextField, Typography } from "@mui/material"
import { useState } from "react"
import logo from '../../images/logo.jpg'
import Cookies from "js-cookie"

const LoginPage = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false)
    const [rememberUser, setRememberUser] = useState(false)
    const [error, setError] = useState('')
    const [credentials, setCredentials] = useState({ userId: '', password: '' });

    const handleLogin = async (e) => {
        e.preventDefault();
        const response = await fakeLoginService(credentials);
        if (response.success) {
            Cookies.set('authToken', response.token, {
                expires: rememberUser ? 365 : 30 / 1440,
                secure: true,
                sameSite: 'Strict',
            });
            navigate('/dashboard')
        }
    };

    const fakeLoginService = async (credentials) => {
        return new Promise((resolve, reject) => {
            if (credentials.userId === 'userId' && credentials.password === 'password') {
                resolve({
                    success: true,
                    token: JSON.stringify(credentials)
                });
            } else {
                setError('UserId or password are wrong.')
            }
        });
    };

    const handleClickShowPassword = () => {
        setShowPassword((prev) => !prev);
    };

    return (
        <Grid container alignItems={'center'} justifyContent={'center'} textAlign={'center'} sx={{
            height: {
                md: '100vh'
            }
        }} bgcolor='primary.main' className='LoginPage'>
            <Grid item xs={12} md={6} padding={'30px'} className='LogoHalf'>
                <div className='LogoContainer'>
                    <img src={logo} className='Logo' alt="Logo" />
                </div>
            </Grid>

            <Grid item container height={'100%'} xs={12} md={6} bgcolor='third.main' justifyContent={'center'}>

                <Grid component="form" onSubmit={handleLogin} item container md={9} sx={{
                    justifyContent: {
                        xs: 'flex-start',
                        md: 'center',
                    }
                }} flexDirection={'column'} gap={3} padding={'30px'}>
                    <Typography variant='h3' paddingBottom={5}>
                        Login
                    </Typography>
                    <Typography color='error'>
                        User Id: userId<br />
                        Password: password
                    </Typography>
                    <TextField id="userId" label="User ID" variant="outlined" required InputLabelProps={{ required: false }}
                        value={credentials.userId}
                        onChange={(e) => setCredentials({ ...credentials, userId: e.target.value })}
                    >
                    </TextField>

                    <Grid container flexDirection={'column'} gap={1}>
                        <TextField id="password" label="Password" variant="outlined" required InputLabelProps={{ required: false }} type={showPassword ? 'text' : 'password'}
                            value={credentials.password}
                            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                            InputProps={{
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
                            }} >
                        </TextField>
                        <FormControlLabel control={<Checkbox onChange={(e) => setRememberUser(e.target.checked)} />} label="Remember me." />
                        <Typography color={'error'} fontWeight={'bold'} fontSize={'small'} alignSelf={'flex-start'}>{error}</Typography>

                    </Grid>
                    <Button type={'submit'} variant="contained" color='secondary' startIcon={<VpnKey color='primary' />}>
                        <span color='primary'>Login</span>
                    </Button>
                    <Link
                        component={RouterLink}
                        to={'/forgotPassword'}
                        underline="none"
                    >
                        <Typography >FORGOT PASSWORD?</Typography>
                    </Link>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default LoginPage