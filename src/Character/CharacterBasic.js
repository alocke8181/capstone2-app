import React, {useState} from "react";

import { capFirstLetter } from "../Helpers";

const CharacterBasic = ({character, formData, handleChange})=>{
        return(
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
    )
}

export default CharacterBasic;