import React from "react";
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavLink,
  NavbarToggler,
  Collapse,
  NavItem,
  NavbarText,
} from "reactstrap";

const NavBar = () => {
  return (
    <>
      <div>
        <Navbar color="light" expand="md" light>
          <NavbarBrand href="/">Home</NavbarBrand>
          <NavbarToggler onClick={function noRefCheck() {}} />
          <Collapse navbar>
            <Nav className="me-auto" navbar>
              <NavItem>
                <NavLink href="/get-form/">Submit form </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/update-form/">Update form</NavLink>
              </NavItem>
            </Nav>
            <NavbarText>Simple Text</NavbarText>
          </Collapse>
        </Navbar>
      </div>
    </>
  );
};

export default NavBar;
