import {
    Container,
    CssBaseline,
    Typography,
    Box,
    Paper,
    Chip,
    Divider,
} from '@mui/material';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Markdown from 'react-markdown';
import safeMarkdownOptions from '../../constants/safeMarkdownOptions';
import AppTheme from '../../shared-theme/AppTheme';
import AppAppBar from '../blog/components/AppAppBar';
import { format } from 'date-fns';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PersonIcon from '@mui/icons-material/Person';
import { Post } from '../../interfaces/posts.interface';
import getPost from '../../api/posts/getPost';

const ViewPost = () => {
    const { postId } = useParams<{ postId: string }>();
    const [post, setPost] = useState<Post | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPost = async () => {
            setLoading(true);
            try {
                const urlparams = new URLSearchParams(window.location.search);
                const postId = parseInt(urlparams.get('id') || '');
                getPost(postId).then((response) => {
                    console.log(response);
                    setPost(response);
                    setLoading(false);
                });
            } catch (err) {
                setError(
                    'Error al cargar el post. Por favor, inténtalo de nuevo más tarde.'
                );
                setLoading(false);
                console.error('Error fetching post:', err);
            }
        };

        fetchPost();
    }, [postId]);

    const formatDate = (dateString: string) => {
        try {
            return format(new Date(dateString), 'dd MMMM, yyyy');
        } catch (e) {
            return dateString;
        }
    };

    return (
        <AppTheme>
            <AppAppBar />
            <CssBaseline enableColorScheme />
            <Container maxWidth='lg' sx={{ mt: '7rem', mb: 6 }}>
                {loading ? (
                    <Typography variant='h5' align='center'>
                        Cargando post...
                    </Typography>
                ) : error ? (
                    <Typography variant='h5' color='error' align='center'>
                        {error}
                    </Typography>
                ) : post ? (
                    <Paper elevation={3} sx={{ p: { xs: 2, md: 4 } }}>
                        {/* Título del post */}
                        <Typography variant='h2' component='h1' gutterBottom>
                            {post.title}
                        </Typography>

                        {/* Metadatos: autor y fecha */}
                        <Box
                            sx={{
                                display: 'flex',
                                gap: 2,
                                flexWrap: 'wrap',
                                mb: 4,
                                mt: 3,
                            }}
                        >
                            <Chip
                                icon={<PersonIcon />}
                                label={`Autor: ${post.author.username}`}
                                variant='outlined'
                                color='primary'
                            />
                            <Chip
                                icon={<CalendarTodayIcon />}
                                label={`Publicado: ${formatDate(
                                    post.date_posted
                                )}`}
                                variant='outlined'
                            />
                        </Box>

                        <Divider sx={{ mb: 4 }} />

                        {/* Contenido del post con markdown */}
                        <Box
                            sx={{
                                typography: 'body1',
                                '& img': { maxWidth: '100%' },
                                '& a': { color: 'primary.main' },
                            }}
                        >
                            <Markdown
                                components={safeMarkdownOptions.components}
                            >
                                {post.content}
                            </Markdown>
                        </Box>
                    </Paper>
                ) : (
                    <Typography variant='h5' align='center'>
                        No se encontró el post solicitado
                    </Typography>
                )}
            </Container>
        </AppTheme>
    );
};

export default ViewPost;
