import React, {useEffect} from "react";
import { Navigate } from "react-router";
import { useNavigate } from "react-router";

const Logout = ({logout})=>{
   
    const nav = useNavigate();

    useEffect(()=>{
        logout();
        nav('/');
    })

    return(
        <Navigate to='/' />
    )


}

export default Logout;