import { useMemo, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

import { AppProvider } from '@toolpad/core/AppProvider'
import { DashboardLayout } from '@toolpad/core/DashboardLayout'

import theme from '../utils/theme'
import navigation from '../utils/navigation.jsx'

import { useUser } from '../features/authentication/useUser.js'
import { useLogout } from '../features/authentication/useLogout.js'

import logo from '../images/logo.jpg'

const AppLayout = () => {
    const location = useLocation();
    const [pathname, setPathName] = useState(location.pathname);
    const navigate = useNavigate();
    const { user } = useUser();
    const { logout } = useLogout();

    const router = useMemo(() => {
        return {
            pathname,
            searchParams: new URLSearchParams(),
            navigate: (path) => {
                navigate(path)
                setPathName(path)
            },
        };
    }, [pathname, navigate]);


    const authentication = useMemo(() => {
        return {
            signOut: logout,
            signIn: () => null
        };
    }, [logout]);


    return (
        <AppProvider
            branding={{
                logo: <img src={logo} alt="Makassed LMS" />,
                title: 'Makassed LMS',
            }}
            navigation={navigation[user.role]}
            router={router}
            authentication={authentication}
            theme={theme}
            session={{ user }}
        >
            <DashboardLayout>
                <Outlet />
            </DashboardLayout>
        </AppProvider>
    )
}

export default AppLayout