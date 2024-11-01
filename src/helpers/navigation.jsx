import ChatRoundedIcon from '@mui/icons-material/ChatRounded';
import ExploreRoundedIcon from '@mui/icons-material/ExploreRounded';
import SettingsIcon from '@mui/icons-material/Settings';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import StarRoundedIcon from '@mui/icons-material/StarRounded';

export const navigation = [
    {
        segment: 'dashboard',
        title: 'Dashboard',
        icon: <HomeWorkIcon />,
    }, {
        segment: 'my-courses',
        title: 'My Courses',
        icon: <MenuBookIcon />,
    }, {
        segment: 'favourite-courses',
        title: 'Favourite courses',
        icon: <StarRoundedIcon />,
    }, {
        segment: 'explore-courses',
        title: 'Explore courses',
        icon: <ExploreRoundedIcon />,
    }, {
        segment: 'chats',
        title: 'Chats',
        icon: <ChatRoundedIcon />,
    }, {
        kind: 'divider'
    }, {
        segment: 'settings',
        title: 'Settings',
        icon: <SettingsIcon />
    }
];