import Avatar from '@mui/material/Avatar';
import { useState, useEffect } from 'react';
import AvatarGroup from '@mui/material/AvatarGroup';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid2';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import { styled } from '@mui/material/styles';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import RssFeedRoundedIcon from '@mui/icons-material/RssFeedRounded';
import getAllPosts from '../../../api/posts/getAllPost';
import { Post } from '../../../interfaces/posts.interface';
import { Link } from 'react-router-dom';

const SyledCard = styled(Card)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    padding: 0,
    height: '100%',
    backgroundColor: theme.palette.background.paper,
    '&:hover': {
        backgroundColor: 'transparent',
        cursor: 'pointer',
    },
    '&:focus-visible': {
        outline: '3px solid',
        outlineColor: 'hsla(210, 98%, 48%, 0.5)',
        outlineOffset: '2px',
    },
}));

const SyledCardContent = styled(CardContent)({
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    padding: 16,
    flexGrow: 1,
    '&:last-child': {
        paddingBottom: 16,
    },
});

const StyledTypography = styled(Typography)({
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 2,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
});

// Format date to a more readable format
const formatDate = (dateString: string): string => {
    if (!dateString) return '';

    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;

    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    }).format(date);
};

const Author = ({
    authors,
    post,
}: {
    authors: { name: string; avatar: string }[];
    post: Post;
}) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: 2,
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 1,
                    alignItems: 'center',
                }}
            >
                <AvatarGroup max={3}>
                    {authors.map((author, index) => (
                        <Avatar
                            key={index}
                            alt={author.name}
                            src={author.avatar}
                            sx={{ width: 24, height: 24 }}
                        />
                    ))}
                </AvatarGroup>
                <Typography variant='caption'>
                    {authors.map((author) => author.name).join(', ')}
                </Typography>
            </Box>
            <Typography key={post.id} variant='caption'>
                {formatDate(post.date_posted)}
            </Typography>
        </Box>
    );
};

export const Search = () => {
    return (
        <FormControl
            sx={{ width: { xs: '100%', md: '25ch' } }}
            variant='outlined'
        >
            <OutlinedInput
                size='small'
                id='search'
                placeholder='Search…'
                sx={{ flexGrow: 1 }}
                startAdornment={
                    <InputAdornment
                        position='start'
                        sx={{ color: 'text.primary' }}
                    >
                        <SearchRoundedIcon fontSize='small' />
                    </InputAdornment>
                }
                inputProps={{
                    'aria-label': 'search',
                }}
            />
        </FormControl>
    );
};

