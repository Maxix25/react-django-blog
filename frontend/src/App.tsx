import { Routes, Route } from 'react-router-dom';
import Blog from './pages/blog/Blog';
import SignIn from './pages/SignIn';
import CreatePost from './pages/CreatePost';
import ViewPost from './pages/ViewPost';
import ProtectedRoute from './components/ProtectedRoute';
import NotFound from './pages/NotFound';
import YourPosts from './pages/YourPosts';
import SignUp from './pages/SignUp';
import AppAppBar from './pages/blog/components/AppAppBar';
import AppTheme from './shared-theme/AppTheme';
import EditPost from './pages/EditPost';
import { Container, CssBaseline } from '@mui/material';
import Footer from './pages/blog/components/Footer';
import { ToastContainer } from 'react-toastify';

function App() {
    return (
        <AppTheme>
            <ToastContainer position='top-center' />
            <Container
                sx={{
                    mb: 'calc(var(--template-frame-height, 0px) + 28px)',
                }}
            >
                <CssBaseline enableColorScheme />
                <AppAppBar />
            </Container>
            <Routes>
                <Route path='/' element={<Blog />} />
                <Route path='/login' element={<SignIn />} />
                <Route
                    path='/posts/create'
                    element={
                        <ProtectedRoute>
                            <CreatePost />
                        </ProtectedRoute>
                    }
                />
                <Route path='/posts' element={<ViewPost />} />
                <Route
                    path='/posts/your-posts'
                    element={
                        <ProtectedRoute>
                            <YourPosts />
                        </ProtectedRoute>
                    }
                />
                <Route path='/signup' element={<SignUp />} />
                <Route
                    path='/posts/edit'
                    element={
                        <ProtectedRoute>
                            <EditPost />
                        </ProtectedRoute>
                    }
                />

                <Route path='*' element={<NotFound />} />
            </Routes>
            <Footer />
        </AppTheme>
    );
}

export default App;
