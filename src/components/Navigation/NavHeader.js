import React from 'react';
import "./NavHeader.scss";
import { NavLink, useLocation } from "react-router-dom";
import { useState, useEffect, useContext } from 'react';
import { UserContext } from "../../context/UserContext";

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';

import logo from "../../logo.jpeg";

const NavHeader = (props) => {
    const {user} = useContext(UserContext);
    const location = useLocation();
    if (user && user.isAuthenticated === true || location.pathname === "/") {
        return (
            <>
                <div className="nav-header">
                    <Navbar bg="header" expand="lg">
                        <Container>
                            <Navbar.Brand href="#home">
                                <img 
                                    src={logo}
                                    width="35"
                                    className="d-inline-block align-top"
                                />
                                <span className="brand-name">
                                    React
                                </span>
                            </Navbar.Brand>
                            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                            <Navbar.Collapse id="responsive-navbar-nav">
                                <Nav className="me-auto">
                                    <NavLink to="/" exact className="nav-link">Home</NavLink>
                                    <NavLink to="/users" className="nav-link">Users</NavLink>
                                    <NavLink to="/projects" className="nav-link">Projects</NavLink>
                                    <NavLink to="/about" className="nav-link">About</NavLink>
                                </Nav>
                                <Nav>
                                    <Nav.Item className="nav-link">
                                        Welcome
                                    </Nav.Item>
                                    <NavDropdown title="Dropdown" id="collapsible-nav-dropdown">
                                        <NavDropdown.Item href="#action/3.1">
                                            Change password
                                        </NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item href="#action/3.4">
                                            Logout
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                </Nav>
                            </Navbar.Collapse>
                        </Container>
                        
                    </Navbar>
                </div>
                {/* <div className="topnav">
                    <NavLink to="/" exact>Home</NavLink>
                    <NavLink to="/users">Users</NavLink>
                    <NavLink to="/projects">Projects</NavLink>
                    <NavLink to="/about">About</NavLink>
                </div> */}
            </>
        );
    }
    else {
        return <></>;
    }
}

export default NavHeader;