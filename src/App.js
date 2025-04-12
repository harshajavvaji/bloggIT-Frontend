import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import Blog from './pages/Blog/Blog';
import SignUp from './pages/SignUp/SignUp';


function App() {
  return (
    <Router >
    <div>
      {/* {isLoggedIn && <Navbar setIsLoggedIn={setIsLoggedIn} />} */}
      <Routes>
        {<Route path="/login" element={<Login/>} />}
        <Route path="/register" element={<SignUp />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/blog/:id" element={<Blog />} />
      </Routes>
    </div>
  </Router >
  );
}

export default App;
