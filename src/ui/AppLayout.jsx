import { Suspense, useMemo } from 'react'
import { Outlet } from 'react-router-dom'

import { AppProvider } from '@toolpad/core/react-router-dom'
import { DashboardLayout } from '@toolpad/core/DashboardLayout'

import theme from '../utils/theme'
import navigation from '../utils/navigation.jsx'

import { useUser } from '../features/authentication/useUser.js'
import { useLogout } from '../features/authentication/useLogout.js'

import SpinnerLoader from './SpinnerLoader.jsx'

import logo from '../images/logo.jpg'

const AppLayout = () => {
    const { user } = useUser();
    const { logout } = useLogout();

    const authentication = useMemo(() => {
        return {
            signOut: logout,
            signIn: () => null
        };
    }, [logout]);

    const dashboardUser = useMemo(() => {
        return {
            id: user.workId,
            email: user.email,
            name: user.firstName + ' ' + user.lastName,
            image: user.image
        }
    }, [user])


    return (
        <AppProvider
            branding={{
                logo: <img src={logo} alt="Makassed LMS" />,
                title: 'Makassed LMS',
            }}
            navigation={navigation[user.role]}
            authentication={authentication}
            theme={theme}
            session={{
                user: dashboardUser
            }}
        >
            <DashboardLayout>
                <Suspense fallback={<SpinnerLoader />}>
                    <Outlet />
                </Suspense>
            </DashboardLayout>
        </AppProvider>
    )
}

export default AppLayout