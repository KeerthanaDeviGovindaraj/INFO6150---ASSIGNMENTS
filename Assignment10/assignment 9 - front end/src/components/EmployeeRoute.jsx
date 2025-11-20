import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const EmployeeRoute = ({ children }) => {
  const { isAuthenticated, userType } = useSelector((state) => state.auth);
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (userType !== 'employee') {
    return <Navigate to="/admin/employees" replace />;
  }
  
  return children;
};

export default EmployeeRoute;