import React, {useState, useContext} from "react";
import './CharacterSpellBox.css';
import CharacterContext from "./CharacterContext";

const CharacterSpellBox = ({spell, deleteSpell})=>{

    const {character, formData, saveCharacter} = useContext(CharacterContext);
   
    const spellMod = (character[character.spellAbility + "Mod"] + character.profBonus) || 0

    const [showDesc, setShowDesc] = useState(false)

    const deleteSelf = async (evt)=>{
        evt.preventDefault();
        const index = evt.target.dataset.spellindex;
        await deleteSpell(index)
    }

    const toggleDesc = (evt)=>{
        evt.preventDefault();
        setShowDesc(!showDesc);
    }

    return (
        <div className="character-spell-box">
                    <h4>{spell.name}</h4>
                    <p>
                        <i>
                            {spell.ritual ? <>Ritual, </> : <></>}{spell.concentration ? <>Concentration, </> : <></>}{spell.school.name}
                        </i>
                    </p>
                    <br/>
                        {spell.damage ? 
                        <>
                            Damage : {spell.damage.damage_at_slot_level ? 
                                <>{spell.damage.damage_at_slot_level[Object.keys(spell.damage.damage_at_slot_level)[0]]} {spell.damage.damage_type.name}</> : 
                                <>{spell.damage.damage_at_character_level[Object.keys(spell.damage.damage_at_character_level)[0]]} {spell.damage.damage_type.name}</>}
                        <br/></> 
                        : <></>}
                        
                        {spell.healLevels ? 
                        <>
                            Healing : {spell.healLevels[Object.keys(spell.healLevels)[0]].replace('MOD', spellMod)}
                        <br/></> 
                        : <></>}
                        
                        {spell.attackType ? 
                        <>
                            Attack Type : {spell.attackType}
                        <br/></> 
                        : <></>}
                        
                        <>
                            Range : {spell.range}
                        <br/></>
                        
                        {spell.areaOfAffect ? 
                        <>
                            Area of Affect : {spell.areaOfAffect.size} ft {spell.areaOfAffect.type}
                        <br/></> 
                        : <></>}
                        
                        <>
                            Casting Time : {spell.castingTime}
                        <br/></>
                        
                        <>
                            Duration : {spell.duration}
                        <br/></>
                        
                        {spell.dc ? 
                        <>
                            <>
                                Saving Throw : {spell.dc.dc_type.name}
                            <br/></>
                            
                            <>
                                On Success : {spell.dc.dc_success}
                            <br/></>
                        </> 
                        : <></>}

                    <br/>
                    <p>
                        <button onClick={toggleDesc}>Toggle Description</button>
                    </p>
                    {showDesc ? 
                        <>
                            <p className="character-spell-box-desc">
                                {spell.description}
                            </p>
                            {spell.higherLevels ? 
                                <p className="character-spell-box-desc">{spell.higherLevels}</p> 
                            : <></>}
                            
                        </>
                        :
                        <></>
                    }
                    <p>
                        <button data-spellindex={spell.index} onClick={deleteSelf}>Delete</button>
                    </p>
                </div>
    )
}

export default CharacterSpellBox;