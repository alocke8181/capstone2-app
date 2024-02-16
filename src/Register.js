import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router";
import { Card, CardBody, CardHeader} from "react-bootstrap";

const Register = ({register}) =>{

    const nav = useNavigate();

    const [formData, setFormData] = useState({
        username : '',
        password : '',
        email : ''
    })

    useEffect(()=>{document.title = 'Register'; },[]);

    const [loading, setLoading] = useState(false);

    const [errorMsg, setErrorMsg] = useState('');
    const [isError, setIsError] = useState(false);


    const handleChange = (e)=>{
        const {name,value} = e.target;
        setFormData((data)=>({
            ...data,
            [name]: value
        }));
    };

    //Register and navigate to their profile page
    async function handleSubmit(evt){
        try{
            evt.preventDefault();
            setLoading(true);
            const id = await register(formData);
            nav(`/users/${id}`);
        }catch(err){
            setLoading(false)
            setIsError(true);
            setErrorMsg(err)
        }
    }


    return (
        <Card>
            <CardHeader>
                {loading ? <p><b>Registering...</b></p> : <p>Register</p>}
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