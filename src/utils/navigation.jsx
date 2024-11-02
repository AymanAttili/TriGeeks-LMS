import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { PiCertificateFill } from "react-icons/pi";
const navigation = [
    {
        segment: 'dashboard',
        title: 'Dashboard',
        icon: <HomeWorkIcon />,
    }, {
        segment: 'my-courses',
        title: 'My Courses',
        icon: <MenuBookIcon />,
    },
    // {
    //     segment: 'favourite-courses',
    //     title: 'Favourite courses',
    //     icon: <StarRoundedIcon />,
    // },
    {
        segment: 'courses',
        title: 'Search courses',
        icon: <SearchIcon />,
    },
    // {
    //     segment: 'chats',
    //     title: 'Chats',
    //     icon: <ChatRoundedIcon />,
    // },
    {
        kind: 'divider'
    }, {
        segment: 'account',
        title: 'Account',
        icon: <AccountCircleIcon />
    }, {
        segment: 'certificates',
        title: 'My Certificates',
        icon: <PiCertificateFill size='24' />
    }
];

export default navigation;