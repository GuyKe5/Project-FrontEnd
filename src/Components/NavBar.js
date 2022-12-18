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
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/ListQuestions" >Questions</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      

      </div>
    );
}

export default NavBar;