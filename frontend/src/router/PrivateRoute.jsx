import { Navigate } from 'react-router-dom';

function PrivateRoute({ login, children }) {
  if (login) {
    return <Navigate to="/dashboard" />;
  } else {
    return children;
  }
}

export default PrivateRoute;
