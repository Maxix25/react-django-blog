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

// Tipo para los datos del post
interface Post {
    id: string;
    title: string;
    content: string;
    author: string;
    publishedDate: string;
}

// Opciones para renderizar markdown de forma segura

const ViewPost = () => {
    const { postId } = useParams<{ postId: string }>();
    const [post, setPost] = useState<Post | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Función para cargar los datos del post
        const fetchPost = async () => {
            setLoading(true);
            try {
                // Aquí deberías hacer una llamada a tu API
                // Por ahora, simulamos una respuesta con datos de ejemplo
                // fetch(`/api/posts/${postId}`)
                // const response = await fetch(`/api/posts/${postId}`);
                // const data = await response.json();

                // Datos de ejemplo (reemplazar con llamada real a API)
                const mockPost: Post = {
                    id: postId || '1',
                    title: 'Introducción a React y Django',
                    content: `## Cómo integrar React con Django

Un blog moderno necesita un frontend potente y un backend sólido.

\`\`\`javascript
// Ejemplo de componente React
function BlogPost({ title, content }) {
  return (
    <article>
      <h1>{title}</h1>
      <div className="content">{content}</div>
    </article>
  );
}
\`\`\`

### Ventajas de esta arquitectura

- **Frontend**: React ofrece una experiencia de usuario fluida
- **Backend**: Django proporciona un ORM potente y admin incluido
- **API**: Django Rest Framework simplifica la creación de APIs

\`\`\`python
# Vista de Django Rest Framework
class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
\`\`\``,
                    author: 'María González',
                    publishedDate: '2025-02-15T14:30:00Z',
                };

                setTimeout(() => {
                    setPost(mockPost);
                    setLoading(false);
                }, 500); // Simular carga
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

    // Formatear la fecha para mostrarla de forma amigable
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
                                label={`Autor: ${post.author}`}
                                variant='outlined'
                                color='primary'
                            />
                            <Chip
                                icon={<CalendarTodayIcon />}
                                label={`Publicado: ${formatDate(
                                    post.publishedDate
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
