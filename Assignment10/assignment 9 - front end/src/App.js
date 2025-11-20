import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from './components/Navbar/Navbar';
import AdminRoute from './components/AdminRoute';
import EmployeeRoute from './components/EmployeeRoute';

import Home from './pages/Home/Home';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import Login from './pages/Login/Login';
import CompanyShowcase from './pages/CompanyShowcase/CompanyShowcase';
import JobListings from './pages/JobListings/JobListings';

import Employees from './pages/Admin/Employees';
import AddJob from './pages/Admin/AddJob';

import Jobs from './pages/Employee/Jobs';

function App() {
  const { userType, isAuthenticated } = useSelector((state) => state.auth);

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          
          {/* Admin Routes */}
          <Route 
            path="/admin/employees" 
            element={
              <AdminRoute>
                <Employees />
              </AdminRoute>
            } 
          />
          <Route 
            path="/add-job" 
            element={
              <AdminRoute>
                <AddJob />
              </AdminRoute>
            } 
          />
          
          {/* Employee Routes */}
          <Route 
            path="/jobs" 
            element={
              <EmployeeRoute>
                <Jobs />
              </EmployeeRoute>
            } 
          />
          
          {/* Assignment 9 Routes - Employee Access */}
          <Route 
            path="/home" 
            element={
              <EmployeeRoute>
                <Home />
              </EmployeeRoute>
            } 
          />
          <Route 
            path="/about" 
            element={
              <EmployeeRoute>
                <About />
              </EmployeeRoute>
            } 
          />
          <Route 
            path="/contact" 
            element={
              <EmployeeRoute>
                <Contact />
              </EmployeeRoute>
            } 
          />
          <Route 
            path="/company-showcase" 
            element={
              <EmployeeRoute>
                <CompanyShowcase />
              </EmployeeRoute>
            } 
          />
          <Route 
            path="/job-listings" 
            element={
              <EmployeeRoute>
                <JobListings />
              </EmployeeRoute>
            } 
          />
          
          {/* Root Route - Redirect based on user type */}
          <Route 
            path="/" 
            element={
              isAuthenticated ? (
                userType === 'admin' ? (
                  <Navigate to="/admin/employees" replace />
                ) : (
                  <Navigate to="/jobs" replace />
                )
              ) : (
                <Navigate to="/login" replace />
              )
            } 
          />
          
          {/* Catch all - redirect to root */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>/
      </div>
    </Router>
  );
}

export default App;