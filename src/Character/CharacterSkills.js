import React, {useContext} from "react";
import CharacterContext from "./CharacterContext";
import RollContext from "./RollContext";
import { SKILLS } from "../data";
import { capFirstLetter } from "../Helpers";
import CharacterSkillBox from "./CharacterSkillBox";

const CharacterSkills = ({handleSkillChange})=>{

    const {character, formData, saveCharacter} = useContext(CharacterContext)

    const {rollList, setRollList} = useContext(RollContext);

    return(
            <div className="character-skill-box-large">
                            <h3>Skills</h3>
                            {character.jackOfAllTrades ? <p><i>Jack of All Trades active!</i></p> : <></>}
                            <ul id="character-skill-list">
                                {SKILLS.map((skill)=>(
                                    <CharacterSkillBox skill={skill} key={skill.name} handleSkillChange={handleSkillChange}/>
                                ))}
                            </ul>
            </div>
    )
}

export default CharacterSkills;