import * as React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import AccountCircle from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import HomeIcon from '@mui/icons-material/Home';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import MarkChatUnreadIcon from '@mui/icons-material/MarkChatUnread';
import ArticleIcon from '@mui/icons-material/Article';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import LogoutIcon from '@mui/icons-material/Logout';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import FolderSpecialIcon from '@mui/icons-material/FolderSpecial';
import LogOutUser from '../service/LogoutUser';

export default function LibrarianTopNavBar() {

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ backgroundColor: 'linear-gradient(to right, #1a33ad, #8184fe)' }} style={{ borderRadius: '1px' }}>
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
                        {/* Home */}
                        <Link to="/admin">
                            <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                                <span style={{ color: 'black' }}>
                                    <HomeIcon />
                                </span>
                            </IconButton>
                        </Link>

                        {/*Book Management */}
                        <Link to="/admin-book-management">
                            <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                                <span style={{ color: 'black' }}>
                                    <LibraryBooksIcon />
                                </span>
                            </IconButton>
                        </Link>

                        <Link to="/book-lending">
                            <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                                <span style={{ color: 'black' }}>
                                    <AutoStoriesIcon />
                                </span>
                            </IconButton>
                        </Link>

                        <Link to="/librarian-book-reservation">
                            <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                                <span style={{ color: 'black' }}>
                                    <FolderSpecialIcon />
                                </span>
                            </IconButton>
                        </Link>

                        {/*MemberShip Management */}
                        <Link to="/membership-management">
                            <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                                <span style={{ color: 'black' }}>
                                    <PermContactCalendarIcon />
                                </span>
                            </IconButton>
                        </Link>

                        {/* Chat */}
                        <Link to="/librarian-chat">
                            <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                                <span style={{ color: 'black' }}>
                                    <MarkChatUnreadIcon />
                                </span>
                            </IconButton>
                        </Link>

                        {/*Article Management */}
                        <Link to="/librarian-article-management">
                            <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                                <span style={{ color: 'black' }}>
                                    <ArticleIcon />
                                </span>
                            </IconButton>
                        </Link>

                        {/*Fine Management */}
                        <Link to="/admin-fine-management">
                            <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                                <span style={{ color: 'black' }}>
                                    <RequestQuoteIcon />
                                </span>
                            </IconButton>
                        </Link>

                        {/* Notification Control */}
                        <Link to="/admin-notification-control">
                            <IconButton size="large" aria-label="show 17 new notifications" color="inherit">
                                <span style={{ color: 'black' }}>
                                    <NotificationsIcon />
                                </span>
                            </IconButton>
                        </Link>

                        {/* Complaint */}
                        <Link to="/admin-complaint">
                            <IconButton size="large" aria-label="show 17 new notifications" color="inherit">
                                <span style={{ color: 'black' }}>
                                    <NewReleasesIcon />
                                </span>
                            </IconButton>
                        </Link>

                        {/* Profile icon */}
                        <Link to="/admin-profile-management">
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

                        <Link to="/logout">
                            <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                                <span style={{ color: 'black' }}>
                                    <LogoutIcon />
                                </span>
                            </IconButton>
                        </Link>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box >
    );
}
