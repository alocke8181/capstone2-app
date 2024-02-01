import React, {useState} from "react";
import { useNavigate } from "react-router";
import { Card, CardBody, CardHeader } from "react-bootstrap";

const Login = ({login}) =>{

    const nav = useNavigate();

    const [formData, setFormData] = useState({
        username : '',
        password : ''
    });

    const [errorMsg, setErrorMsg] = useState('');
    const [isError, setIsError] = useState(false);

    const [loading, setLoading] = useState(false);

    const handleChange = (e)=>{
        const {name,value} = e.target;
        setFormData((data)=>({
            ...data,
            [name]: value
        }));
    };

    //Login and navigate to their profile page
    async function handleSubmit(evt){
        try{
            evt.preventDefault();
            setLoading(true);
            const id = await login(formData);
            nav(`/users/${id}`);
        }catch(err){
            setLoading(false)
            setIsError(true);
            setErrorMsg(err)
        }
    };

    return (
        <Card>
            <CardHeader>
                {loading ? <p><b>Logging In...</b></p> : <p>Login</p>}
                {isError ? <p>{errorMsg.join('! ')}</p> : <></>}
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