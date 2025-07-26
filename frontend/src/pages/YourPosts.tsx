import {
    Container,
    Typography,
    Box,
    Card,
    CardContent,
    CardActions,
    Button,
    Divider,
    CircularProgress,
    Alert,
    Chip,
    Grid2 as Grid,
} from '@mui/material';
import { useState, useEffect } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { format } from 'date-fns';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import getUserPosts from '../../api/posts/getUserPosts';
import { Post } from '../../interfaces/posts.interface';
import deletePost from '../../api/posts/deletePost';
import { toast } from 'react-toastify';

const YourPosts = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserPosts = async () => {
            try {
                setLoading(true);
                const userPosts = await getUserPosts();
                setPosts(userPosts);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching user posts:', err);
                setError('Failed to load your posts. Please try again later.');
                setLoading(false);
            }
        };

        fetchUserPosts();
    }, []);

    const handleEdit = (postId: number) => {
        navigate(`/posts/edit?id=${postId}`);
    };

    const handleDelete = async (postId: number) => {
        // Implement delete functionality here
        // This is just a placeholder
        if (window.confirm('Are you sure you want to delete this post?')) {
            try {
                await deletePost(postId);
                setPosts(posts.filter((post) => post.id !== postId));
                toast.success('Post deleted successfully!');
            } catch (err) {
                console.error('Error deleting post:', err);
                setError('Failed to delete post. Please try again.');
            }
        }
    };

    const formatDate = (dateString: string) => {
        try {
            return format(new Date(dateString), 'MMMM dd, yyyy');
        } catch (e) {
            return dateString;
        }
    };

    // Function to get a preview of the content (first 150 characters)
    const getContentPreview = (content: string) => {
        return content.length > 150
            ? content.substring(0, 150) + '...'
            : content;
    };

    return (
        <Container maxWidth='lg' sx={{ mt: '7rem', mb: 6 }}>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 4,
                }}
            >
                <Typography variant='h3' component='h1'>
                    Your Posts
                </Typography>
                <Button
                    variant='contained'
                    startIcon={<AddIcon />}
                    component={RouterLink}
                    to='/posts/create'
                    size='large'
                >
                    Create New Post
                </Button>
            </Box>

            {loading ? (
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        my: 4,
                    }}
                >
                    <CircularProgress />
                </Box>
            ) : error ? (
                <Alert severity='error' sx={{ my: 2 }}>
                    {error}
                </Alert>
            ) : posts.length === 0 ? (
                <Box
                    sx={{
                        textAlign: 'center',
                        py: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 3,
                    }}
                >
                    <Typography
                        variant='h5'
                        component='p'
                        color='text.secondary'
                    >
                        You haven't created any posts yet.
                    </Typography>
                    <Button
                        variant='contained'
                        startIcon={<AddIcon />}
                        component={RouterLink}
                        to='/posts/create'
                        size='large'
                    >
                        Create Your First Post
                    </Button>
                </Box>
            ) : (
                <Grid container spacing={3}>
                    {posts.map((post) => (
                        <Grid size={{ xs: 12, md: 6 }} key={post.id}>
                            <Card
                                elevation={3}
                                sx={{
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    transition:
                                        'transform 0.3s, box-shadow 0.3s',
                                    '&:hover': {
                                        transform: 'translateY(-5px)',
                                        boxShadow: 6,
                                    },
                                }}
                            >
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Typography
                                        variant='h5'
                                        component={RouterLink}
                                        to={`/posts?id=${post.id}`}
                                        sx={{
                                            textDecoration: 'none',
                                            color: 'inherit',
                                            '&:hover': {
                                                color: 'primary.main',
                                            },
                                            display: 'block',
                                            mb: 1,
                                        }}
                                    >
                                        {post.title}
                                    </Typography>

                                    <Chip
                                        icon={<CalendarTodayIcon />}
                                        label={formatDate(post.date_posted)}
                                        size='small'
                                        variant='outlined'
                                        sx={{ mb: 2 }}
                                    />

                                    <Typography
                                        variant='body2'
                                        color='text.secondary'
                                    >
                                        {getContentPreview(post.content)}
                                    </Typography>
                                </CardContent>

                                <Divider />

                                <CardActions>
                                    <Button
                                        size='small'
                                        startIcon={<EditIcon />}
                                        onClick={() => handleEdit(post.id)}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        size='small'
                                        color='error'
                                        startIcon={<DeleteIcon />}
                                        onClick={() => handleDelete(post.id)}
                                    >
                                        Delete
                                    </Button>
                                    <Button
                                        size='small'
                                        component={RouterLink}
                                        to={`/posts?id=${post.id}`}
                                        sx={{ marginLeft: 'auto' }}
                                    >
                                        View Post
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}
        </Container>
    );
};

export default YourPosts;
