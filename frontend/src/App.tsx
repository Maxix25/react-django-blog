import './App.css';
import { Routes, Route } from 'react-router-dom';
import Blog from './pages/blog/Blog';
import SignIn from './pages/sign-in/SignIn';
import CreatePost from './pages/create-post/CreatePost';
import ViewPost from './pages/view-post/ViewPost';
import ProtectedRoute from './components/ProtectedRoute';
import NotFound from './pages/NotFound';

function App() {
    return (
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
            <Route path='*' element={<NotFound />} />
        </Routes>
    );
}

export default App;
