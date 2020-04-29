import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import { Link, useHistory } from "react-router-dom";

const Header = (props) => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => setCollapsed(!collapsed);

  let history = useHistory();

  const logout = (e) => {
    e.preventDefault();
    localStorage.clear();
    history.push("/login");
  };

  return (
    <div className='header'>
      <Navbar color='faded' light>
        <NavbarBrand href='/' className='mr-auto'>
          <h1 className='logo'>Dev Desk</h1>
        </NavbarBrand>
        <NavbarToggler onClick={toggleNavbar} className='mr-2' />
        <Collapse isOpen={!collapsed} navbar>
          <Nav navbar>
            <NavItem>
              <NavLink tag={Link} to='/signup'>
                Sign Up
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to='/login'>
                Log In
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink onClick={logout}>Log Out</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
