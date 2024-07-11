import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Link } from 'react-router-dom';

import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import BookOnlineIcon from '@mui/icons-material/BookOnline';

import HomeIcon from '@mui/icons-material/Home';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import ListAltIcon from '@mui/icons-material/ListAlt';
import NoteAddIcon from '@mui/icons-material/NoteAdd';

export default function MemberTopNavBar() {

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ backgroundColor: 'linear-gradient(to right, #1a33ad, #8184fe)' }} style={{ borderRadius: '10px' }}>
                <Toolbar>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ display: { xs: 'none', sm: 'block' } }}
                        style={{ color: 'black', borderRadius: '5px' }}
                    >
                        Libray Management System
                    </Typography>

                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <Link to="/article-home" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <IconButton size="large" color="inherit">
                                <span style={{ color: 'black' }}><LocalLibraryIcon /></span>
                            </IconButton>
                        </Link>

                        {/* Home icon */}
                        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <IconButton size="large" color="inherit">
                                <span style={{ color: 'black' }}><HomeIcon /></span>
                            </IconButton>
                        </Link>

                        {/* My books icon */}
                        <Link to="/mybooks" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <IconButton size="large" color="inherit">
                                <span style={{ color: 'black' }}><AutoStoriesIcon /></span>
                            </IconButton>
                        </Link>

                        <Link to="/book-reservation" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <IconButton size="large" color="inherit">
                                <span style={{ color: 'black' }}><BookOnlineIcon /></span>
                            </IconButton>
                        </Link>

                        {/* Fine icon */}
                        <Link to="/fine" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <IconButton size="large" olor="inherit">
                                <span style={{ color: 'black' }}><MonetizationOnIcon /></span>
                            </IconButton>
                        </Link>

                        {/* Bell icon count */}
                        <Link to="/message" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <IconButton
                                size="large"
                                aria-label="show 17 new notifications"
                                color="inherit"
                            >
                                <NotificationsIcon style={{ color: 'black' }} />
                            </IconButton>
                        </Link>

                        {/* Mail icon count */}
                        <Link to="/user-chat" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                                <span style={{ color: 'black' }}>
                                    <MailIcon />
                                </span>
                            </IconButton>
                        </Link>

                        {/* Report icon count */}
                        <Link to="/complaint" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <IconButton size="large" color="inherit">
                                <Badge>
                                    <span style={{ color: 'black' }}>
                                        <ReportGmailerrorredIcon />
                                    </span>
                                </Badge>
                            </IconButton>
                        </Link>

                        {/* List icon */}
                        <Link to="/todo-list" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <IconButton size="large" color="inherit">
                                <span style={{ color: 'black' }}><ListAltIcon /></span>
                            </IconButton>
                        </Link>

                        {/* for Notes icon */}
                        <Link to="/notes" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <IconButton size="large" color="inherit">
                                <span style={{ color: 'black' }}>
                                    <NoteAddIcon />
                                </span>
                            </IconButton>
                        </Link>

                        {/* Profile icon */}
                        <Link to="/edit-profile" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <IconButton
                                size="large"
                                edge="end"
                                aria-label="account of current user"
                                aria-haspopup="true"
                                color="inherit"
                            >
                                <span style={{ color: 'black' }}>
                                    <AccountCircle /></span>
                            </IconButton>
                        </Link>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
