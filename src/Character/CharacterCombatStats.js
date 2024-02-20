import React, {useContext} from "react";
import CharacterContext from "./CharacterContext";
import { capFirstLetter } from "../Helpers";
import './CharacterCombatStats.css';

const CharacterCombatStats = ({handleChange})=>{

    const {character, formData, saveCharacter} = useContext(CharacterContext)

    return(
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
    )
}

export default CharacterCombatStats;