import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import logo from "../logo.svg";

function AppNavbar() {
  function signOut(){
      console.log('hi')
  }

  function delete_cookie() {
    document.cookie = document.cookie +
        ";expires=Thu, 01 Jan 1970 00:00:01 GMT";
    
  }
  

  return (
    <div>
      <Navbar bg="primary" variant="dark">
        <Navbar.Brand as={Link} to="/">
          <img data-test="theLogo" src={logo} alt="logo" width="50" />
        </Navbar.Brand>
        <Nav className="ml-auto">
          <NavDropdown
            className="pl-3"
            alignRight
            title={<span className="text-white my-auto">Menu</span>}
          >
            <NavDropdown.Item
              data-test="theQuickLinksOption"
              as={Link}
              to="/useraccount"
            >
              View Account
            </NavDropdown.Item>
            <NavDropdown.Item
              data-test="theQuickLinksOption"
              as={Link}
              to="/"
              onClick={delete_cookie}
              
            >
              Sign Out
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar>
    </div>
  );
}

export default AppNavbar;