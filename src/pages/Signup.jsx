// src/pages/Signup.jsx
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { signup } from '../services/api';

const Signup = () => {
  const { login } = useContext(AuthContext);
  const [first_name, setFirstName] = useState('');
  const [family_name, setFamilyName] = useState('');
  const [user_name, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const user = { first_name, family_name, user_name, password };
      const response = await signup(user);
      const { token, user: signedUpUser } = response;
      login(token, signedUpUser);
      navigate('/');
    } catch (error) {
      setError(error.message || 'Signup failed');
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
        <div>
          <label>First Name:</label>
          <input type="text" value={first_name} onChange={(e) => setFirstName(e.target.value)} />
        </div>
        <div>
          <label>Last Name:</label>
          <input type="text" value={family_name} onChange={(e) => setFamilyName(e.target.value)} />
        </div>
        <div>
          <label>Username:</label>
          <input type="text" value={user_name} onChange={(e) => setUserName(e.target.value)} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">Signup</button>
      </form>
      {error && <div>{error}</div>}
    </div>
  );
};

export default Signup;
