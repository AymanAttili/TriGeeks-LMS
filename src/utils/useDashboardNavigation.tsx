import HomeWorkIcon from '@mui/icons-material/HomeWork';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { PiUserBold } from "react-icons/pi";
import { AccountBox, Dashboard, Notifications } from '@mui/icons-material';



const useDashboardNavigation = (userRole) => {
    const navigation = {
        Admin: [
            {
                segment: 'dashboard',
                title: 'Dashboard',
                icon: <Dashboard />
            },
            {
                segment: 'departments',
                title: 'Departments',
                icon: <HomeWorkIcon />,
                pattern: 'departments{/:departmentId}*',
            }, {
                segment: 'courses',
                title: 'Courses',
                icon: <MenuBookIcon />,
                pattern: 'courses{/:courseId}*',
            },
            {
                segment: 'users',
                title: 'Users',
                icon: <PiUserBold size='24' />,
            },
            {
                kind: 'divider'
            }, {
                segment: 'account',
                title: 'My Account',
                icon: <AccountBox />
            },
            {
                segment: 'notifications',
                title: 'Notifications',
                icon: <Notifications />
            }
        ],
        SubAdmin: [
            {
                segment: 'courses',
                title: 'My Courses',
                icon: <MenuBookIcon />,
            },
            {
                kind: 'divider'
            }, {
                segment: 'account',
                title: 'My Account',
                icon: <AccountBox />
            },
            {
                segment: 'notifications',
                title: 'Notifications',
                icon: <Notifications />
            }
        ],
        Staff: [
            {
                segment: 'dashboard',
                title: 'Dashboard',
                icon: <Dashboard />,
            }, {
                segment: 'courses',
                title: 'My Courses',
                icon: <MenuBookIcon />,
            },
            {
                kind: 'divider'
            }, {
                segment: 'account',
                title: 'My Account',
                icon: <AccountBox />
            },
            {
                segment: 'notifications',
                title: 'Notifications',
                icon: <Notifications />
            }
        ]
    }

    return navigation[userRole]
};

export default useDashboardNavigation;