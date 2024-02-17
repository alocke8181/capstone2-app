import React, {useContext} from "react";
import CharacterContext from "./CharacterContext";
import RollContext from "./RollContext";
import { capFirstLetter } from "../Helpers";

const CharacterSkillBox = ({skill, handleSkillChange})=>{
    const {character, formData, saveCharacter} = useContext(CharacterContext)

    const {rollList, setRollList} = useContext(RollContext);

    const rollSkill = ()=>{
        const skillDieRoll = Math.floor((Math.random() * 20)+1);
        const skillRoll = skillDieRoll + parseInt(character[skill.skillAbility+"Mod"]) + 
            (character.skillProfs.includes(skill.name) ? parseInt(character.profBonus) : 0) + 
            (character.jackOfAllTrades ? Math.floor(parseInt(character.profBonus) / 2) : 0);
        setRollList([...rollList, {name : skill.title, attackDieRoll : skillDieRoll, attackRoll : skillRoll, 
            dmgDiceList : [], damage : 0, dmgType : '', altDmgDiceList : [], altDamage : 0, altDmgType : ''}])
    }

    return(
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
                    <section onClick={rollSkill}>
                    {skill.title}
                    <i> {'(' + capFirstLetter(skill.skillAbility) + ')'} : </i>
                    <b>{character[skill.skillAbility+"Mod"]+character.profBonus}</b></section>
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
                    <section onClick={(skill)=>rollSkill(skill)}>{skill.title} 
                    <i> {'(' + capFirstLetter(skill.skillAbility) + ')'} : </i>
                    <b>{character[skill.skillAbility+"Mod"] + (character.jackOfAllTrades ? Math.floor(character.profBonus / 2) : 0)}</b></section>
                </>
            }
        </li>
    )
}

export default CharacterSkillBox;