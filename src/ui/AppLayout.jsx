import { AppProvider } from '@toolpad/core/AppProvider'
import { DashboardLayout } from '@toolpad/core/DashboardLayout'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import logo from '../images/logo.jpg'
import { useMemo, useState } from 'react'
import theme from '../utils/theme'
import navigation from '../utils/navigation.jsx'
import { useAuth } from '../hooks/useAuth.js'


const AppLayout = () => {
    const location = useLocation();
    const [pathname, setPathName] = useState(location.pathname);
    const navigate = useNavigate();
    const { logoutUser, user } = useAuth();

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


    //Temp
    const authentication = useMemo(() => {
        return {
            signOut: logoutUser,
            signIn: () => null
        };
    }, [logoutUser]);


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