import React, {useState} from "react";
import { SPELLS } from "../data";
import { capFirstLetter } from "../Helpers";

const NewSpellForm = ({spellLevelString, setShowForm, handleNewSpellSubmit})=>{
    
    let spellsKey = 'LEVEL_' + spellLevelString.toUpperCase();
    let levelProp = 'level'+spellLevelString;

    if(spellLevelString === 'cantrips'){
        spellsKey = 'CANTRIPS';
        levelProp = 'cantrips';
    }

    const spellList = SPELLS[spellsKey];

    const defaultFormData = {
        choice : ''
    }

    const changeSpellName = (spell)=>{
        return spell.split('-').map((spellPart)=>(capFirstLetter(spellPart))).join(' ')
    }

    const [formData, setFormData] = useState(defaultFormData);

    const [loading, setLoading] = useState(false);

    const handleChange = (evt)=>{
        const {name, value} = evt.target;
        setFormData((data)=>({
            ...data,
            [name] : value
        }));
    };

    const hideSelf = ()=>{
        setFormData(defaultFormData);
        setShowForm(false);
    }

    const handleSubmit = async (evt)=>{
        evt.preventDefault();
        if(formData.choice === '' || !formData.choice){
            alert('Please select a spell!');
            return;
        }else{
            setLoading(true);
            let resp = await handleNewSpellSubmit(formData.choice, levelProp);
            setLoading(false);
            hideSelf();
        };
    };

    return (
        <div>
            {loading ? <p><b>Loading...</b></p> : <></>}
            <form>
                <label htmlFor="choice">Select Spell : </label>
                <select
                    id="choice"
                    name="choice"
                    value={formData.choice}
                    onChange={handleChange}
                    >
                    <option value=''>- Pick One -</option>
                    {spellList.map((spell)=>(
                        <option key={spell} value={spell}>{changeSpellName(spell)}</option>
                    ))}
                </select>
                <br/>
                <button onClick={handleSubmit}>Submit</button>
                <button onClick={hideSelf}>Cancel</button>
            </form>
        </div>
    )
}

export default NewSpellForm;