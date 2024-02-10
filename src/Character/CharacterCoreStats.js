import React, {useState} from "react";

import { capFirstLetter } from "../Helpers";
import { CORESTATS, SKILLS } from "../data";

const CharacterCoreStats = ({character, formData, handleChange, handleStatChange, handleSavingThrowChange, handleSkillChange})=>{

    return(
        <form>
                    <div id="character-basic-cont">
                        <div className="character-basic-box">
                            <label htmlFor="charName"><h3>Character Name</h3></label>
                            <p><input
                                type="text"
                                id="charName"
                                name="charName"
                                value={formData.charName}
                                onChange={handleChange}
                            /></p>
                        </div>
                        <div className="character-basic-box"> 
                            <h3>Race</h3>
                            <p>{capFirstLetter(character.race)}</p>
                        </div>
                        <div className="character-basic-box">
                            <h3>Class</h3>
                            <p>{capFirstLetter(character.className)}</p>
                        </div>
                        <div className="character-basic-box">
                            <h3>Background</h3>
                            <p>{capFirstLetter(character.background)}</p>
                        </div>
                        <div className="character-basic-box">
                            <label htmlFor="level"><h3>Level</h3></label>
                            <p><input
                                className="character-input-num-small"
                                type="number"
                                id="level"
                                name="level"
                                min="1"
                                max="20"
                                value={formData.level}
                                onChange={handleChange}
                            /></p>
                        </div>
                        <div className="character-basic-box">
                            <label htmlFor="exp"><h3>Exp</h3></label>
                            <p><input
                                className="character-input-num-med"
                                type="number"
                                id="exp"
                                name="exp"
                                min="0"
                                value={formData.exp}
                                onChange={handleChange}
                            /></p>
                        </div>
                    </div>
                    <div id="character-core-stat-cont">
                        {CORESTATS.map((stat)=>(
                            <div className="character-core-stat-box" key={stat}>
                                <label htmlFor={stat.slice(0,3)}><h4>{capFirstLetter(stat)}</h4></label>
                                <p><input
                                    className="character-input-num-big"
                                    type="number"
                                    id={stat.slice(0,3)}
                                    name={stat.slice(0,3)}
                                    min="0"
                                    value={formData[stat.slice(0,3)]}
                                    onChange={handleStatChange}
                                /></p>
                                <h4>{character[(stat.slice(0,3)+'Mod')]}</h4>
                            </div>
                        ))}
                    </div>
                    <div id="character-combat-stats-cont">
                        <div className="character-combat-stat-box">
                            <label htmlFor="armorClass"><h3>AC</h3></label>
                            <p>
                                <input
                                    className="character-input-num-big"
                                    type="number"
                                    id="armorClass"
                                    name="armorClass"
                                    min="0"
                                    value={formData.armorClass}
                                    onChange={handleChange}
                                />
                            </p>
                        </div>
                        <div className="character-combat-stat-box">
                            <h3>Initiative</h3>
                            <h4>
                                {character.initiative}
                            </h4>
                        </div>
                        <div className="character-combat-stat-box">
                            <h3>Speed</h3>
                            <h4>
                                {character.speed}
                            </h4>
                        </div>
                        <div className="character-combat-stat-box" id="character-hp-box">
                            <label htmlFor="hpMax"><h4>Max HP</h4></label>
                            <p>
                                <input
                                    type="number"
                                    id="hpMax"
                                    name="hpMax"
                                    min="0"
                                    className="character-input-num-small"
                                    value={formData.hpMax}
                                    onChange={handleChange}
                                />
                            </p>
                            <label htmlFor="hpCurr"><h4>Current HP</h4></label>
                            <p>
                                <input
                                    type="number"
                                    id="hpCurr"
                                    name="hpCurr"
                                    min="0"
                                    className="character-input-num-small"
                                    value={formData.hpCurr}
                                    onChange={handleChange}
                                />
                            </p>
                        </div>
                        <div className="character-combat-stat-box">
                            <label htmlFor="hpTemp"><h4>Temporary HP</h4></label>
                            <p>
                                <input
                                    type="number"
                                    id="hpTemp"
                                    name="hpTemp"
                                    min="0"
                                    className="character-input-num-small"
                                    value={formData.hpTemp}
                                    onChange={handleChange}
                                />
                            </p>
                        </div>
                        <div className="character-combat-stat-box">
                            <h4>Hit Dice Type : D{character.hitDice}</h4>
                            <p>
                                <label htmlFor="hitDiceMax">Max : </label>
                                <input
                                    type="number"
                                    id="hitDiceMax"
                                    name="hitDiceMax"
                                    min="0"
                                    className="character-input-num-small"
                                    value={formData.hitDiceMax}
                                    onChange={handleChange}
                                />
                            </p>
                            <p>
                                <label htmlFor="hitDiceCurr">Current : </label>
                                <input
                                    type="number"
                                    id="hitDiceCurr"
                                    name="hitDiceCurr"
                                    min="0"
                                    className="character-input-num-small"
                                    value={formData.hitDiceCurr}
                                    onChange={handleChange}
                                />
                            </p>
                        </div>
                        <div className="character-combat-stat-box">
                            <h4>Death Saves</h4>
                            <p>
                                <label htmlFor="deathSaveSuccess">Successes : </label>
                                <input
                                    type="number"
                                    id="deathSaveSuccess"
                                    name="deathSaveSuccess"
                                    min="0"
                                    max="3"
                                    className="character-input-num-small"
                                    value={formData.deathSaveSuccess}
                                    onChange={handleChange}
                                />
                            </p>
                            <p>
                                <label htmlFor="deathSaveFail">Fails : </label>
                                <input
                                    type="number"
                                    id="deathSaveFail"
                                    name="deathSaveFail"
                                    min="0"
                                    max="3"
                                    className="character-input-num-small"
                                    value={formData.deathSaveFail}
                                    onChange={handleChange}
                                />
                            </p>
                        </div>
                    </div>
                    <div id="character-skill-cont">
                        <div className="character-skill-box-small">
                            <div className="character-skill-box-subbox">
                                <h4>Proficieny Bonus</h4>
                                <p>{character.profBonus}</p>
                            </div>
                            <div className="character-skill-box-subbox">
                                <h4>Passive Perception</h4>
                                <p>{character.passPerc}</p>
                            </div>
                            <div className="character-skill-box-subbox">
                                <label htmlFor="inspiration"><h4>Inspiration</h4></label>
                                <p><input
                                    type="number"
                                    id="inspiration"
                                    name="inspiration"
                                    min="0"
                                    value={formData.inspiration}
                                    onChange={handleChange}
                                /></p>
                            </div>
                        </div>
                        <div className="character-skill-box-small">
                            <h3>Saving Throws</h3>
                            <ul id="character-saving-profs-list">
                                {CORESTATS.map((stat)=>(
                                    <li key={stat}>
                                        {character.savingProfs.includes(stat) ? 
                                            <>
                                                <input
                                                    type="checkbox"
                                                    id={stat+"Save"}
                                                    name={stat+"Save"}
                                                    value={stat}
                                                    onChange={handleSavingThrowChange}
                                                    checked
                                                />
                                                <label htmlFor={stat+"Save"}>{capFirstLetter(stat)} : </label>
                                                <b>{character[stat.slice(0,3)+"Mod"]+character.profBonus}</b>
                                            </>
                                            :
                                            <>
                                                <input
                                                    type="checkbox"
                                                    id={stat+"Save"}
                                                    name={stat+"Save"}
                                                    value={stat}
                                                    onChange={handleSavingThrowChange}
                                                />
                                                <label htmlFor={stat+"Save"}>{capFirstLetter(stat)} : </label>
                                                <b>{character[stat.slice(0,3)+"Mod"]}</b>
                                            </>
                                        }
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="character-skill-box-large">
                            <h3>Skills</h3>
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
                                                <b>{character[skill.skillAbility+"Mod"]}</b>
                                            </>
                                        }
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </form>
    )

}

export default CharacterCoreStats;