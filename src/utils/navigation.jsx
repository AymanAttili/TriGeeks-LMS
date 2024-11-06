import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { PiCertificateFill, PiUser, PiUserBold, PiUserCheck } from "react-icons/pi";
import { AccountBox } from '@mui/icons-material';
const navigation = {
    Admin: [
        {
            segment: 'dashboard',
            title: 'Dashboard',
            icon: <HomeWorkIcon />,
        }, {
            segment: 'courses',
            title: 'Courses',
            icon: <MenuBookIcon />,
        },
        {
            segment: 'certificates',
            title: 'Certificates',
            icon: <PiCertificateFill size='24' />
        },
        {
            segment: 'users',
            title: 'Users',
            icon: <PiUserBold size='24' />
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
    SubAdmin: [
        {
            segment: 'dashboard',
            title: 'Dashboard',
            icon: <HomeWorkIcon />,
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
            icon: <HomeWorkIcon />,
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
};

export default navigation;