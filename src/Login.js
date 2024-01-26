import React, {useState} from "react";
import { useNavigate } from "react-router";
import { Card, CardBody, CardHeader } from "react-bootstrap";

const Login = ({login}) =>{

    const nav = useNavigate();

    const [formData, setFormData] = useState({
        username : '',
        password : ''
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e)=>{
        const {name,value} = e.target;
        setFormData((data)=>({
            ...data,
            [name]: value
        }));
    };

    //Login and navigate to their profile page
    async function handleSumbit(e){
        e.preventDefault();
        setLoading(true);
        const id = await login(formData);
        nav(`/users/${id}`);
    };

    return (
        <Card>
            <CardHeader>
                {loading ? <p><b>Logging In...</b></p> : <p>Login</p>}
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
                    <button>Submit</button>
                </form>
            </CardBody>
        </Card>
    )
}

export default Login;