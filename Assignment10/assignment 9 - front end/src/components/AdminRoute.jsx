import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AdminRoute = ({ children }) => {
  const { isAuthenticated, userType } = useSelector((state) => state.auth);
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (userType !== 'admin') {
    return <Navigate to="/jobs" replace />;
  }
  
  return children;
};

export default AdminRoute;