import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Header = () => {
  const { auth, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header>
      <h1>My Blog</h1>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/blogs">Blogs</Link>
        {auth.token ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link> {/* Add Signup link */}
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
