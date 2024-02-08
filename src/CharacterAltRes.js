import React, {useState} from "react";
import CharacterAltResBox from "./CharacterAltResBox";
import './CharacterAltRes.css'

const CharacterAltRes = ({character})=>{


    return(
        <div id="character-altres-cont">
            <h2>Alternate Resources</h2>
            <p>
                <button>New Resource</button>
            </p>
            <div id="character-altres-subcont">
                {character.altResources.map((resource)=>(
                    <CharacterAltResBox resource={resource}/>
                ))}
            </div>
        </div>
    )


}

export default CharacterAltRes;