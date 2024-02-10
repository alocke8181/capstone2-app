import React, {useState} from "react";

import CharacterSpellCont from "./CharacterSpellCont";
import { CORESTATS } from "../data";

import { capFirstLetter } from "../Helpers";

import Api from "../Api";

const CharacterSpells = ({formData, character, handleChange, saveCharacter})=>{


    const handleNewSpellSubmit = async (choice, levelProp)=>{
        if(character[levelProp].some((spell)=>(spell.index === choice))){
            alert(`Cannot have duplicate spell: ${choice}`);
            return;
        }else{
            let resp = await Api.getSpell(choice);
            character[levelProp].push(resp);
            await saveCharacter();
            return resp;
        }
    }

    const handleDeleteSpell = async (index, levelProp)=>{
        let newSpells = character[levelProp].filter((spell)=>(spell.index !== index));
        character[levelProp] = newSpells;
        await saveCharacter();
    };

    return(
        <div id="character-spell-big-cont">
            <h2>Spells</h2>
            <div>
                <form>
                    <label htmlFor="spellAbility">Spellcasting Ability : </label>
                    <select
                        id="spellAbility"
                        name="spellAbility"
                        value={formData.spellAbility}
                        onChange={handleChange}
                    >
                        <option value=''>None</option>
                        {CORESTATS.map((stat)=>(
                            <option value={stat.slice(0,3)} key={stat}>{capFirstLetter(stat)}</option>
                        ))}
                    </select>
                </form>
                <p>
                    Spellcasting Modifier : {character[character.spellAbility + "Mod"] + character.profBonus || 0} - 
                    Spell Save DC : {character[character.spellAbility + "Mod"] + character.profBonus + 8|| 0}
                </p>
            </div>
            <CharacterSpellCont spellLevelString={'cantrips'} formData={formData} character={character}  
                handleChange={handleChange} handleNewSpellSubmit={handleNewSpellSubmit} handleDeleteSpell={handleDeleteSpell}/>
            <CharacterSpellCont spellLevelString={'One'} formData={formData} character={character}  
                handleChange={handleChange} handleNewSpellSubmit={handleNewSpellSubmit} handleDeleteSpell={handleDeleteSpell}/>
            <CharacterSpellCont spellLevelString={'Two'} formData={formData} character={character}  
                handleChange={handleChange} handleNewSpellSubmit={handleNewSpellSubmit} handleDeleteSpell={handleDeleteSpell}/>
            <CharacterSpellCont spellLevelString={'Three'} formData={formData} character={character}  
                handleChange={handleChange} handleNewSpellSubmit={handleNewSpellSubmit} handleDeleteSpell={handleDeleteSpell}/>
            <CharacterSpellCont spellLevelString={'Four'} formData={formData} character={character}  
                handleChange={handleChange} handleNewSpellSubmit={handleNewSpellSubmit} handleDeleteSpell={handleDeleteSpell}/>
            <CharacterSpellCont spellLevelString={'Five'} formData={formData} character={character}  
                handleChange={handleChange} handleNewSpellSubmit={handleNewSpellSubmit} handleDeleteSpell={handleDeleteSpell}/>
            <CharacterSpellCont spellLevelString={'Six'} formData={formData} character={character}  
                handleChange={handleChange} handleNewSpellSubmit={handleNewSpellSubmit} handleDeleteSpell={handleDeleteSpell}/>
            <CharacterSpellCont spellLevelString={'Seven'} formData={formData} character={character}  
                handleChange={handleChange} handleNewSpellSubmit={handleNewSpellSubmit} handleDeleteSpell={handleDeleteSpell}/>
            <CharacterSpellCont spellLevelString={'Eight'} formData={formData} character={character}  
                handleChange={handleChange} handleNewSpellSubmit={handleNewSpellSubmit} handleDeleteSpell={handleDeleteSpell}/>
            <CharacterSpellCont spellLevelString={'Nine'} formData={formData} character={character}  
                handleChange={handleChange} handleNewSpellSubmit={handleNewSpellSubmit} handleDeleteSpell={handleDeleteSpell}/>
        </div>
    )

}
export default CharacterSpells;