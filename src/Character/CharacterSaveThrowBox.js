import React, {useContext} from "react";
import CharacterContext from "./CharacterContext";
import RollContext from "./RollContext";
import { capFirstLetter } from "../Helpers";

const CharacterSaveThrowBox = ({stat, handleSavingThrowChange})=>{
    const {character, formData, saveCharacter} = useContext(CharacterContext)
    const {rollList, setRollList} = useContext(RollContext);

    const rollSkill = ()=>{
        const skillDieRoll = Math.floor((Math.random() * 20)+1);
        const skillRoll = skillDieRoll + (character.savingProfs.includes(stat) ? parseInt(character.profBonus) : 0) + parseInt(character[stat.slice(0,3)+"Mod"])
        setRollList([...rollList, {name : capFirstLetter(stat), attackDieRoll : skillDieRoll, attackRoll : skillRoll, 
            dmgDiceList : [], damage : 0, dmgType : '', altDmgDiceList : [], altDamage : 0, altDmgType : ''}])
    }

    return (
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
                    <section onClick={rollSkill}>{capFirstLetter(stat)} : 
                    <b> {character[stat.slice(0,3)+"Mod"]+character.profBonus}</b></section>
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
                    <section onClick={rollSkill}>{capFirstLetter(stat)} : 
                    <b>{character[stat.slice(0,3)+"Mod"]}</b></section>
                </>
            }
        </li>
    )
}

export default CharacterSaveThrowBox;