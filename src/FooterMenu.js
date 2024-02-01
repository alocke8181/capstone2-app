import React from "react";
import { Link } from "react-router-dom";

const FooterMenu = ()=>{

    return (
        <div style={{borderTop: '2px solid black'}}>
            <p>Created by Alex Locke for the Springboard Software Engineering Program, February 2024</p>
            <ul>
                <li>
                    <Link to='https://www.linkedin.com/in/alex-locke-2019/'>LinkedIn</Link>
                </li>
                <li>
                    alocke_8181@yahoo.com
                </li>
            </ul>
        </div>

    )

}

export default FooterMenu;