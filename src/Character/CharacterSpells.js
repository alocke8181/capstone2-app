import React, {useContext} from "react";

import CharacterSpellCont from "./CharacterSpellCont";
import { CORESTATS } from "../data";
import CharacterContext from "./CharacterContext";
import { capFirstLetter } from "../Helpers";
import Collapsible from "react-collapsible";

import Api from "../Api";

const CharacterSpells = ({handleChange})=>{

    const {character, formData, saveCharacter} = useContext(CharacterContext)

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
        <Collapsible trigger='Spells'>
        <div id="character-spell-big-cont">
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
            <CharacterSpellCont spellLevelString={'cantrips'} handleChange={handleChange} 
                handleNewSpellSubmit={handleNewSpellSubmit} handleDeleteSpell={handleDeleteSpell}/>
            <CharacterSpellCont spellLevelString={'One'} handleChange={handleChange} 
                handleNewSpellSubmit={handleNewSpellSubmit} handleDeleteSpell={handleDeleteSpell}/>
            <CharacterSpellCont spellLevelString={'Two'} handleChange={handleChange} 
                handleNewSpellSubmit={handleNewSpellSubmit} handleDeleteSpell={handleDeleteSpell}/>
            <CharacterSpellCont spellLevelString={'Three'} handleChange={handleChange} 
                handleNewSpellSubmit={handleNewSpellSubmit} handleDeleteSpell={handleDeleteSpell}/>
            <CharacterSpellCont spellLevelString={'Four'} handleChange={handleChange} 
                handleNewSpellSubmit={handleNewSpellSubmit} handleDeleteSpell={handleDeleteSpell}/>
            <CharacterSpellCont spellLevelString={'Five'} handleChange={handleChange} 
                handleNewSpellSubmit={handleNewSpellSubmit} handleDeleteSpell={handleDeleteSpell}/>
            <CharacterSpellCont spellLevelString={'Six'} handleChange={handleChange} 
                handleNewSpellSubmit={handleNewSpellSubmit} handleDeleteSpell={handleDeleteSpell}/>
            <CharacterSpellCont spellLevelString={'Seven'} handleChange={handleChange} 
                handleNewSpellSubmit={handleNewSpellSubmit} handleDeleteSpell={handleDeleteSpell}/>
            <CharacterSpellCont spellLevelString={'Eight'} handleChange={handleChange} 
                handleNewSpellSubmit={handleNewSpellSubmit} handleDeleteSpell={handleDeleteSpell}/>
            <CharacterSpellCont spellLevelString={'Nine'} handleChange={handleChange} 
                handleNewSpellSubmit={handleNewSpellSubmit} handleDeleteSpell={handleDeleteSpell}/>
        </div></Collapsible>
    )
}
export default CharacterSpells;