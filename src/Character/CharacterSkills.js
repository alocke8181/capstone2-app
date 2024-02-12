import React, {useState} from "react";

import { SKILLS } from "../data";
import { capFirstLetter } from "../Helpers";

const CharacterSkills = ({character, handleSkillChange})=>{
    return(
            <div className="character-skill-box-large">
                            <h3>Skills</h3>
                            {character.jackOfAllTrades ? <p><i>Jack of All Trades active!</i></p> : <></>}
                            <ul id="character-skill-list">
                                {SKILLS.map((skill)=>(
                                    <li key={skill.name}>
                                        {character.skillProfs.includes(skill.name) ?
                                            <>
                                                <input
                                                    type="checkbox"
                                                    id={skill.name}
                                                    name={skill.name}
                                                    value={skill.name}
                                                    onChange={handleSkillChange}
                                                    checked
                                                />
                                                <label htmlFor={skill.name}>{skill.title} </label>
                                                <i>{'(' + capFirstLetter(skill.skillAbility) + ')'} : </i>
                                                <b>{character[skill.skillAbility+"Mod"]+character.profBonus}</b>
                                            </>
                                            :
                                            <>
                                                <input
                                                    type="checkbox"
                                                    id={skill.name}
                                                    name={skill.name}
                                                    value={skill.name}
                                                    onChange={handleSkillChange}
                                                />
                                                <label htmlFor={skill.name}>{skill.title} </label>
                                                <i>{'(' + capFirstLetter(skill.skillAbility) + ')'} : </i>
                                                <b>{character[skill.skillAbility+"Mod"] + (character.jackOfAllTrades ? Math.floor(character.profBonus / 2) : 0)}</b>
                                            </>
                                        }
                                    </li>
                                ))}
                            </ul>
            </div>
    )
}

export default CharacterSkills;