import React, {useState} from "react";

import { capFirstLetter } from "../Helpers";
import { CORESTATS } from "../data";

const CharacterCoreStats = ({character, formData, handleStatChange})=>{

    return(
        <form>
                    
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
        </form>
    )

}

export default CharacterCoreStats;