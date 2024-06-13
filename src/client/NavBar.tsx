import { Link, NavLink } from "react-router-dom";
import { Nav, NavItem } from "reactstrap";
import "./NavBar.css";

/** Top navigation bar for site. */

function NavBar() {
  console.log("* NavBar");

  return (
    <nav className="NavBar navbar navbar-expand-md">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Pixly
        </Link>
        <Nav className="ms-auto" navbar>
          <NavItem>
            <NavLink to="/images" end>images</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/images/upload" end>Upload!</NavLink>
          </NavItem>
        </Nav>
      </div>
    </nav>
  );
}

export default NavBar;