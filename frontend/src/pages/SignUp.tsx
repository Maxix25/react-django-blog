import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import { Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import register from '../api/auth/register';
import { toast } from 'react-toastify';
import apiLogin from '../api/auth/login';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';
import { CircularProgress } from '@mui/material';

const Card = styled(MuiCard)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    width: '100%',
    padding: theme.spacing(4),
    gap: theme.spacing(2),
    margin: 'auto',
    boxShadow:
        'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
    [theme.breakpoints.up('sm')]: {
        width: '450px',
    },
    ...theme.applyStyles('dark', {
        boxShadow:
            'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
    }),
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
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

export default function SignUp() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [emailError, setEmailError] = useState(false);
    const [emailErrorMessage, setEmailErrorMessage] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
    const [nameError, setNameError] = useState(false);
    const [nameErrorMessage, setNameErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const validateInputs = () => {
        const email = document.getElementById('email') as HTMLInputElement;
        const password = document.getElementById(
            'password'
        ) as HTMLInputElement;
        const name = document.getElementById('name') as HTMLInputElement;

        let isValid = true;

        if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
            setEmailError(true);
            setEmailErrorMessage('Please enter a valid email address.');
            isValid = false;
        } else {
            setEmailError(false);
            setEmailErrorMessage('');
        }

        if (!password.value || password.value.length < 6) {
            setPasswordError(true);
            setPasswordErrorMessage(
                'Password must be at least 6 characters long.'
            );
            isValid = false;
        } else {
            setPasswordError(false);
            setPasswordErrorMessage('');
        }

        if (!name.value || name.value.length < 1) {
            setNameError(true);
            setNameErrorMessage('Name is required.');
            isValid = false;
        } else {
            setNameError(false);
            setNameErrorMessage('');
        }

        return isValid;
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        if (nameError || emailError || passwordError) {
            return;
        }
        const data = new FormData(event.currentTarget);
        const username = data.get('name') as string;
        const email = data.get('email') as string;
        const password = data.get('password') as string;
        register(username, email, password)
            .then((response) => {
                if (response.status === 201) {
                    apiLogin(username, password)
                        .then((data) => {
                            api.get('/blog/user/', {
                                headers: {
                                    Authorization: `Bearer ${data.access}`,
                                },
                            }).then((response) => {
                                const userData = {
                                    username: response.data.username,
                                    id: response.data.id,
                                };
                                login(data.access, data.refresh, userData);
                                navigate('/posts/your-posts');
                            });
                        })
                        .catch((error) => {
                            if (error.response) {
                                console.error('Error:', error.response.data);
                                if (error.response.status === 401) {
                                    toast.error('Error on logging in');
                                }
                            }
                        })
                        .finally(() => {
                            setLoading(false);
                        });
                }
            })
            .catch((error) => {
                if (error.response) {
                    console.error('Error:', error.response.data);
                    if (error.response.status === 400) {
                        toast.error('Username already exists');
                    }
                }
            });
        console.log({
            name: data.get('name'),
            lastName: data.get('lastName'),
            email: data.get('email'),
            password: data.get('password'),
        });
    };

    return (
        <SignUpContainer direction='column' justifyContent='space-between'>
            <Card variant='outlined'>
                <Typography
                    component='h1'
                    variant='h4'
                    sx={{
                        width: '100%',
                        fontSize: 'clamp(2rem, 10vw, 2.15rem)',
                    }}
                >
                    Sign up
                </Typography>
                <Box
                    component='form'
                    onSubmit={handleSubmit}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                    }}
                >
                    <FormControl>
                        <FormLabel htmlFor='name'>Full name</FormLabel>
                        <TextField
                            autoComplete='name'
                            name='name'
                            required
                            fullWidth
                            id='name'
                            placeholder='Jon Snow'
                            error={nameError}
                            helperText={nameErrorMessage}
                            color={nameError ? 'error' : 'primary'}
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel htmlFor='email'>Email</FormLabel>
                        <TextField
                            required
                            fullWidth
                            id='email'
                            placeholder='your@email.com'
                            name='email'
                            autoComplete='email'
                            variant='outlined'
                            error={emailError}
                            helperText={emailErrorMessage}
                            color={passwordError ? 'error' : 'primary'}
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel htmlFor='password'>Password</FormLabel>
                        <TextField
                            required
                            fullWidth
                            name='password'
                            placeholder='••••••'
                            type='password'
                            id='password'
                            autoComplete='new-password'
                            variant='outlined'
                            error={passwordError}
                            helperText={passwordErrorMessage}
                            color={passwordError ? 'error' : 'primary'}
                        />
                    </FormControl>
                    <Button
                        type='submit'
                        fullWidth
                        variant='contained'
                        onClick={validateInputs}
                        disabled={loading}
                    >
                        {loading ? <CircularProgress size={24} /> : 'Sign up'}
                    </Button>
                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                    }}
                >
                    <Typography sx={{ textAlign: 'center' }}>
                        Already have an account?{' '}
                        <Link to='/login'>Sign in</Link>
                    </Typography>
                </Box>
            </Card>
        </SignUpContainer>
    );
}
