import {
    Container,
    Typography,
    Box,
    Paper,
    Chip,
    Divider,
    Skeleton,
} from '@mui/material';
import { useState, useEffect } from 'react';
import Markdown from 'react-markdown';
import safeMarkdownOptions from '../constants/safeMarkdownOptions';
import { format } from 'date-fns';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PersonIcon from '@mui/icons-material/Person';
import { Post } from '../interfaces/posts.interface';
import getPost from '../api/posts/getPost';

const ViewPost = () => {
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
                setError('Error fetching post. Please try again later.');
                setLoading(false);
                console.error('Error fetching post:', err);
            }
        };

        fetchPost();
    }, []);

    const formatDate = (dateString: string) => {
        try {
            return format(new Date(dateString), 'dd MMMM, yyyy');
        } catch {
            return dateString;
        }
    };

    const PostSkeleton = () => (
        <Paper elevation={3} sx={{ p: { xs: 2, md: 4 } }}>
            <Skeleton variant='text' height={60} width='80%' />

            <Box
                sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 4, mt: 3 }}
            >
                <Skeleton variant='rounded' width={150} height={32} />
                <Skeleton variant='rounded' width={200} height={32} />
            </Box>

            <Divider sx={{ mb: 4 }} />

            <Skeleton variant='text' height={25} sx={{ mb: 1 }} />
            <Skeleton variant='text' height={25} sx={{ mb: 1 }} />
            <Skeleton variant='text' height={25} sx={{ mb: 1 }} />
            <Skeleton variant='text' height={25} width='90%' sx={{ mb: 1 }} />
            <Skeleton variant='text' height={25} width='95%' sx={{ mb: 3 }} />

            <Skeleton variant='text' height={25} sx={{ mb: 1 }} />
            <Skeleton variant='text' height={25} sx={{ mb: 1 }} />
            <Skeleton variant='text' height={25} width='85%' sx={{ mb: 3 }} />

            <Skeleton variant='rectangular' height={300} sx={{ mb: 3 }} />

            <Skeleton variant='text' height={25} sx={{ mb: 1 }} />
            <Skeleton variant='text' height={25} sx={{ mb: 1 }} />
            <Skeleton variant='text' height={25} width='92%' sx={{ mb: 1 }} />
            <Skeleton variant='text' height={25} width='88%' />
        </Paper>
    );

    return (
        <Container maxWidth='lg' sx={{ mt: '7rem', mb: 6 }}>
            {loading ? (
                <PostSkeleton />
            ) : error ? (
                <Typography variant='h5' color='error' align='center'>
                    {error}
                </Typography>
            ) : post ? (
                <Paper elevation={3} sx={{ p: { xs: 2, md: 4 } }}>
                    <Typography variant='h2' component='h1' gutterBottom>
                        {post.title}
                    </Typography>

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
                            label={`Author: ${post.author.username}`}
                            variant='outlined'
                            color='primary'
                        />
                        <Chip
                            icon={<CalendarTodayIcon />}
                            label={`Published: ${formatDate(post.date_posted)}`}
                            variant='outlined'
                        />
                    </Box>

                    <Divider sx={{ mb: 4 }} />

                    <Box
                        sx={{
                            typography: 'body1',
                            '& img': { maxWidth: '100%' },
                            '& a': { color: 'primary.main' },
                        }}
                    >
                        <Markdown components={safeMarkdownOptions.components}>
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
    );
};

export default ViewPost;
