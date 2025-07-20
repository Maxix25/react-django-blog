import { Container, Typography } from '@mui/material';

export default function SitemarkIcon() {
    return (
        <Container sx={{ display: 'flex', alignItems: 'center' }}>
            <img src='/logo2.png' alt='Logo' width={20} />
            <Typography variant='h5' sx={{ ml: 1, color: 'text.primary' }}>
                MaxiBlog
            </Typography>
        </Container>
    );
}
