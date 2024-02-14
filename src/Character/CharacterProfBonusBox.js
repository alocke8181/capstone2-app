import React, {useContext} from "react";
import CharacterContext from "./CharacterContext";

const CharacterProfBonusBox = ({handleChange})=>{

    const {character, formData, saveCharacter} = useContext(CharacterContext)

    return(
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
    )
}

export default CharacterProfBonusBox;