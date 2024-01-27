import React, {useState, useEffect} from "react";
import { useParams, useNavigate } from "react-router";
import checkAuthOrAdmin from "./Helpers";
import {Card, CardBody, CardHeader} from 'react-bootstrap';
import { Link } from "react-router-dom";

const UserEdit = ({editUser}) =>{
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
    const {id} = useParams();
    const nav = useNavigate();

    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        console.log(checkAuthOrAdmin(user,id));
        if(!checkAuthOrAdmin(user, id)){
            nav('/403');
        }
    },[]);

    const [formData, setFormData] = useState({
        password: '',
        email : user.email
    });

    const handleChange = (e)=>{
        const {name,value} = e.target;
        setFormData((data)=>({
            ...data,
            [name]: value
        }));
    }

    async function handleSubmit(e){
        e.preventDefault();
        setLoading(true);
        const userIDReturn = await editUser(formData, id);
        nav(`/users/${userIDReturn}`);
    };

    return (
        <Card>
            <CardHeader>
                {loading ? <p><b>Updating...</b></p> : <p>Edit Profile</p>}
            </CardHeader>
            <CardBody>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="password">Password: </label>
                    <input 
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    <label htmlFor="email">Email: </label>
                    <input 
                        type="text"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <button>Submit</button>
                </form>
                <Link to={`/users/${user.username}/delete`} >Delete Profile</Link>
            </CardBody>
        </Card>
    )

}

export default UserEdit;