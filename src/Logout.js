import React from "react";
import { Navigate } from "react-router";

const Logout = ({logout})=>{
   
    logout();

    return(
        <Navigate to='/' />
    )


}

export default Logout;