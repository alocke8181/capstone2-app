import React, {useState, useEffect} from "react";
import { useParams, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import {checkAuthOrAdmin, capFirstLetter} from "./Helpers";
import './UserPage.css';

import { Oval } from "react-loader-spinner";

const UserPage = ({getUser, getCharacters}) =>{

    const [localUser, setLocalUser] = useState(JSON.parse(localStorage.getItem('user')))
    const {id} = useParams();
    const nav = useNavigate()

    const [user, setUser] = useState({});

    const [loading, setLoading] = useState(true); 

    const [characters, setCharacters] = useState([]);


    useEffect(()=>{

        if(!checkAuthOrAdmin(localUser, id)){
            nav('/403');
        }
        const fetchCharacters = async (id) =>{
            setLoading(true);
            const userData = await getUser(id);
            setUser(userData);
            const resp = await getCharacters(id);
            setCharacters(resp.data.characters);
            setLoading(false);
        }
        fetchCharacters(id);
    },[])


    return(
        <div id="user-page">
            {loading ? 
                <Oval
                    width='50'
                    height="50"
                    color="green"
                    ariaLabel="oval-loading"
                    wrapperStyle={{}}
                    wrapperClass=""/> 
            :<></>}
            <h1>{user.username}</h1>
            <p>Email : {user.email}</p>
            <div id="user-chars">
                {loading? <p><b>Loading Characters...</b></p> :
                <>
                    {characters.map((character)=>(
                        <div className="char-box" key={character.id}>
                            <Link to={`/characters/${character.id}`}><h2>{character.charname}</h2></Link>
                            <p>Level {character.level} {capFirstLetter(character.race)} {capFirstLetter(character.classname)}</p>
                        </div>
                    ))}
                </>
                }
            </div>
            <p>
                <Link to={'/characters/new'}>Create New Character</Link>
            </p>
            <p>
                <Link to={`/users/${user.id}/edit`}>Edit Account</Link>
            </p>
            <p>
                <Link to={`/users/${user.id}/delete`}>Delete Account</Link>
            </p>
        </div>
    )
}

export default UserPage;