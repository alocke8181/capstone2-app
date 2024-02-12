import React, {useState} from "react";
import { CORESTATS } from "../data";
import { capFirstLetter } from "../Helpers";
import './NewAttackForm.css';

const EditAttackForm = ({editingAttack, handleEditAttackSubmit, hideEditAttackForm})=>{


    const [formData, setFormData] = useState({...editingAttack});

    const [loading, setLoading] = useState(false);

    const handleChange = (evt)=>{
        const {name, value} = evt.target;
        setFormData((data)=>({
            ...data,
            [name] : value
        }));
    };

    const handleSubmit = async (evt)=>{
        evt.preventDefault();
        setLoading(true);
        await handleEditAttackSubmit(formData);
        setLoading(false);
    }

    return (
        <div className="new-attack-form-cont">
            {loading ? <p><b>Loading...</b></p> : <></>}
            <form>
                <ul>
                    <li key="name">
                        <label htmlFor="name">Name : </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </li>
                    <li key="attackSkill">
                        <label htmlFor="attackSkill">Attack Roll Skill : </label>
                        <select
                            id="attackSkill"
                            name="attackSkill"
                            value={formData.attackSkill}
                            onChange={handleChange}>
                                {CORESTATS.map((stat)=>(
                                    <option value={stat.slice(0,3)}>{capFirstLetter(stat)}</option>
                                ))}
                        </select>
                    </li>
                    <li key="attackMod">
                        <label htmlFor="attackMod">Attack Roll Mod : </label>
                        <input
                            type="number"
                            id="attackMod"
                            name="attackMod"
                            value={formData.attackMod}
                            onChange={handleChange}
                        />
                    </li>
                    <li key="isProf">
                        <label htmlFor="isProf">Proficiency Bonus </label>
                        <select
                            id="isProf"
                            name="isProf"
                            value={formData.isProf}
                            onChange={handleChange}>
                                <option value={false}>No</option>
                                <option value={true}>Yes</option>
                        </select>
                    </li>
                    <li key="dmgDice">
                        <label htmlFor="dmgDice" >Damage Dice : </label>
                        <select
                            id="dmgDice"
                            name="dmgDice"
                            value={formData.dmgDice}
                            onChange={handleChange}>
                                <option value={4}>D4</option>
                                <option value={6}>D6</option>
                                <option value={8}>D8</option>
                                <option value={10}>D10</option>
                                <option value={12}>D12</option>
                        </select>
                    </li>
                    <li key="numDice">
                        <label htmlFor="numDice">Number of Dice : </label>
                        <input
                            type="number"
                            id="numDice"
                            name="numDice"
                            value={formData.numDice}
                            min="1"
                            onChange={handleChange}
                        />
                    </li>
                    <li key="dmgSkill">
                        <label htmlFor="dmgSkill">Damage Roll Skill : </label>
                        <select
                            id="dmgSkill"
                            name="dmgSkill"
                            value={formData.dmgSkill}
                            onChange={handleChange}>
                                {CORESTATS.map((stat)=>(
                                    <option value={stat.slice(0,3)}>{capFirstLetter(stat)}</option>
                                ))}
                        </select>
                    </li>
                    <li key="dmgMod">
                        <label htmlFor="dmgMod">Damage Roll Mod : </label>
                        <input
                            type="number"
                            id="dmgMod"
                            name="dmgMod"
                            value={formData.dmgMod}
                            onChange={handleChange}
                        />
                    </li>
                    <li key="dmgType">
                        <label htmlFor="dmgType">Damage Type : </label>
                        <input
                            type="text"
                            id="dmgType"
                            name="dmgType"
                            value={formData.dmgType}
                            onChange={handleChange}
                        />
                    </li>
                    <li key="altDmgDice">
                        <label htmlFor="altDmgDice" >Alt Damage Dice : </label>
                        <select
                            id="altDmgDice"
                            name="altDmgDice"
                            value={formData.altDmgDice}
                            onChange={handleChange}>
                                <option value={0}>None</option>
                                <option value={4}>D4</option>
                                <option value={6}>D6</option>
                                <option value={8}>D8</option>
                                <option value={10}>D10</option>
                                <option value={12}>D12</option>
                        </select>
                    </li>
                    <li key="altNumDice">
                        <label htmlFor="altNumDice">Alt Number of Dice : </label>
                        <input
                            type="number"
                            id="altNumDice"
                            name="altNumDice"
                            value={formData.altNumDice}
                            min="0"
                            onChange={handleChange}
                        />
                    </li>
                    <li key="altDmgSkill">
                        <label htmlFor="altDmgSkill">Alt Damage Roll Skill : </label>
                        <select
                            id="altDmgSkill"
                            name="altDmgSkill"
                            value={formData.altDmgSkill}
                            onChange={handleChange}>
                                <option value={''}>None</option>
                                {CORESTATS.map((stat)=>(
                                    <option value={stat.slice(0,3)}>{capFirstLetter(stat)}</option>
                                ))}
                        </select>
                    </li>
                    <li key="altDmgMod">
                        <label htmlFor="altDmgMod">Alt Damage Roll Mod : </label>
                        <input
                            type="number"
                            id="altDmgMod"
                            name="altDmgMod"
                            value={formData.altDmgMod}
                            onChange={handleChange}
                        />
                    </li>
                    <li key="altDmgType">
                        <label htmlFor="altDmgType">Alt Damage Type : </label>
                        <input
                            type="text"
                            id="altDmgType"
                            name="altDmgType"
                            value={formData.altDmgType}
                            onChange={handleChange}
                        />
                    </li>
                    <li key='description'>
                        <label htmlFor="description">Description : </label>
                        <input
                            type="text" 
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                        />
                    </li>
                    <li key="savingSkill">
                        <label htmlFor="savingSkill">Saving Roll Skill : </label>
                        <select
                            id="savingSkill"
                            name="savingSkill"
                            value={formData.savingSkill}
                            onChange={handleChange}>
                                <option value={''}>None</option>
                                {CORESTATS.map((stat)=>(
                                    <option value={stat.slice(0,3)}>{capFirstLetter(stat)}</option>
                                ))}
                        </select>
                    </li>
                    <li key="savingEffect">
                        <label htmlFor="savingEffect">Saving Effect : </label>
                        <input
                            type="text"
                            id="savingEffect"
                            name="savingEffect"
                            value={formData.savingEffect}
                            onChange={handleChange}
                        />
                    </li>
                </ul>
                <button onClick={handleSubmit}>Submit</button>
                <button onClick={hideEditAttackForm}>Cancel</button>
            </form>
        </div>
    )
}

export default EditAttackForm;