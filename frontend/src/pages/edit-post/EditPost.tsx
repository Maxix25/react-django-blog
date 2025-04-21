import {
    Container,
    Typography,
    Box,
    TextField,
    Paper,
    Button,
} from '@mui/material';
import { useState, useEffect, useCallback } from 'react';
import Grid from '@mui/material/Grid2';
import Markdown from 'react-markdown';
import safeMarkdownOptions from '../../constants/safeMarkdownOptions';
import editPost from '../../api/posts/editPost';
import { useNavigate } from 'react-router-dom';
import getUserPost from '../../api/posts/getUserPost';

const EditPost = () => {
    const [title, setTitle] = useState('My New Blog Post');
    const [markdownContent, setMarkdownContent] = useState(`## Introduction
This is a markdown preview
- This is a list item
- This is another list item
`);

    const [renderedContent, setRenderedContent] = useState(markdownContent);

    const navigate = useNavigate();
    const urlparams = new URLSearchParams(window.location.search);
    const postId = urlparams.get('id') ? parseInt(urlparams.get('id')!) : null;

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        editPost(postId, title, markdownContent).then(() => {
            navigate('/posts/your-posts');
        }
        );
    };

    const debouncedRender = useCallback(() => {
        const timer = setTimeout(() => {
            setRenderedContent(markdownContent);
        }, 300);

        return () => clearTimeout(timer);
    }, [markdownContent]);

    useEffect(() => {
        const cleanup = debouncedRender();
        return cleanup;
    }, [debouncedRender]);
    useEffect(() => {
        const fetchPost = async () => {
            const post = await getUserPost(postId);
            if (post) {
                setTitle(post.title);
                setMarkdownContent(post.content);
            }
        };
        fetchPost();
    }, []);

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };

    const handleMarkdownChange = (
        event: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        setMarkdownContent(event.target.value);
    };

    return (
        <Container maxWidth='xl' sx={{ mt: '6rem' }}>
            <Typography variant='h2' sx={{ mb: 2, mt: 2 }}>
                Edit Post
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label='Post Title'
                    name='title'
                    variant='outlined'
                    fullWidth
                    value={title}
                    onChange={handleTitleChange}
                    sx={{ mb: 2, mt: 2 }}
                    slotProps={{ input: { style: { fontSize: '1.5rem' } } }}
                />

                <Grid
                    container
                    spacing={2}
                    sx={{ height: 'calc(100vh - 200px)' }}
                >
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Paper
                            elevation={3}
                            sx={{
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                            }}
                        >
                            <Typography
                                variant='h6'
                                sx={{
                                    p: 2,
                                    borderBottom: 1,
                                    borderColor: 'divider',
                                }}
                            >
                                Editor
                            </Typography>
                            <TextField
                                multiline
                                fullWidth
                                variant='outlined'
                                name='content'
                                value={markdownContent}
                                onChange={handleMarkdownChange}
                                placeholder='Write your content in markdown format...'
                                sx={{
                                    flex: 1,
                                    '& .MuiOutlinedInput-root': {
                                        height: '100%',
                                    },
                                    '& .MuiInputBase-inputMultiline': {
                                        height: '100% !important',
                                        overflowY: 'auto',
                                        fontFamily: 'monospace',
                                        p: 2,
                                    },
                                }}
                            />
                        </Paper>
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <Paper
                            elevation={3}
                            sx={{
                                height: '100%',
                                overflowY: 'auto',
                                p: 0,
                            }}
                        >
                            <Typography
                                variant='h6'
                                sx={{
                                    p: 2,
                                    borderBottom: 1,
                                    borderColor: 'divider',
                                }}
                            >
                                Preview
                            </Typography>
                            <Box sx={{ p: 2 }}>
                                <Typography variant='h1' gutterBottom>
                                    {title}
                                </Typography>
                                <Markdown
                                    components={
                                        safeMarkdownOptions.components
                                    }
                                >
                                    {renderedContent}
                                </Markdown>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
                <Box
                    sx={{
                        mt: 2,
                        display: 'flex',
                        justifyContent: 'flex-end',
                    }}
                >
                    <Button
                        type='submit'
                        variant='contained'
                        color='primary'
                        size='large'
                    >
                        Publish Post
                    </Button>
                </Box>
            </form>
        </Container>
    );
};

export default EditPost;
