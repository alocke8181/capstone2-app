import React, {useState, useEffect} from "react";
import { useParams, useNavigate } from "react-router";
import checkAuthOrAdmin from "./Helpers";
import { Link } from "react-router-dom";

const UserDelete = ({deleteUser}) =>{

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))
    const {id} = useParams();
    const nav = useNavigate();

    useEffect(()=>{
        if(!checkAuthOrAdmin(user, id)){
            nav('/403');
        };
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