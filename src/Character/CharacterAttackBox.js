import React, {useContext} from "react";
import { capFirstLetter } from "../Helpers";
import RollContext from "./RollContext";

const CharacterAttackBox = ({character, attack, handleDeleteAttack, showEditAttackFormFunc})=>{

    const {rollList, setRollList} = useContext(RollContext);

    const rollAttack = ()=>{
        const name = attack.name;
        const dmgType = attack.dmgType;
        const altDmgType = attack.altDmgType
        const attackDieRoll = Math.floor((Math.random() * 20)+1);
        const attackRoll = attackDieRoll + character[attack.attackSkill + "Mod"] + 
            (attack.isProf ? character.profBonus : 0) + attack.attackMod
        let diceToRoll = (attackDieRoll === 20 ? 2 * attack.numDice : attack.numDice);
        let altDiceToRoll = (attackDieRoll === 20 ? 2 * attack.altNumDice : attack.altNumDice);
        let dmgDiceList = [];
        let damage = 0;
        let altDmgDiceList = []
        let altDamage = 0;
        for(let i = 0; i < diceToRoll; i++){
            let roll = Math.floor((Math.random() * attack.dmgDice)+1);
            damage = damage + roll;
            dmgDiceList.push(roll);
        }
        damage = damage + character[attack.dmgSkill + "Mod"] + attack.dmgMod;
        for(let j = 0; j < altDiceToRoll; j++){
            let altRoll = Math.floor((Math.random() * attack.altDmgDice)+1);
            altDamage = altDamage + altRoll;
            altDmgDiceList.push(altRoll);
        }
        altDamage = altDamage + character[attack.altDmgSkill + "Mod"] + attack.altDmgMod;
        setRollList([...rollList, {name, attackDieRoll, attackRoll, dmgDiceList, damage, dmgType, altDmgDiceList, altDamage, altDmgType}])
    }


    return(
        <div className="character-attack-box" key={attack.id}>
            <h3 onClick={rollAttack}>{attack.name}</h3>
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
                <button data-attackid={attack.id} onClick={showEditAttackFormFunc}>Edit</button>
                <button onClick={handleDeleteAttack} data-attackid={attack.id}>Delete</button>
            </p>
        </div>
    )

}

export default CharacterAttackBox;