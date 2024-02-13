import React, { useState, useEffect } from "react";
import {NavLink} from 'react-router-dom';
import {Navbar, Nav, NavItem} from 'react-bootstrap';

const NavBar = () =>{

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))

    useEffect(()=>{
        setUser(JSON.parse(localStorage.getItem('user')))
    },[])
    return(
        <div style={{borderBottom: '2px solid black'}}>
            <Navbar expand='md'>
                <NavLink to='/'>
                    Home
                </NavLink>

                <Nav className="ml-auto" navbar>
                    {user ? 
                        <><NavItem>
                            <NavLink to={`/users/${user.id}`}>Profile</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink to='/logout'>Logout</NavLink>
                        </NavItem></>
                    : 
                        <><NavItem>
                            <NavLink to='/login'>Login</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink to='/register'>Register</NavLink>
                        </NavItem></> 
                    }
                </Nav>
            </Navbar>
        </div>
    )
}

export default NavBar;