import PropTypes from 'prop-types'; 
import { Navigate } from 'react-router-dom';
import { auth } from '../firebase-config'; // Ensure you import your Firebase auth setup

function ProtectedRoute({ children }) {
  const user = auth.currentUser;

  return user ? children : <Navigate to="/" />;
}
ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired, // Ensures that children are passed and are valid
  };

export default ProtectedRoute;