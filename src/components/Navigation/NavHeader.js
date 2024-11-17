import React from 'react';
import "./NavHeader.scss";
import { Link, NavLink, useLocation, useHistory } from "react-router-dom";
import { useState, useEffect, useContext } from 'react';
import { UserContext } from "../../context/UserContext";

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import logo from "../../logo.jpeg";
import { logoutUser } from '../../services/userService';
import { toast } from "react-toastify";


const NavHeader = (props) => {
    const {user, logoutContext} = useContext(UserContext);
    const location = useLocation();
    const history = useHistory();
    const handleLogout = async () => {
        let data = await logoutUser();
        localStorage.removeItem("jwt");
        logoutContext();
        if (data && +data.EC === 0) {
            toast.success("Logout success");
            history.push("/login");
            // window.location.reload();
        }
        else {
            toast.error(data.EM);
        }
    }

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
                                    <NavLink to="/roles" className="nav-link">Roles</NavLink>
                                    <NavLink to="/projects" className="nav-link">Projects</NavLink>
                                    <NavLink to="/about" className="nav-link">About</NavLink>
                                </Nav>
                                <Nav>
                                    {
                                        user && user.isAuthenticated === true
                                        ?
                                        <>
                                            <Nav.Item className="nav-link">
                                                Welcome {user.account.username} !
                                            </Nav.Item>

                                            <NavDropdown title="Settings" id="collapsible-nav-dropdown">
                                                <NavDropdown.Item>
                                                    Change password
                                                </NavDropdown.Item>
                                                <NavDropdown.Divider />
                                                <NavDropdown.Item>
                                                    <span onClick={() => handleLogout()}>
                                                        Logout
                                                    </span>
                                                </NavDropdown.Item>
                                            </NavDropdown>
                                        </>
                                        :
                                        <Link className="nav-link" to="/login">
                                            Login
                                        </Link>
                                    }
                                    
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