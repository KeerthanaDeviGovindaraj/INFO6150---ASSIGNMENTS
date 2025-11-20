import { useEffect, useState } from 'react';
import { Table, Container, Spinner, Alert } from 'react-bootstrap';
import { apiService } from '../../services/apiService';

const Employees = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await apiService.getAllUsers();
      setUsers(response.users);
      setError('');
    } catch (error) {
      console.error('Error fetching users:', error);
      setError('Failed to fetch users. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p className="mt-3">Loading users...</p>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <h2 className="mb-4">All Employees</h2>
      
      {error && <Alert variant="danger">{error}</Alert>}
      
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="3" className="text-center">No users found</td>
            </tr>
          ) : (
            users.map((user) => (
              <tr key={user._id}>
                <td>{user.fullName}</td>
                <td>{user.email}</td>
                <td>
                  <span className={`badge ${user.type === 'admin' ? 'bg-danger' : 'bg-primary'}`}>
                    {user.type}
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default Employees;