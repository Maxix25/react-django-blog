import './App.css';
import { Routes, Route } from 'react-router-dom';
import Blog from './pages/blog/Blog';
import SignIn from './pages/sign-in/SignIn';
import CreatePost from './pages/create-post/CreatePost';
import ViewPost from './pages/view-post/ViewPost';

function App() {
    return (
        <Routes>
            <Route path='/' element={<Blog />} />
            <Route path='/login' element={<SignIn />} />
            <Route path='/posts/create' element={<CreatePost />} />
            <Route path='/posts' element={<ViewPost />} />
        </Routes>
    );
}

export default App;
