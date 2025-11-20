import { useEffect, useState } from 'react';
import { Card, Row, Col, Container, Spinner, Alert, Badge, Pagination } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { apiService } from '../../services/apiService';
import { setJobs, setLoading, setError } from '../../store/slices/jobSlice';

const Jobs = () => {
  const dispatch = useDispatch();
  const { jobs, loading, error } = useSelector((state) => state.jobs);

  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 6;

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      dispatch(setLoading(true));
      const response = await apiService.getAllJobs();
      dispatch(setJobs(response.jobs));
    } catch (error) {
      console.error('Error fetching jobs:', error);
      dispatch(setError(error.message || 'Failed to fetch jobs'));
    }
  };

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(jobs.length / jobsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p className="mt-3">Loading jobs...</p>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Available Jobs</h2>
      
      {error && <Alert variant="danger">{error}</Alert>}
      
      {/* Show total count and current page */}
      {jobs.length > 0 && (
        <Alert variant="info" className="mb-4">
          Showing {indexOfFirstJob + 1}-{Math.min(indexOfLastJob, jobs.length)} of {jobs.length} jobs
        </Alert>
      )}
      
      {jobs.length === 0 ? (
        <Alert variant="info">No jobs available at the moment.</Alert>
      ) : (
        <>
          <Row>
            {currentJobs.map((job) => (
              <Col md={6} lg={4} key={job._id} className="mb-4">
                <Card className="h-100 shadow-sm">
                  <Card.Body>
                    <Card.Title className="text-primary">{job.jobTitle}</Card.Title>
                    <Card.Subtitle className="mb-3 text-muted">
                      {job.companyName}
                    </Card.Subtitle>
                    <Card.Text className="mb-3">
                      {job.description}
                    </Card.Text>
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <strong>Salary:</strong>
                        <Badge bg="success" className="ms-2">
                          ${job.salary.toLocaleString()}
                        </Badge>
                      </div>
                    </div>
                  </Card.Body>
                  <Card.Footer className="text-muted">
                    <small>
                      Posted: {new Date(job.createdAt).toLocaleDateString()}
                    </small>
                  </Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="d-flex justify-content-center mt-4 mb-4">
              <Pagination>
                <Pagination.First 
                  onClick={() => paginate(1)} 
                  disabled={currentPage === 1}
                />
                <Pagination.Prev 
                  onClick={() => paginate(currentPage - 1)} 
                  disabled={currentPage === 1}
                />
                
                {[...Array(totalPages)].map((_, index) => (
                  <Pagination.Item
                    key={index + 1}
                    active={index + 1 === currentPage}
                    onClick={() => paginate(index + 1)}
                  >
                    {index + 1}
                  </Pagination.Item>
                ))}
                
                <Pagination.Next 
                  onClick={() => paginate(currentPage + 1)} 
                  disabled={currentPage === totalPages}
                />
                <Pagination.Last 
                  onClick={() => paginate(totalPages)} 
                  disabled={currentPage === totalPages}
                />
              </Pagination>
            </div>
          )}
        </>
      )}
    </Container>
  );
};

export default Jobs;