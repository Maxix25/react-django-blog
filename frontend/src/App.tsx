import './App.css';
import { Routes, Route } from 'react-router-dom';
import Blog from './pages/blog/Blog';

function App() {
    return (
        <Routes>
            <Route path='/' element={<Blog />} />
        </Routes>
    );
}

export default App;
