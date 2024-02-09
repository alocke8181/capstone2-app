import React from "react";
import { capFirstLetter } from "../Helpers";

const CharacterAttackBox = ({character, attack, handleDeleteAttack})=>{


    return(
        <div className="character-attack-box" key={attack.id}>
            <h3>{attack.name}</h3>
            <ul>
                <li key="roll">
                    Attack Roll : {attack.isProf ? 
                    (character[attack.attackSkill + "Mod"] + character.profBonus + attack.attackMod + '★'):
                    (character[attack.attackSkill + "Mod"] + attack.attackMod)}
                </li>
                <li key="range">
                        Range : {attack.range}
                </li>
                <li key="dmg">
                    Damage : {attack.numDice}D{attack.dmgDice}+{character[attack.dmgSkill+"Mod"] + attack.dmgMod} {attack.dmgType}
                </li>
                {attack.altNumDice!= 0 ? 
                <li key="altdmg">
                    Alt Damage : {attack.altNumDice}D{attack.altDmgDice}+{character[attack.altDmgSkill+"Mod"] + attack.altDmgMod} {attack.altDmgType}
                </li>
                :<></> }
                {attack.savingSkill ? 
                <>
                <li key="svgskill">
                    Saving Skill : {capFirstLetter(attack.savingSkill)}
                </li>
                <li key="svgEffect">
                    Saving Effect : {attack.savingEffect}
                </li>
                </> 
                : <></>}
             </ul>
            <p className="character-centertext">
                {attack.description}
            </p>
            <p className="character-centertext">
                <button>Edit</button>
                <button onClick={handleDeleteAttack} data-attackid={attack.id}>Delete</button>
            </p>
        </div>
    )

}

export default CharacterAttackBox;