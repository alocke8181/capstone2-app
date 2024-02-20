import React, {useState, useEffect, useContext} from "react";
import UserContext from "./UserContext";
import { useParams, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { checkAuthOrAdmin } from "./Helpers";

const UserDelete = ({deleteUser}) =>{

    const {user, token, setUser} = useContext(UserContext);
    const {id} = useParams();
    const nav = useNavigate();

    useEffect(()=>{
        if(!checkAuthOrAdmin(user, id)){
            nav('/403');
        };
        document.title = 'Delete Account'
    },[])

    async function onDelete(e){
        e.preventDefault();
        let resp = await deleteUser(id);
        nav('/');
    }

    return (
        <div>
            <p>Are you sure you want to delete your account?</p>
            <button onClick={onDelete}>Yes</button>
            <br/>
            <Link to={`/users/${id}`} ><h1>No</h1></Link>
        </div>
    )
}
export default UserDelete;