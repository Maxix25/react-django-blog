import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import AppTheme from '../../shared-theme/AppTheme';
import ColorModeSelect from '../../shared-theme/ColorModeSelect';
import { SitemarkIcon } from './components/CustomIcons';
import apiLogin from '../../api/auth/login';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const Card = styled(MuiCard)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    width: '100%',
    padding: theme.spacing(4),
    gap: theme.spacing(2),
    margin: 'auto',
    [theme.breakpoints.up('sm')]: {
        maxWidth: '450px',
    },
    boxShadow:
        'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
    ...theme.applyStyles('dark', {
        boxShadow:
            'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
    }),
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
    height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
    minHeight: '100%',
    padding: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(4),
    },
    '&::before': {
        content: '""',
        display: 'block',
        position: 'absolute',
        zIndex: -1,
        inset: 0,
        backgroundImage:
            'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
        backgroundRepeat: 'no-repeat',
        ...theme.applyStyles('dark', {
            backgroundImage:
                'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
        }),
    },
}));

export default function SignIn(props: { disableCustomTheme?: boolean }) {
    const { login } = useAuth();
    toast.success('Welcome back!');
    const navigate = useNavigate();
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const username = data.get('username') as string;
        const password = data.get('password') as string;

        apiLogin(username, password)
            .then((data) => {
                axios
                    .get('/blog/user/', {
                        headers: {
                            Authorization: `Bearer ${data.access}`,
                        },
                    })
                    .then((response) => {
                        const userData = {
                            username: response.data.username,
                            id: response.data.id,
                        };
                        console.log('Logging in!');
                        login(data.access, data.refresh, userData);
                        navigate('/posts/your-posts');
                    });
            })
            .catch((error) => {
                console.error('Error signing in:', error);
            });
    };

    return (
        <AppTheme {...props}>
            <CssBaseline enableColorScheme />
            <ToastContainer />
            <SignInContainer direction='column' justifyContent='space-between'>
                <ColorModeSelect
                    sx={{ position: 'fixed', top: '1rem', right: '1rem' }}
                />
                <Card variant='outlined'>
                    <SitemarkIcon />
                    <Typography
                        component='h1'
                        variant='h4'
                        sx={{
                            width: '100%',
                            fontSize: 'clamp(2rem, 10vw, 2.15rem)',
                        }}
                    >
                        Sign in
                    </Typography>
                    <Box
                        component='form'
                        onSubmit={handleSubmit}
                        noValidate
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: '100%',
                            gap: 2,
                        }}
                    >
                        <FormControl>
                            <FormLabel htmlFor='username'>Username</FormLabel>
                            <TextField
                                id='username'
                                type='text'
                                name='username'
                                placeholder='Username'
                                autoComplete='email'
                                autoFocus
                                required
                                fullWidth
                                variant='outlined'
                                color='primary'
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor='password'>Password</FormLabel>
                            <TextField
                                name='password'
                                placeholder='••••••'
                                type='password'
                                id='password'
                                autoComplete='current-password'
                                autoFocus
                                required
                                fullWidth
                                variant='outlined'
                                color='primary'
                            />
                        </FormControl>
                        <FormControlLabel
                            control={
                                <Checkbox value='remember' color='primary' />
                            }
                            label='Remember me'
                        />
                        <Button type='submit' fullWidth variant='contained'>
                            Sign in
                        </Button>
                    </Box>
                </Card>
            </SignInContainer>
        </AppTheme>
    );
}
