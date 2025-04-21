import { Routes, Route } from 'react-router-dom';
import Blog from './pages/blog/Blog';
import SignIn from './pages/sign-in/SignIn';
import CreatePost from './pages/create-post/CreatePost';
import ViewPost from './pages/view-post/ViewPost';
import ProtectedRoute from './components/ProtectedRoute';
import NotFound from './pages/NotFound';
import YourPosts from './pages/your-posts/YourPosts';
import SignUp from './pages/sign-up/SignUp';
import AppAppBar from './pages/blog/components/AppAppBar';
import AppTheme from './shared-theme/AppTheme';
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

                <Route path='*' element={<NotFound />} />
            </Routes>
            <Footer />
        </AppTheme>
    );
}

export default App;
