import React, {useState, useEffect, useContext} from "react";
import CharacterContext from "./CharacterContext";
import './CharacterMoney.css'

const CharacterMoney = ({handleChange})=>{

    const {character, formData, saveCharacter} = useContext(CharacterContext)

    return(
        <div id="character-money">
            <form>
                <h2>Money</h2>
                <p>
                    <label htmlFor="copper">Copper : </label>
                    <input
                        type="number"
                        min='0'
                        name="copper"
                        id="copper"
                        value={formData.copper}
                        onChange={handleChange}
                />
                </p>
                <p>
                    <label htmlFor="silver">Silver : </label>
                    <input
                        type="number"
                        min='0'
                        name="silver"
                        id="silver"
                        value={formData.silver}
                        onChange={handleChange}
                    />
                </p>
                <p>
                    <label htmlFor="gold">Gold : </label>
                    <input
                        type="number"
                        min='0'
                        name="gold"
                        id="gold"
                        value={formData.gold}
                        onChange={handleChange}
                    />
                </p>
            </form>
        </div>
    )
}

export default CharacterMoney