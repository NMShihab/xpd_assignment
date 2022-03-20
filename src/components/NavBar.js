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
                <NavLink href="/get-form/">Form</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="https://github.com/reactstrap/reactstrap">
                  Update
                </NavLink>
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
