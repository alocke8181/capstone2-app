import React, {useState, useEffect} from "react";
import { Card, CardBody, CardHeader, ListGroup, ListGroupItem } from "react-bootstrap";
import { useParams, useNavigate } from "react-router";
import checkAuthOrAdmin from "./Helpers";

import CharacterBasic from "./CharacterBasic";

const Character = ({getCharacter})=>{

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))
    const {id} = useParams();
    const nav = useNavigate();

    const [loading, setLoading] = useState(true);

    const [character, setCharacter] = useState({});

    useEffect(()=>{
        //check auth after loading character
        const fetchCharacter = async (charID)=>{
            setLoading(true);
            const resp = await getCharacter(charID);
            if(!checkAuthOrAdmin(user, resp.data.character.creatorID)){
                nav('/403');
            };
            setCharacter(resp.data.character);
            setLoading(false);
        }
        fetchCharacter(id);
    },[]);

    return(
        <>
            {loading ? <p><b>Loading Character...</b></p> : 
            
                <>
                    <CharacterBasic character={character} />
                </>
            
            }
        </>
    )

}

export default Character;