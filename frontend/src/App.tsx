import './App.css';
import { Routes, Route } from 'react-router-dom';
import Blog from './pages/blog/Blog';
import SignIn from './pages/sign-in/SignIn';

function App() {
    return (
        <Routes>
            <Route path='/' element={<Blog />} />
            <Route path='/login' element={<SignIn />} />
        </Routes>
    );
}

export default App;
