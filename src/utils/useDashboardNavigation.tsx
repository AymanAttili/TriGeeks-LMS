import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { PiCertificateFill, PiUserBold } from "react-icons/pi";
import { AccountBox, Dashboard, Domain } from '@mui/icons-material';
import { useDepartments } from '../features/departments/useDepartments';


const useDashboardNavigation = (userRole) => {
    const { departments, isLoading } = useDepartments(userRole);
    let departmentsChildren = [{
        icon: <strong>Manage departments</strong>
    }]

    if (!isLoading && userRole === 'Admin') {
        departments.map((dep) => {
            departmentsChildren.push({
                segment: dep.id,
                title: dep.name,
                icon: <Domain />,
            })
        })
    }
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
                children: departmentsChildren
            }, {
                segment: 'courses',
                title: 'Courses',
                icon: <MenuBookIcon />,
            },
            {
                segment: 'users',
                title: 'Users',
                icon: <PiUserBold size='24' />
            },
            {
                segment: 'certificates',
                title: 'Certificates',
                icon: <PiCertificateFill size='24' />
            },
            {
                kind: 'divider'
            }, {
                segment: 'account',
                title: 'My Account',
                icon: <AccountBox />
            },
        ],
        SubAdmin: [
            {
                segment: 'dashboard',
                title: 'Dashboard',
                icon: <Dashboard />,
            }, {
                segment: 'my-courses',
                title: 'My Courses',
                icon: <MenuBookIcon />,
            },
            {
                segment: 'courses',
                title: 'Search courses',
                icon: <SearchIcon />,
            }, {
                segment: 'certificates',
                title: 'Certificates',
                icon: <PiCertificateFill size='24' />
            },
            {
                kind: 'divider'
            }, {
                segment: 'account',
                title: 'My Account',
                icon: <AccountBox />
            }
            // {
            //     segment: 'chats',
            //     title: 'Chats',
            //     icon: <ChatRoundedIcon />,
            // },
        ],
        Staff: [
            {
                segment: 'dashboard',
                title: 'Dashboard',
                icon: <Dashboard />,
            }, {
                segment: 'my-courses',
                title: 'My Courses',
                icon: <MenuBookIcon />,
            },
            {
                segment: 'courses',
                title: 'Search courses',
                icon: <SearchIcon />,
            }, {
                segment: 'my-certificates',
                title: 'My Certificates',
                icon: <PiCertificateFill size='24' />
            },
            {
                kind: 'divider'
            }, {
                segment: 'account',
                title: 'My Account',
                icon: <AccountBox />
            }
            // {
            //     segment: 'chats',
            //     title: 'Chats',
            //     icon: <ChatRoundedIcon />,
            // },
            // {
            //     segment: 'favourite-courses',
            //     title: 'Favourite courses',
            //     icon: <StarRoundedIcon />,
            // },
        ]
    }

    return navigation[userRole]
};

export default useDashboardNavigation;