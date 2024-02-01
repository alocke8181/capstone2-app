import React, {useState, useEffect} from "react";
import { Card, CardBody, CardHeader, ListGroup, ListGroupItem } from "react-bootstrap";
import { Navigate, useParams, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import checkAuthOrAdmin from "./Helpers";

const UserPage = ({getCharacters}) =>{

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))
    const {id} = useParams();
    const nav = useNavigate()

    const [loading, setLoading] = useState(true); 

    const [characters, setCharacters] = useState([]);


    useEffect(()=>{

        if(!checkAuthOrAdmin(user, id)){
            nav('/403');
        }
        const fetchCharacters = async (userID) =>{
            setLoading(true);
            const resp = await getCharacters(userID);
            setCharacters(resp.data.characters);
            setLoading(false);
        }
        fetchCharacters(id);
    },[])


    return(
        <>
            <Card>
                <CardHeader>
                    <h1>{user.username}</h1>
                </CardHeader>
                <CardBody>
                    <ListGroup>
                        <ListGroupItem key='email'>
                            Email: {user.email}
                        </ListGroupItem>
                        <ListGroupItem key='editLink'>
                            <Link to={`/users/${user.id}/edit`}>Edit Profile</Link>
                        </ListGroupItem>
                        {loading ? <p><b>Loading Characters...</b></p> : 
                        <ListGroup>
                            {characters.map((character)=>(
                                <ListGroupItem key={character.id}>
                                    <Card>
                                        <CardHeader>
                                            <Link to={`/characters/${character.id}`}><h3>{character.charname}</h3></Link>
                                        </CardHeader>
                                        <CardBody>
                                            <p>Level {character.level} {character.race} {character.classname}</p>
                                        </CardBody>
                                    </Card>
                                </ListGroupItem>
                            ))}
                        </ListGroup>
                        }
                    </ListGroup>
                </CardBody>
            </Card>
        </>

    )
}

export default UserPage;