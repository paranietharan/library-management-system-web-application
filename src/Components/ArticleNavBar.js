import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { Link } from 'react-router-dom';
//import { useLocation } from 'react-router-dom';

// Search icon
import SearchIcon from '@mui/icons-material/Search';
// Notification icon
// import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';

const pages = ['Search', 'Home', 'About'];
const links = ['article-search', 'article-home', 'about'];

const settings = ['Profile', 'Library book', 'About','Publish Articles', 'Logout'];
const settingslinks = ['my-profile', '', 'about','publish-articles', 'logout'];

function ArticleNavBar() {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    // const [showNotifications, setShowNotifications] = React.useState(false);

    // const handleNotificationClick = () => {
    //     setShowNotifications(!showNotifications);
    // };

    const [searchText, setSearchText] = React.useState('');
    const [isSearchVisible, setIsSearchVisible] = React.useState(false);
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            console.log("Search Text:", searchText);
        }
    };
    const handleSearchIconClickVisible = () => {
        setIsSearchVisible(!isSearchVisible); // Toggle search visibility
    };

    const appendCurrentPath = (link) => {
        const currentPath = window.location.origin;
        return `${currentPath}/${link}`;
    };

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.15rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Article
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">{page}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        LOGO
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page, index) => (
                            <Button
                                key={page}
                                component={Link} // Use Link instead of 'a'
                                to={appendCurrentPath(links[index])} // Link to respective page with current path appended
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {page}
                            </Button>
                        ))}
                    </Box>

                    {/* Search Icon */}
                    <div>
                        {isSearchVisible && (
                            <input
                                type="text"
                                placeholder="Search"
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                                onKeyDown={handleKeyDown}
                                style={{ display: 'inline-block', width: '200px' }}
                            />
                        )}
                        <IconButton onClick={handleSearchIconClickVisible}>
                            <SearchIcon sx={{ mr: 2 }} />
                        </IconButton>
                    </div>

                    {/* Notification Icon
                    <NotificationsActiveIcon sx={{ mr: 2 }} onClick={handleNotificationClick} />
                    {showNotifications && <NotificationList />} */}

                    {/* Profile Icon */}
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Profile">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {/* Drop down menu when click profile */}
                            {settings.map((setting, index) => (
                                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                    <Link to={appendCurrentPath(settingslinks[index])} style={{ textDecoration: 'none', color: 'inherit' }}>
                                        <Typography textAlign="center">{setting}</Typography>
                                    </Link>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

// const NotificationList = () => {
//     // Generate sample notifications
//     const notifications = Array.from({ length: 10 }, (_, i) => `Notification ${i + 1}`);

//     return (
//         <div style={notificationListStyle}>
//             {notifications.map((notification, index) => (
//                 <div key={index} style={notificationStyle}>{notification}</div>
//             ))}
//         </div>
//     );
// };

// Styles
// const notificationListStyle = {
//     position: 'absolute',
//     top: '50px', // Adjust as needed
//     right: '10px',
//     backgroundColor: 'white',
//     boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
//     maxHeight: '200px',
//     overflowY: 'auto',
// };

// const notificationStyle = {
//     padding: '10px',
//     borderBottom: '1px solid #ccc',
//     color: 'black',
// };

export default ArticleNavBar;