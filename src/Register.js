import React, {useState} from "react";
import { useNavigate } from "react-router";
import { Card, CardBody, CardHeader} from "react-bootstrap";

const Register = ({register}) =>{

    const nav = useNavigate();

    const [formData, setFormData] = useState({
        username : '',
        password : '',
        email : ''
    })

    const [loading, setLoading] = useState(false);

    const handleChange = (e)=>{
        const {name,value} = e.target;
        setFormData((data)=>({
            ...data,
            [name]: value
        }));
    };

    //Register and navigate to their profile page
    async function handleSubmit(e){
        e.preventDefault();
        setLoading(true);
        const id = await register(formData);
        nav(`/users/${id}`);
    }


    return (
        <Card>
            <CardHeader>
                {loading ? <p><b>Registering...</b></p> : <p>Register</p>}
            </CardHeader>
            <CardBody>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="username">Username</label>
                    <input 
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                    />
                    <label htmlFor="password">Password</label>
                    <input 
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    <label htmlFor="firstName">First Name</label>
                    <input 
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                    />
                    <label htmlFor="lastName">Last Name</label>
                    <input 
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                    />
                    <label htmlFor="email">Email</label>
                    <input 
                        type="text"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <button>Submit</button>
                </form>
            </CardBody>
        </Card>
    )
}

export default Register;