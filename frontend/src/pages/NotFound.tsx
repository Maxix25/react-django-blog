import {
    Box,
    Button,
    Container,
    CssBaseline,
    Typography,
    Paper,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import AppTheme from '../shared-theme/AppTheme';
import AppAppBar from './blog/components/AppAppBar';

const NotFound = () => {
    return (
        <AppTheme>
            <CssBaseline enableColorScheme />
            <AppAppBar />

            <Container
                maxWidth='md'
                sx={{
                    mt: '7rem',
                    mb: 6,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                }}
            >
                <Paper
                    elevation={3}
                    sx={{
                        p: 6,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 3,
                        borderRadius: 2,
                    }}
                >
                    <ErrorOutlineIcon
                        sx={{
                            fontSize: 100,
                            color: 'primary.main',
                            mb: 2,
                        }}
                    />

                    <Typography
                        variant='h1'
                        component='h1'
                        sx={{
                            fontSize: { xs: '4rem', md: '6rem' },
                            fontWeight: 700,
                        }}
                    >
                        404
                    </Typography>

                    <Typography variant='h4' component='h2' sx={{ mb: 2 }}>
                        Page Not Found
                    </Typography>

                    <Typography
                        variant='body1'
                        color='text.secondary'
                        sx={{ mb: 4, maxWidth: '80%' }}
                    >
                        Sorry, the page you are looking for doesn't exist or has
                        been moved. You can return to the home page to continue
                        browsing.
                    </Typography>

                    <Box
                        sx={{
                            display: 'flex',
                            gap: 2,
                            flexWrap: 'wrap',
                            justifyContent: 'center',
                        }}
                    >
                        <Button
                            component={RouterLink}
                            to='/'
                            variant='contained'
                            size='large'
                        >
                            Back to Home
                        </Button>
                    </Box>
                </Paper>
            </Container>
        </AppTheme>
    );
};

export default NotFound;
