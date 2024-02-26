import React, {useState, useEffect, useContext} from "react";
import { useParams, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import {checkAuthOrAdmin, capFirstLetter} from "./Helpers";
import './UserPage.css';
import UserContext from "./UserContext";
import Api from "./Api";

import { Oval } from "react-loader-spinner";

const UserPage = ({deleteUser}) =>{

    const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');

    const {id} = useParams();
    const nav = useNavigate()

    const [userView, setUserView] = useState({});

    const [loading, setLoading] = useState(true);
    
    const [loadingChars, setLoadingChars] = useState(true)

    const [characters, setCharacters] = useState([]);


    useEffect(()=>{

        if(!checkAuthOrAdmin(user, id)){
            nav('/403');
        }
        const fetchCharacters = async (id) =>{
            if(parseInt(id) === user.id){
                setUserView(user);
                setLoading(false)
                setLoadingChars(true);
                const resp = await Api.getCharacters(id, token);
                setCharacters(resp.data.characters);
                setLoadingChars(false);
                return;
            }else{
                try{
                    setLoading(true);
                    const userData = await Api.getUser(id, token);
                    setUserView(userData.data.user);
                    setLoading(false);
                    setLoadingChars(true);
                    const resp = await Api.getCharacters(id, token);
                    setCharacters(resp.data.characters);
                    setLoadingChars(false);
                }catch(e){
                    if(e.status === 404){
                        nav('*');
                    }else if(e.status === 401){
                        nav('/403');
                    }else{
                        console.error(e);
                    }
                }
            }
        }
        fetchCharacters(id);
        
    },[])

    const deleteAccount = async (evt)=>{
        evt.preventDefault();
        if(window.confirm('Are you sure you want to delete your account? This cannot be undone!')){
            await deleteUser();
            nav('/');
        }
    }


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
            <h1>{userView.username}</h1>
            <p>Email : {userView.email}</p>
            <div id="user-chars">
                {loadingChars? <p><b>Loading Characters...</b></p> :
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
                <Link to={`/users/${userView.id}/edit`}>Edit Account</Link>
            </p>
            <p>
                <button onClick={deleteAccount}>Delete Account</button>
            </p>
        </div>
    )
}

export default UserPage;