// src/components/PrivateRoute.jsx
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';

const isAuthenticated = () => {
  return localStorage.getItem('token');
};

const PrivateRoute = ({ component: Component }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  return <Component />;
};

PrivateRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
};

export default PrivateRoute;
