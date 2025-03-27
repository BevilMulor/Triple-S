
import { useNavigate } from "react-router-dom";
import { Card, Container, Row, Col, Button } from 'react-bootstrap';

const AdminLandingPage = () => {
  const navigate = useNavigate();

  const handleToAdminReg = () => {
    console.log('go to admin reg clicked');
    navigate('/admin-register');
  }

  const handleToAdminLogin = () => {
    console.log('go to admin login clicked');
    navigate('/admin-login');
  }
  
  return (
    <div className="vh-100 d-flex align-items-center bg-light">
      <Container>
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <Card className="shadow-lg border-0 rounded-lg">
              <Card.Header className="bg-primary text-white text-center py-4">
                <h1 className="m-0">Administrator Portal</h1>
              </Card.Header>
              <Card.Body className="p-5">
                <div className="text-center mb-4">
                  <h2 className="h4 text-gray-900 mb-4">Welcome to Admin Management</h2>
                </div>
                <Row className="g-3">
                  <Col md={6}>
                    <Card className="h-100 border-primary">
                      <Card.Body className="text-center">
                        <h3 className="h5 mb-3">New Administrator</h3>
                        <p className="text-muted mb-3">Create a new administrator account</p>
                        <Button 
                          variant="outline-primary" 
                          size="lg" 
                          onClick={handleToAdminReg}
                          className="w-100"
                        >
                          Sign Up
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col md={6}>
                    <Card className="h-100 border-success">
                      <Card.Body className="text-center">
                        <h3 className="h5 mb-3">Existing Administrator</h3>
                        <p className="text-muted mb-3">Access your administrator account</p>
                        <Button 
                          variant="outline-success" 
                          size="lg" 
                          onClick={handleToAdminLogin}
                          className="w-100"
                        >
                          Login
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default AdminLandingPage;