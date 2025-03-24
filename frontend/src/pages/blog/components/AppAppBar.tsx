import * as React from 'react';
import { alpha, styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';
import ColorModeIconDropdown from '../../../shared-theme/ColorModeIconDropdown';
import Sitemark from './SitemarkIcon';
import AuthenticatedNavbar from './AuthenticatedNavbar';
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

export default function AppAppBar() {
    const [open, setOpen] = React.useState(false);
    const { isAuthenticated, user } = useAuth();

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    if (isAuthenticated && user) {
        return <AuthenticatedNavbar username={user.username} />;
    }

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
                            to='/login'
                        >
                            Sign in
                        </Button>
                        <Button
                            color='primary'
                            variant='contained'
                            size='small'
                            component={Link}
                            to='/signup'
                        >
                            Sign up
                        </Button>

                        <ColorModeIconDropdown />
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
                                    <Sitemark />
                                    <IconButton onClick={toggleDrawer(false)}>
                                        <CloseIcon />
                                    </IconButton>
                                </Box>
                                <Button
                                    component={Link}
                                    to='/'
                                    fullWidth
                                    sx={{ mb: 1 }}
                                >
                                    Home
                                </Button>
                                <Button
                                    component={Link}
                                    to='/blog'
                                    fullWidth
                                    sx={{ mb: 1 }}
                                >
                                    Blog
                                </Button>
                                <Button
                                    component={Link}
                                    to='/login'
                                    fullWidth
                                    sx={{ mb: 1 }}
                                >
                                    Sign in
                                </Button>
                                <Button
                                    component={Link}
                                    to='/signup'
                                    fullWidth
                                    variant='contained'
                                >
                                    Sign up
                                </Button>
                            </Box>
                        </Drawer>
                    </Box>
                </StyledToolbar>
            </Container>
        </AppBar>
    );
}
