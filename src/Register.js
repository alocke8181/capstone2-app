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
        evt.preventDefault();
        if(!formData.username || formData.username === ''){
            setIsError(true);
            setErrorMsg('Username cannot be blank!');
            return;
        }else if(!formData.password || formData.password === ''){
            setIsError(true);
            setErrorMsg('Password cannot be blank!');
            return;
        }else if(!formData.email || formData.email === ''){
            setIsError(true);
            setErrorMsg('Email cannot be blank!');
            return;
        }
        try{
            setLoading(true);
            const id = await register(formData);
            nav(`/users/${id}`);
        }catch(err){
            setLoading(false)
            setIsError(true);
            setErrorMsg(err.message)
        }
    }


    return (
        <Card>
            <CardHeader>
                {loading ? <p><b>Registering...</b></p> : <p>Register</p>}
                {isError ? <p className="error">{errorMsg}</p> : <></>}
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
                    <br/>
                    <label htmlFor="password">Password</label>
                    <input 
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    <br/>
                    <label htmlFor="email">Email</label>
                    <input 
                        type="text"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <br/>
                    <button>Submit</button>
                </form>
            </CardBody>
        </Card>
    )
}

export default Register;