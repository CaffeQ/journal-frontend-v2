import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import "./navbarComponent.css";

function NavbarComponent() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/home">Health Center</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link className="nav-link" to="/home">Home</Link>
            <Link className="nav-link" to="/journal">Journal</Link>
            <Link className="nav-link" to="/chats">Chats</Link>
            <Link className="nav-link" to="/login">Login</Link>
            <Link className="nav-link" to="/canvas">Canvas</Link>
            <Link className="nav-link" to="/search">Search</Link>
            <NavDropdown title="My Pages" id="basic-nav-dropdown">
              <Link className="nav-link" to="/details">Details</Link>
              <Link className="nav-link" to="/myConditions">Conditions</Link>
              <Link className="nav-link" to="/myMeetings">Meetings</Link>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default NavbarComponent;