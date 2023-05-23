import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import { Link } from "react-router-dom";
function NavBar(){
return(
<div>
      <Navbar bg="dark" variant="dark" style={{}}>
        <Container>
        <Navbar.Brand  href="#home">CSQP</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/ListCourses" >Courses</Nav.Link>
            <Nav.Link as={Link} to="/AddCourse"> Create Course </Nav.Link>
            <Nav.Link as={Link} to="/MyCourses"> My Courses</Nav.Link>
            <Nav.Link as={Link} to="/Login"> Login </Nav.Link>
            <Nav.Link as={Link} to="/SignOut"> Sign Out </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      

      </div>
    );
}

export default NavBar;