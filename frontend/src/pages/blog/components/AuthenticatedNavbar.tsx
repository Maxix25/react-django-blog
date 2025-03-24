import { alpha, styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import MenuIcon from '@mui/icons-material/Menu';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import ArticleIcon from '@mui/icons-material/Article';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddIcon from '@mui/icons-material/Add';
import ColorModeIconDropdown from '../../../shared-theme/ColorModeIconDropdown';
import Sitemark from './SitemarkIcon';
import { Link, useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import { useState } from 'react';
import useAuth from '../../../hooks/useAuth';

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexShrink: 0,
    borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
    backdropFilter: 'blur(24px)',
    border: '1px solid',
    borderColor: theme.palette.divider,
    backgroundColor: alpha(theme.palette.background.default, 0.4),
    boxShadow: theme.shadows[1],
    padding: '8px 12px',
}));

interface AuthenticatedNavbarProps {
    username?: string;
}

export default function AuthenticatedNavbar({
    username = 'User',
}: AuthenticatedNavbarProps) {
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const menuOpen = Boolean(anchorEl);
    const navigate = useNavigate();
    const { logout } = useAuth();

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        // Implement logout functionality here
        // For example:
        logout();
        handleMenuClose();
        navigate('/');
    };

    const firstLetter = username ? username.charAt(0).toUpperCase() : 'U';

    return (
        <AppBar
            position='fixed'
            enableColorOnDark
            sx={{
                boxShadow: 0,
                bgcolor: 'transparent',
                backgroundImage: 'none',
                mt: 'calc(var(--template-frame-height, 0px) + 28px)',
            }}
        >
            <Container maxWidth='lg'>
                <StyledToolbar variant='dense' disableGutters>
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: 'flex',
                            alignItems: 'center',
                            px: 0,
                        }}
                    >
                        <Sitemark />
                        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                            <Button
                                variant='text'
                                color='info'
                                size='small'
                                component={Link}
                                to='/'
                            >
                                Home
                            </Button>
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            display: { xs: 'none', md: 'flex' },
                            gap: 1,
                            alignItems: 'center',
                        }}
                    >
                        <Button
                            color='primary'
                            variant='text'
                            size='small'
                            component={Link}
                            to='/posts/your-posts'
                            startIcon={<ArticleIcon />}
                        >
                            Your Posts
                        </Button>
                        <Button
                            color='primary'
                            variant='contained'
                            size='small'
                            component={Link}
                            to='/create-post'
                            startIcon={<AddIcon />}
                        >
                            New Post
                        </Button>

                        <ColorModeIconDropdown />

                        <IconButton
                            onClick={handleMenuClick}
                            size='small'
                            sx={{ ml: 1 }}
                            aria-controls={
                                menuOpen ? 'account-menu' : undefined
                            }
                            aria-haspopup='true'
                            aria-expanded={menuOpen ? 'true' : undefined}
                        >
                            <Avatar
                                sx={{
                                    width: 32,
                                    height: 32,
                                    bgcolor: 'primary.main',
                                }}
                            >
                                {firstLetter}
                            </Avatar>
                        </IconButton>

                        <Menu
                            anchorEl={anchorEl}
                            id='account-menu'
                            open={menuOpen}
                            onClose={handleMenuClose}
                            onClick={handleMenuClose}
                            transformOrigin={{
                                horizontal: 'right',
                                vertical: 'top',
                            }}
                            anchorOrigin={{
                                horizontal: 'right',
                                vertical: 'bottom',
                            }}
                            slotProps={{
                                paper: {
                                    elevation: 3,
                                    sx: {
                                        overflow: 'visible',
                                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.15))',
                                        mt: 1,
                                        width: 180,
                                        '& .MuiAvatar-root': {
                                            width: 32,
                                            height: 32,
                                            ml: -0.5,
                                            mr: 1,
                                        },
                                    },
                                },
                            }}
                        >
                            <MenuItem component={Link} to='/profile'>
                                <ListItemIcon>
                                    <AccountCircleIcon fontSize='small' />
                                </ListItemIcon>
                                Profile
                            </MenuItem>
                            <MenuItem component={Link} to='/posts/your-posts'>
                                <ListItemIcon>
                                    <ArticleIcon fontSize='small' />
                                </ListItemIcon>
                                Your Posts
                            </MenuItem>
                            <Divider />
                            <MenuItem onClick={handleLogout}>
                                <ListItemIcon>
                                    <LogoutIcon fontSize='small' />
                                </ListItemIcon>
                                Logout
                            </MenuItem>
                        </Menu>
                    </Box>
                    <Box sx={{ display: { xs: 'flex', md: 'none' }, gap: 1 }}>
                        <ColorModeIconDropdown size='medium' />
                        <IconButton
                            aria-label='Menu button'
                            onClick={toggleDrawer(true)}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Drawer
                            anchor='top'
                            open={open}
                            onClose={toggleDrawer(false)}
                            slotProps={{
                                paper: {
                                    sx: {
                                        top: 'var(--template-frame-height, 0px)',
                                    },
                                },
                            }}
                        >
                            <Box
                                sx={{
                                    p: 2,
                                    backgroundColor: 'background.default',
                                }}
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        mb: 2,
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Avatar
                                            sx={{
                                                mr: 1,
                                                bgcolor: 'primary.main',
                                            }}
                                        >
                                            {firstLetter}
                                        </Avatar>
                                        <Typography>{username}</Typography>
                                    </Box>
                                    <IconButton onClick={toggleDrawer(false)}>
                                        <CloseRoundedIcon />
                                    </IconButton>
                                </Box>
                                <MenuItem component={Link} to='/'>
                                    Home
                                </MenuItem>
                                <MenuItem component={Link} to='/blog'>
                                    Blog
                                </MenuItem>
                                <MenuItem
                                    component={Link}
                                    to='/posts/your-posts'
                                >
                                    Your Posts
                                </MenuItem>
                                <MenuItem component={Link} to='/create-post'>
                                    New Post
                                </MenuItem>
                                <MenuItem component={Link} to='/profile'>
                                    Profile
                                </MenuItem>
                                <Divider sx={{ my: 2 }} />
                                <MenuItem onClick={handleLogout}>
                                    <ListItemIcon>
                                        <LogoutIcon fontSize='small' />
                                    </ListItemIcon>
                                    Logout
                                </MenuItem>
                            </Box>
                        </Drawer>
                    </Box>
                </StyledToolbar>
            </Container>
        </AppBar>
    );
}
