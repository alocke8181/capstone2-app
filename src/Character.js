import React, {useState, useEffect, useContext} from "react";
import { Card, CardBody, CardHeader, ListGroup, ListGroupItem } from "react-bootstrap";
import { useParams, useNavigate } from "react-router";
import {checkAuthOrAdmin} from "./Helpers";
import { CORESTATS, SKILLS } from "./data";
import { capFirstLetter } from "./Helpers";

import CharacterSticky from "./CharacterSticky";
import NewAttackForm from "./NewAttackForm";
import NewTraitForm from "./NewTraitForm";
import NewFeatureForm from "./NewFeatureForm";
import CharacterSpellCont from "./CharacterSpellCont";
import CharacterEquipment from "./CharacterEquipment";

import "./Character.css"

const Character = ({getCharacter, patchCharacter, postAttack, deleteAttack, postTrait, deleteTrait, postFeature, deleteFeature, getSpell})=>{

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))
    const {id} = useParams();
    const nav = useNavigate();

    const [loading, setLoading] = useState(true);

    const [saving, setSaving] = useState(false);

    const [character, setCharacter] = useState({});

    const [formData, setFormData] = useState({});

    const [showNewAttackForm, setShowNewAttackForm] = useState(false);
    const [showNewTraitForm, setShowNewTraitForm] = useState(false);
    const [showNewFeatureForm, setShowNewFeatureForm] = useState(false);

    const showAttackForm = () =>{
        setShowNewAttackForm(true);
    }
    const showTraitForm = ()=>{
        setShowNewTraitForm(true);
    };
    const showFeatureForm = ()=>{
        setShowNewFeatureForm(true);
    };

    //Set starter form data based on a character
    const resetFormData = (character)=>{
        let startFormData = {};
        const keys = Object.keys(character);
        keys.forEach((key)=>{
            startFormData[key] = character[key];
        });
        setFormData(startFormData);
    };

    //Fetch character data, add to state, and generate form fields from character keys
    useEffect(()=>{
        const fetchCharacter = async (charID)=>{
            setLoading(true);
            const resp = await getCharacter(charID);
            if(!checkAuthOrAdmin(user, resp.data.character.creatorID)){
                nav('/403');
            };
            setCharacter(resp.data.character);
            resetFormData(resp.data.character);
            setLoading(false);
        }
        fetchCharacter(id);   
    },[]);

    const saveCharacter = async ()=>{
        setSaving(true);
        let resp = await patchCharacter(character);
        setCharacter(resp.data.character);
        resetFormData(resp.data.character);
        setSaving(false);
    }

    //Generic handler for form changes
    const handleChange = (evt)=>{
        const {name, value} = evt.target;
        setFormData((data)=>({
            ...data,
            [name] : value
        }));
        setCharacter((data)=>({
            ...data,
            [name] : value
        }));
    };

    //Special handler to update the core stat modifiers when the core stats change
    const handleStatChange = (evt)=>{
        const {name, value} = evt.target;
        const nameMod = name + 'Mod';
        const modValue = Math.floor((value - 10)/2);
        setFormData((data)=>({
            ...data,
            [name] : value,
        }));
        setCharacter((data)=>({
            ...data,
            [name] : value,
            [nameMod] : modValue
        }));
    };

    //Special handle to update the character saving throw proficiencies
    const handleSavingThrowChange = (evt)=>{
        const {name, value} = evt.target;
        let currSavingProfs = character.savingProfs;
        if(currSavingProfs.includes(value)){
            const idx = currSavingProfs.indexOf(value)
            currSavingProfs.splice(idx, 1);
        }else{
            currSavingProfs.push(value);
        }
        setCharacter((data)=>({
            ...data,
            savingProfs : currSavingProfs
        }));
    };

    //Special handle to update the character skill proficiencies
    const handleSkillChange = (evt)=>{
        const {name, value} = evt.target;
        let currSkillProfs = character.skillProfs;
        if(currSkillProfs.includes(value)){
            const idx = currSkillProfs.indexOf(value)
            currSkillProfs.splice(idx, 1);
        }else{
            currSkillProfs.push(value);
        }
        setCharacter((data)=>({
            ...data,
            skillProfs : currSkillProfs
        }));
    };

    const handleNewAttackSubmit = async (data)=>{
        data.charID = character.id;
        let resp = await postAttack(data);
        character.attacks.push(resp.data.attack);
        await saveCharacter();
        return resp;
    }

    const handleDeleteAttack = async (evt)=>{
        const attackID = parseInt(evt.target.dataset.attackid)
        let newCharacterAttacks = character.attacks.filter((attack) => (attack.id !== attackID));
        character.attacks = newCharacterAttacks;
        await saveCharacter();
        let resp = await deleteAttack(attackID);
    }

    const handleNewTraitSubmit = async (data, isCustom)=>{
        if(isCustom){
            data.charID = character.id;
        }
        let resp = await postTrait(data, isCustom);
        character.traits.push(resp);
        await saveCharacter();
        return resp;
    }

    const handleDeleteTrait = async (evt)=>{
        if(evt.target.dataset.traitid){
            const traitID = parseInt(evt.target.dataset.traitid);
            let newCharacterTraits = character.traits.filter((trait) =>(!trait.id || (trait.id && trait.id !== traitID)));
            character.traits = newCharacterTraits;
            await saveCharacter();
            await deleteTrait(traitID);
        }else if(evt.target.dataset.traitindex){
            const traitIndex = evt.target.dataset.traitindex;
            let newCharacterTraits = character.traits.filter((trait)=>(!trait.index || (trait.index && trait.index !== traitIndex)));
            character.traits = newCharacterTraits;
            await saveCharacter();
        }
    }

    const handleNewFeatureSubmit = async (data, isCustom)=>{
        if(isCustom){
            data.charID = character.id;
        }
        let resp = await postFeature(data, isCustom);
        character.features.push(resp);
        await saveCharacter();
        return resp;
    }

    const handleAddEquipment = async (formData)=>{
        const itemName = formData.name;
        if(character.equipment.some((item)=>(item.name === itemName))){
            alert(`Cannot have duplicate of item: ${itemName}`);
            return;
        }else{
            character.equipment.push({
                name : formData.name,
                amount : formData.amount
            });
            await saveCharacter();
        }
    };

    const handleDeleteEquipment = async (itemName)=>{
        let newEquip = character.equipment.filter((item)=>(item.name !== itemName))
        character.equipment = newEquip;
        await saveCharacter();
    }

    const handleDeleteFeature = async (evt)=>{
        if(evt.target.dataset.featureid){
            const featureID = parseInt(evt.target.dataset.featureid);
            let newCharacterFeatures = character.features.filter((feature) =>(!feature.id || (feature.id && feature.id !== featureID)));
            character.features = newCharacterFeatures;
            await saveCharacter();
            await deleteFeature(featureID);
        }else if(evt.target.dataset.featureindex){
            const featureIndex = evt.target.dataset.featureindex;
            let newCharacterFeatures = character.features.filter((feature)=>(!feature.index || (feature.index && feature.index !== featureIndex)));
            character.features = newCharacterFeatures;
            await saveCharacter();
        };
    };
    
    const handleNewSpellSubmit = async (choice, levelProp)=>{
        let resp = await getSpell(choice);
        character[levelProp].push(resp);
        await saveCharacter();
        return resp;
    }

    const handleDeleteSpell = async (index, levelProp)=>{
        let newSpells = character[levelProp].filter((spell)=>(spell.index !== index));
        character[levelProp] = newSpells;
        await saveCharacter();
    };


    return(
        <>
            {loading ? <p><b>Loading Character...</b></p> : 
            <>
                <CharacterSticky/>
                <p>
                    Character is auto-saved when adding, changing, or deleting attacks, traits, features, and spells.
                    Upon leveling up, save the character to update proficieny bonus, spell slots, etc...
                    </p>
                {saving ? <p><button disabled>Saving Character</button></p> : <p><button onClick={saveCharacter}>Save Character</button></p>}
                <form>
                    <div id="character-basic-cont">
                        <div className="character-basic-box">
                            <label htmlFor="charName"><h3>Character Name</h3></label>
                            <p><input
                                type="text"
                                id="charName"
                                name="charName"
                                value={formData.charName}
                                onChange={handleChange}
                            /></p>
                        </div>
                        <div className="character-basic-box"> 
                            <h3>Race</h3>
                            <p>{capFirstLetter(character.race)}</p>
                        </div>
                        <div className="character-basic-box">
                            <h3>Class</h3>
                            <p>{capFirstLetter(character.className)}</p>
                        </div>
                        <div className="character-basic-box">
                            <label htmlFor="level"><h3>Level</h3></label>
                            <p><input
                                className="character-input-num-small"
                                type="number"
                                id="level"
                                name="level"
                                min="1"
                                max="20"
                                value={formData.level}
                                onChange={handleChange}
                            /></p>
                        </div>
                        <div className="character-basic-box">
                            <label htmlFor="exp"><h3>Exp</h3></label>
                            <p><input
                                className="character-input-num-med"
                                type="number"
                                id="exp"
                                name="exp"
                                min="0"
                                value={formData.exp}
                                onChange={handleChange}
                            /></p>
                        </div>
                    </div>
                    <div id="character-core-stat-cont">
                        {CORESTATS.map((stat)=>(
                            <div className="character-core-stat-box" key={stat}>
                                <label htmlFor={stat.slice(0,3)}><h4>{capFirstLetter(stat)}</h4></label>
                                <p><input
                                    className="character-input-num-big"
                                    type="number"
                                    id={stat.slice(0,3)}
                                    name={stat.slice(0,3)}
                                    min="0"
                                    value={formData[stat.slice(0,3)]}
                                    onChange={handleStatChange}
                                /></p>
                                <h4>{character[(stat.slice(0,3)+'Mod')]}</h4>
                            </div>
                        ))}
                    </div>
                    <div id="character-combat-stats-cont">
                        <div className="character-combat-stat-box">
                            <label htmlFor="armorClass"><h3>AC</h3></label>
                            <p>
                                <input
                                    className="character-input-num-big"
                                    type="number"
                                    id="armorClass"
                                    name="armorClass"
                                    min="0"
                                    value={formData.armorClass}
                                    onChange={handleChange}
                                />
                            </p>
                        </div>
                        <div className="character-combat-stat-box">
                            <p><h3>Initiative</h3></p>
                            <h4>
                                {character.initiative}
                            </h4>
                        </div>
                        <div className="character-combat-stat-box">
                            <p><h3>Speed</h3></p>
                            <h4>
                                {character.speed}
                            </h4>
                        </div>
                        <div className="character-combat-stat-box" id="character-hp-box">
                            <label htmlFor="hpMax"><h4>Max HP</h4></label>
                            <p>
                                <input
                                    type="number"
                                    id="hpMax"
                                    name="hpMax"
                                    min="0"
                                    className="character-input-num-small"
                                    value={formData.hpMax}
                                    onChange={handleChange}
                                />
                            </p>
                            <label htmlFor="hpCurr"><h4>Current HP</h4></label>
                            <p>
                                <input
                                    type="number"
                                    id="hpCurr"
                                    name="hpCurr"
                                    min="0"
                                    className="character-input-num-small"
                                    value={formData.hpCurr}
                                    onChange={handleChange}
                                />
                            </p>
                        </div>
                        <div className="character-combat-stat-box">
                            <label htmlFor="hpTemp"><h4>Temporary HP</h4></label>
                            <p>
                                <input
                                    type="number"
                                    id="hpTemp"
                                    name="hpTemp"
                                    min="0"
                                    className="character-input-num-small"
                                    value={formData.hpTemp}
                                    onChange={handleChange}
                                />
                            </p>
                        </div>
                        <div className="character-combat-stat-box">
                            <h4>Hit Dice Type : D{character.hitDice}</h4>
                            <p>
                                <label htmlFor="hitDiceMax">Max : </label>
                                <input
                                    type="number"
                                    id="hitDiceMax"
                                    name="hitDiceMax"
                                    min="0"
                                    className="character-input-num-small"
                                    value={formData.hitDiceMax}
                                    onChange={handleChange}
                                />
                            </p>
                            <p>
                                <label htmlFor="hitDiceCurr">Current : </label>
                                <input
                                    type="number"
                                    id="hitDiceCurr"
                                    name="hitDiceCurr"
                                    min="0"
                                    className="character-input-num-small"
                                    value={formData.hitDiceCurr}
                                    onChange={handleChange}
                                />
                            </p>
                        </div>
                        <div className="character-combat-stat-box">
                            <h4>Death Saves</h4>
                            <p>
                                <label htmlFor="deathSaveSuccess">Successes : </label>
                                <input
                                    type="number"
                                    id="deathSaveSuccess"
                                    name="deathSaveSuccess"
                                    min="0"
                                    max="3"
                                    className="character-input-num-small"
                                    value={formData.deathSaveSuccess}
                                    onChange={handleChange}
                                />
                            </p>
                            <p>
                                <label htmlFor="deathSaveFail">Fails : </label>
                                <input
                                    type="number"
                                    id="deathSaveFail"
                                    name="deathSaveFail"
                                    min="0"
                                    max="3"
                                    className="character-input-num-small"
                                    value={formData.deathSaveFail}
                                    onChange={handleChange}
                                />
                            </p>
                        </div>
                    </div>
                    <div id="character-skill-cont">
                        <div className="character-skill-box-small">
                            <div className="character-skill-box-subbox">
                                <h4>Proficieny Bonus</h4>
                                <p>{character.profBonus}</p>
                            </div>
                            <div className="character-skill-box-subbox">
                                <h4>Passive Perception</h4>
                                <p>{character.passPerc}</p>
                            </div>
                            <div className="character-skill-box-subbox">
                                <label htmlFor="inspiration"><h4>Inspiration</h4></label>
                                <p><input
                                    type="number"
                                    id="inspiration"
                                    name="inspiration"
                                    min="0"
                                    value={formData.inspiration}
                                    onChange={handleChange}
                                /></p>
                            </div>
                        </div>
                        <div className="character-skill-box-small">
                            <h3>Saving Throws</h3>
                            <ul id="character-saving-profs-list">
                                {CORESTATS.map((stat)=>(
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
                                                <label htmlFor={stat+"Save"}>{capFirstLetter(stat)} : </label>
                                                <b>{character[stat.slice(0,3)+"Mod"]+character.profBonus}</b>
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
                                                <label htmlFor={stat+"Save"}>{capFirstLetter(stat)} : </label>
                                                <b>{character[stat.slice(0,3)+"Mod"]}</b>
                                            </>
                                        }
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="character-skill-box-large">
                            <h3>Skills</h3>
                            <ul id="character-skill-list">
                                {SKILLS.map((skill)=>(
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
                                                <label htmlFor={skill.name}>{skill.title} </label>
                                                <i>{'(' + capFirstLetter(skill.skillAbility) + ')'} : </i>
                                                <b>{character[skill.skillAbility+"Mod"]+character.profBonus}</b>
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
                                                <label htmlFor={skill.name}>{skill.title} </label>
                                                <i>{'(' + capFirstLetter(skill.skillAbility) + ')'} : </i>
                                                <b>{character[skill.skillAbility+"Mod"]}</b>
                                            </>
                                        }
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </form>
                    <CharacterEquipment character={character} handleAddEquipment={handleAddEquipment} handleDeleteEquipment={handleDeleteEquipment} />
                    <div id="character-attack-big-cont">
                        <h2>Attacks</h2>
                        <button onClick={showAttackForm}>Add Attack</button>
                        {showNewAttackForm ? <NewAttackForm setShowAttackForm={setShowNewAttackForm} handleNewAttackSubmit={handleNewAttackSubmit}/> : <></>}
                        <div id="character-attack-cont">
                            {character.attacks.map((attack)=>(
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
                            ))}
                        </div>
                    </div>
                    <div id="character-trait-big-cont">
                        <h2>Racial Traits </h2>
                        <button onClick={showTraitForm}>Add Trait</button>
                        {showNewTraitForm ? <NewTraitForm setShowTraitForm = {setShowNewTraitForm} handleNewTraitSubmit={handleNewTraitSubmit} />: <></>}
                        <div id="character-trait-cont">
                            {character.traits.map((trait)=>(
                                <div className="character-trait-box">
                                    <h3>{trait.name}</h3>
                                    <p>{Array.isArray(trait.description) ? trait.description.join(' ') : trait.description}</p>
                                    <p>
                                        {trait.charID ? 
                                        <>
                                            <button>Edit</button>
                                            <button data-traitid={trait.id} onClick={handleDeleteTrait}>Delete</button>
                                        </> 
                                        : 
                                        <>
                                            <button data-traitindex={trait.index} onClick={handleDeleteTrait}>Delete</button>
                                        </>
                                        }
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div id="character-feat-big-cont">
                        <h2>Class Features</h2>
                        <button onClick={showFeatureForm}>Add Feature</button>
                        {showNewFeatureForm ? <NewFeatureForm setShowFeatureForm = {setShowNewFeatureForm} handleNewFeatureSubmit={handleNewFeatureSubmit} />: <></>}
                        <div id="character-feat-cont">
                            {character.features.map((feature)=>(
                                <div className="character-feat-box">
                                    <h3>{feature.name}</h3>
                                    <p>{Array.isArray(feature.description) ? feature.description.join(' ') : feature.description}</p>
                                    <p>
                                        {feature.charID ? 
                                        <>
                                            <button>Edit</button>
                                            <button data-featureid={feature.id} onClick={handleDeleteFeature}>Delete</button>
                                        </> 
                                        : 
                                        <>
                                            <button data-featureindex={feature.index} onClick={handleDeleteFeature}>Delete</button>
                                        </>
                                        }
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
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
                                        <option value={stat.slice(0,3)}>{capFirstLetter(stat)}</option>
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
                
            </>
            } {/* This bracket is to close the loading conditional*/}
        </>
    )

}

export default Character;