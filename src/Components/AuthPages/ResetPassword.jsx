import { Button, FormHelperText, Grid, IconButton, InputAdornment, TextField, Typography } from "@mui/material"
import logo from '../../images/logo.jpg'
import { useState } from "react"
import { Link } from "react-router-dom";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";

const ResetPassword = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [helperText, setHelperText] = useState('Helper Text')

    const handleClickShowPassword = () => {
        setShowPassword((prev) => !prev);
    };

    const handleForm = (e) => {
        console.log(0);
    }
    return (
        <Grid container flexDirection={'column'} alignItems={'center'} justifyContent={'flex-start'} gap={6} paddingBlockStart={5} bgcolor='main.secondary' minHeight={'100vh'}>
            <Grid item component='div' className='LogoContainer' xs={4} sm={2.5} md={2} lg={1.5}>
                <img src={logo} className='Logo' alt="Logo" />
            </Grid>

            <Grid item container component="form" flexDirection={'column'} justifyContent={'center'} gap={3} bgcolor='secondary.secondary' xs={11} sm={8} md={6} lg={4} borderRadius={4} padding={3}>
                <Typography variant='h5' fontWeight={'700'} textAlign={'center'}>
                    Reset password
                </Typography>

                <Grid item container gap={1}>

                    <Grid item container>
                        <label htmlFor="password" sx={{ color: 'primary.main' }}>
                            New password
                        </label>
                        <TextField id='password'
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            size='small'
                            autoComplete="new-password"
                            fullWidth
                            required
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
                    </Grid>

                    <Grid item container>
                        <label htmlFor="confirmPassword" sx={{ color: 'primary.main' }}>
                            Confirm new Password
                        </label>
                        <TextField id='confirmPassword'
                            type={showPassword ? 'text' : 'password'}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            size='small'
                            autoComplete="new-password"
                            fullWidth
                            required
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
                    </Grid>
                    <FormHelperText error>{helperText}</FormHelperText>
                </Grid>

                <Button to='/' component={Link} variant="contained"
                    fullWidth
                    onClick={handleForm}
                    type='submit'
                >
                    Set new password
                </Button>
            </Grid>
        </Grid>
    )
}

export default ResetPassword