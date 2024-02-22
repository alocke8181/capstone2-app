import React, {useState, useContext} from "react";
import CharacterSpellBox from "./CharacterSpellBox";
import NewSpellForm from "./NewSpellForm";
import './CharacterSpellCont.css';
import CharacterContext from "./CharacterContext";

const CharacterSpellCont = ({spellLevelString, handleChange, handleNewSpellSubmit, handleDeleteSpell})=>{

    let levelProp = 'level'+spellLevelString;
    let levelSlotsProp = 'level'+spellLevelString+'Slots';
    let levelLeftProp = 'level'+spellLevelString+'Left';

    let isCantrips = false;

    if(spellLevelString==='cantrips'){
        isCantrips = true;
        levelProp = 'cantrips';
    }

    const {character, formData, saveCharacter} = useContext(CharacterContext);

    const [showForm, setShowForm] = useState(false);

    const toggleSpellForm = (evt)=>{
        evt.preventDefault();
        setShowForm(!showForm);
    }

    const deleteSpell = async (index)=>{
        await handleDeleteSpell(index, levelProp);
    }

    return (
        <div className="character-spell-cont">
            {isCantrips ? 
                <h3>Cantrips</h3> : 
                <h3>Level {spellLevelString}</h3>
            }
            <div className="character-spell-form-cont">
                <form className="character-spell-add">
                    {isCantrips ? 
                    <>
                        Cantrips Known: {character.cantripsKnown}
                        <br/>
                        <button onClick={toggleSpellForm}>Add Cantrip</button>
                    </>
                    : 
                    <>
                    <label htmlFor="slotsleft"><b>Total Slots : </b>{character[levelSlotsProp]} | <b>Slots Left : </b></label>
                    <input
                        type="number"
                        min="0"
                        id={levelLeftProp}
                        name={levelLeftProp}
                        value={formData[levelLeftProp] || 0}
                        onChange={handleChange}
                    />
                    <br/>
                    <button onClick={toggleSpellForm}>Add Level {spellLevelString} Spell</button>
                    </>}
                </form>
                
            </div>    
            {showForm ? <NewSpellForm spellLevelString={spellLevelString} 
                        setShowForm={setShowForm} handleNewSpellSubmit={handleNewSpellSubmit}/>: <></>}
            {character[levelProp] ? 
            <div className="character-spell-subcont">
            {character[levelProp].map((spell)=>(
                <CharacterSpellBox spell={spell} deleteSpell={deleteSpell} key={spell.index}/>
            ))}</div>
            : <></> }
        </div>
    )
}

export default CharacterSpellCont;