const MainContent = () => {
    const [focusedCardIndex, setFocusedCardIndex] = useState<number | null>(
        null
    );
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const data = await getAllPosts();
            setPosts(data);
        };
        fetchPosts();
    }, []);

    const handleFocus = (index: number) => {
        setFocusedCardIndex(index);
    };

    const handleBlur = () => {
        setFocusedCardIndex(null);
    };

    // Mock author data until backend provides it

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <div>
                <Typography variant='h1' gutterBottom>
                    Welcome to MaxiBlog!
                </Typography>
            </div>
            <Box
                sx={{
                    display: { xs: 'flex', sm: 'none' },
                    flexDirection: 'row',
                    gap: 1,
                    width: { xs: '100%', md: 'fit-content' },
                    overflow: 'auto',
                }}
            >
                <Search />
                <IconButton size='small' aria-label='RSS feed'>
                    <RssFeedRoundedIcon />
                </IconButton>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column-reverse', md: 'row' },
                    width: '100%',
                    justifyContent: 'space-between',
                    alignItems: { xs: 'start', md: 'center' },
                    gap: 4,
                    overflow: 'auto',
                }}
            >
                <Box
                    sx={{
                        display: { xs: 'none', sm: 'flex' },
                        flexDirection: 'row',
                        gap: 1,
                        width: { xs: '100%', md: 'fit-content' },
                        overflow: 'auto',
                        justifyContent: 'flex-end',
                    }}
                >
                    <IconButton size='small' aria-label='RSS feed'>
                        <RssFeedRoundedIcon />
                    </IconButton>
                    <Search />
                </Box>
            </Box>
            <Grid container spacing={2} columns={12}>
                <Typography variant='h6' sx={{ mb: 2 }}>
                    Latest Posts
                </Typography>
                {posts.map((post, index) => {
                    // Determine layout based on index
                    let gridSize = { xs: 12, md: 4 };
                    if (index === 0 || index === 1) {
                        gridSize = { xs: 12, md: 6 };
                    }

                    // Set image display for different layouts

                    return (
                        <Link
                            style={{
                                textDecoration: 'none',
                                color: 'inherit',
                                width: '100%',
                            }}
                            key={post.id || index}
                            to={`/posts?id=${post.id}`}
                        >
                            <Grid size={gridSize}>
                                {index === 3 || index === 4 ? (
                                    // Special layout for stacked cards 3 and 4
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: 2,
                                            height: '100%',
                                        }}
                                    >
                                        <SyledCard
                                            variant='outlined'
                                            onFocus={() => handleFocus(index)}
                                            onBlur={handleBlur}
                                            tabIndex={0}
                                            className={
                                                focusedCardIndex === index
                                                    ? 'Mui-focused'
                                                    : ''
                                            }
                                            sx={{ height: '100%' }}
                                        >
                                            <SyledCardContent
                                                sx={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    justifyContent:
                                                        'space-between',
                                                    height: '100%',
                                                }}
                                            >
                                                <div>
                                                    <Typography
                                                        gutterBottom
                                                        variant='h6'
                                                        component='div'
                                                    >
                                                        {post.title}
                                                    </Typography>
                                                    <StyledTypography
                                                        variant='body2'
                                                        color='text.secondary'
                                                        gutterBottom
                                                    >
                                                        {post.content}
                                                    </StyledTypography>
                                                </div>
                                            </SyledCardContent>
                                            <Author
                                                authors={
                                                    Array.isArray(post.author)
                                                        ? post.author.map(
                                                              (author) => ({
                                                                  name: author.username,
                                                                  avatar: '',
                                                              })
                                                          )
                                                        : []
                                                }
                                                post={post}
                                            />
                                        </SyledCard>
                                    </Box>
                                ) : (
                                    // Standard layout for other cards
                                    <SyledCard
                                        variant='outlined'
                                        onFocus={() => handleFocus(index)}
                                        onBlur={handleBlur}
                                        tabIndex={0}
                                        className={
                                            focusedCardIndex === index
                                                ? 'Mui-focused'
                                                : ''
                                        }
                                        sx={{ height: '100%' }}
                                    >
                                        <SyledCardContent>
                                            <Typography
                                                gutterBottom
                                                variant='h6'
                                                component='div'
                                            >
                                                {post.title}
                                            </Typography>
                                            <StyledTypography
                                                variant='body2'
                                                color='text.secondary'
                                                gutterBottom
                                            >
                                                {post.content}
                                            </StyledTypography>
                                        </SyledCardContent>
                                        <Author
                                            authors={
                                                Array.isArray(post.author)
                                                    ? post.author.map(
                                                          (author) => ({
                                                              name: author.username,
                                                              avatar: '',
                                                          })
                                                      )
                                                    : [
                                                          {
                                                              name: post.author
                                                                  .username,
                                                              avatar: '',
                                                          },
                                                      ]
                                            }
                                            post={post}
                                        />
                                    </SyledCard>
                                )}
                            </Grid>
                        </Link>
                    );
                })}
                {/* Show placeholder cards if not enough posts */}
                {posts.length === 0 && (
                    <Grid size={{ xs: 12 }}>
                        <Typography variant='body1' align='center'>
                            Loading posts...
                        </Typography>
                    </Grid>
                )}
            </Grid>
        </Box>
    );
};

export default MainContent;
