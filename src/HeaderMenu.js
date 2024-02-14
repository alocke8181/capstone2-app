import React, {useContext } from "react";
import {NavLink} from 'react-router-dom';
import {Navbar, Nav, NavItem} from 'react-bootstrap';
import UserContext from "./UserContext";
import './HeaderMenu.css';

const NavBar = () =>{

    const {user, setUser} = useContext(UserContext);
    
    return(
        <div id="header">
            <div>
                <NavLink to='/'>
                    <h1>The Starting Tavern</h1>
                </NavLink>
            </div>
            <div>
                {user ? 
                        <ul>
                            <li><NavLink to={`/users/${user.id}`}>Your Party</NavLink></li>
                            <li><NavLink to='/logout'>Check-Out</NavLink></li>
                        </ul>
                    : 
                        <ul>
                            <li><NavLink to='/login'>Check-In</NavLink></li>
                            <li><NavLink to='/register'>Book a Room</NavLink></li>
                        </ul> 
                    }
            </div>    

                    
        </div>
    )
}

export default NavBar;