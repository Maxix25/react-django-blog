import { Container, Typography } from '@mui/material';

export default function SitemarkIcon() {
    return (
        <Container sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant='h5' sx={{ ml: 1, color: 'text.primary' }}>
                MaxiBlog
            </Typography>
        </Container>
    );
}
