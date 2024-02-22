import React, {useContext} from "react";
import { CORESTATS } from "../data";
import CharacterContext from "./CharacterContext";
import { capFirstLetter } from "../Helpers";
import CharacterSaveThrowBox from "./CharacterSaveThrowBox";
import './CharacterSaveThrows.css';

const CharacterSaveThrows = ({handleSavingThrowChange})=>{

    const {character, formData, saveCharacter} = useContext(CharacterContext)

    return(
        <div className="character-skill-box-small">
            <h3>Saving Throws</h3>
            <ul id="character-saving-profs-list">
                {CORESTATS.map((stat)=>(
                    <CharacterSaveThrowBox key={stat} stat={stat} handleSavingThrowChange={handleSavingThrowChange}/>
                ))}
            </ul>
        </div>
    )
}

export default CharacterSaveThrows;