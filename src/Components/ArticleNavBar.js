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
import SearchIcon from '@mui/icons-material/Search';
import http from '../service/http-common';
import getUserID from "../service/GetUserID";
import { useEffect, useState } from 'react';
import LogoutIcon from '@mui/icons-material/Logout';
import LogoutUser from '../service/LogoutUser';

const pages = ['Search', 'Home', 'About'];
const links = ['article-search', 'article-home', 'about'];

const settings = ['Profile', 'Library book', 'About', 'Publish Articles', 'Logout'];
const settingslinks = ['my-profile', '', 'about', 'publish-articles', 'logout'];

function ArticleNavBar() {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [userDetails, setUserDetails] = React.useState({});

    // Get user details from api
    React.useEffect(() => {
        //const userID = 'sampleUserID'; // Replace 'sampleUserID' with actual user id from 'localStorage.getItem('userID')
        const userID = getUserID();

        // Fetch user details from api
        const fetchUserDetails = async () => {
            try {
                const response = await http.get(`/user/getUserProfile/${userID}`);
                const data = response.data;
                console.log('User details:', data);
                setUserDetails(data);
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        };

        fetchUserDetails();
    }, []);

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
        <AppBar position="static" sx={{ fontFamily: 'Lato, sans-serif' }}>
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
                            {pages.map((page, index) => (
                                <MenuItem key={page} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">
                                        <Link to={appendCurrentPath(links[index])} style={{ textDecoration: 'none', color: 'inherit' }}>
                                            {page}
                                        </Link>
                                    </Typography>
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

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Profile">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="User Avatar" src={userDetails.profileImg ? `data:image/jpeg;base64,${userDetails.profileImg}` : null}>
                                    {
                                        !userDetails?.profileImg && userDetails?.firstName && userDetails?.lastName
                                            ? `${userDetails.firstName.charAt(0)}${userDetails.lastName.charAt(0)}`
                                            : ' '
                                    }
                                </Avatar>
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

export default ArticleNavBar;