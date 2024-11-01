import { AppProvider } from '@toolpad/core/AppProvider'
import { DashboardLayout } from '@toolpad/core/DashboardLayout'
import { Outlet, useNavigate } from 'react-router-dom'
import logo from '../../../images/logo.jpg'
import { navigation } from '../../../helpers/navigation'
import { useEffect, useMemo, useState } from 'react'
import Cookies from 'js-cookie'
import { theme } from '../../../helpers/theme'
import { responsiveFontSizes, Typography } from '@mui/material'

const DashboardLayoutWrapper = () => {
    const lightTheme = responsiveFontSizes(theme());
    const [pathname, setPathname] = useState('/page');
    const navigate = useNavigate();
    const [session, setSession] = useState({});
    const router = useMemo(() => {
        return {
            pathname,
            searchParams: new URLSearchParams(),
            navigate: (path) => {
                navigate(path)
                setPathname(String(path));
            },
        };
    }, [pathname, navigate]);
    useEffect(() => {
        var token = Cookies.get('authToken');
        token = JSON.parse(token)
        setSession({
            user: {
                name: token.userId,
                image: 'https://avatars.githubusercontent.com/u/19550456',
            }
        })
    }, [navigate])

    const authentication = useMemo(() => {
        return {
            signOut: () => {
                Cookies.remove('authToken');
                navigate('/');
            },
        };
    }, [navigate]);
    const userName = () => {
        var token = Cookies.get('authToken');
        token = JSON.parse(token)
        return (
            <Typography variant='h6' sx={{
                display: {
                    xs: 'none',
                    sm: 'flex'
                }
            }}>
                {token.userId}
            </Typography>
        )
    }
    return (
        <AppProvider
            branding={{
                logo: <img src={logo} alt="MUI logo" />,
                title: 'Makassed LMS',
            }}
            navigation={navigation}
            router={router}
            authentication={authentication}
            theme={lightTheme}
            session={session}
        >
            <DashboardLayout slots={{ toolbarActions: userName }}>
                <Outlet />
            </DashboardLayout>
        </AppProvider>
    )
}

export default DashboardLayoutWrapper