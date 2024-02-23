import React, {useState, useEffect, useContext} from "react";
import { useParams, useNavigate } from "react-router";
import {checkAuthOrAdmin} from "../Helpers";

import {v4 as uuidv4} from 'uuid';
import StickyBox from "react-sticky-box";
import { Oval } from "react-loader-spinner";
import Collapsible from "react-collapsible";
import Api from "../Api";

import UserContext from "../UserContext";
import CharacterContext from "./CharacterContext";
import RollContext from './RollContext';

import AttackRollBox from "./AttackRollBox";
import CharacterSticky from "./CharacterSticky";
import CharacterBasic from "./CharacterBasic";
import CharacterCoreStats from "./CharacterCoreStats";
import CharacterCombatStats from "./CharacterCombatStats";
import CharacterProfBonusBox from "./CharacterProfBonusBox";
import CharacterSaveThrows from "./CharacterSaveThrows";
import CharacterSkills from "./CharacterSkills";
import CharacterLanguages from "./CharacterLanguages";
import CharacterEquipProfs from "./CharacterEquipProfs";
import CharacterAttacks from "./CharacterAttacks";
import CharacterTraits from "./CharacterTraits";
import CharacterFeatures from "./CharacterFeatures";
import CharacterEquipment from "./CharacterEquipment";
import CharacterMoney from "./CharacterMoney";
import CharacterAltRes from "./CharacterAltRes";
import CharacterSpells from "./CharacterSpells";
import CharacterBio from "./CharacterBio";

import "./Character.css";
import './RollBox.css';

const Character = ()=>{

    const {user, token, setUser} = useContext(UserContext);

    const {id} = useParams();
    const nav = useNavigate();

    const [loading, setLoading] = useState(true);

    const [saving, setSaving] = useState(false);

    const [character, setCharacter] = useState({});

    const [formData, setFormData] = useState({});

    const [rollList, setRollList] = useState([]);

    //Set starter form data based on a character
    //Automatically generates the keys
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
            const resp = await Api.getCharacter(charID, token);
            if(!checkAuthOrAdmin(user, resp.data.character.creatorID)){
                nav('/403');
            };
            setCharacter(resp.data.character);
            resetFormData(resp.data.character);
            setLoading(false);
        }
        fetchCharacter(id);     
    },[]);

    //Set the title of the page to match the character name
    useEffect(()=>{document.title = character.charName; },[character.charName]);

    //Function to save the character to the db
    const saveCharacter = async ()=>{
        setSaving(true);
        character.userID = user.id;
        let resp = await Api.patchCharacter(character, token);
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

    //Special handler to update the character saving throw proficiencies
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

    //Special handler to update the character skill proficiencies
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

    //Add an equipment item
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

    //Remove an equipment item
    const handleDeleteEquipment = async (itemName)=>{
        let newEquip = character.equipment.filter((item)=>(item.name !== itemName))
        character.equipment = newEquip;
        await saveCharacter();
    }

    //Delete the character
    const handleDeleteCharacter = async()=>{
        if(window.confirm(`Are you sure you want to delete ${character.charName}? This action cannot be undone.`)===true){
            const data = {userID : user.id}
            let resp = await Api.deleteCharacter(character.id, data, token);
            nav(`/users/${user.id}`);
        }else{
            return;
        };
    };
    
    
    return(
        <CharacterContext.Provider value={{character, formData, saveCharacter}}>
            <RollContext.Provider value={{rollList, setRollList}} >
                <p>
                    Character is auto-saved when adding, changing, or deleting alt resources, equipment, attacks, traits, features, and spells.
                    Upon leveling up, save the character to update proficieny bonus, spell slots, etc...
                    <img src="../images/dice.png" id="dice-icon" width='64' height='64'/>
                </p>
                <p>
                    Critical hits are calculated by rolling twice the number of damage dice, then adding any modifiers.
                </p>
                    {loading ? <p><b>Loading Character...</b></p> : 
                    <div id="character-page">
                        <div>
                            <CharacterBasic handleChange={handleChange} />
                            <CharacterCoreStats handleStatChange={handleStatChange} />
                            <CharacterCombatStats handleChange={handleChange} />
                            <Collapsible trigger={(<h2>Skills & Proficiencies ▼</h2>)} triggerWhenOpen={(<h2>Skills & Proficiencies ▲</h2>)}>
                                <div id="character-skill-cont">
                                    <CharacterProfBonusBox handleChange={handleChange} />
                                    <CharacterSaveThrows handleSavingThrowChange={handleSavingThrowChange}/>
                                    <CharacterSkills handleSkillChange={handleSkillChange} />
                                    <CharacterLanguages/>
                                    <CharacterEquipProfs/>
                                </div>
                            </Collapsible>
                            <Collapsible trigger={(<h2>Equipment & Resources ▼</h2>)} triggerWhenOpen={(<h2>Equipment and Resources ▲</h2>)}>
                                <div id="character-profs-altres-cont">
                                    <CharacterAltRes />
                                    <CharacterEquipment handleAddEquipment={handleAddEquipment} handleDeleteEquipment={handleDeleteEquipment} />
                                    <CharacterMoney handleChange={handleChange}/>
                                </div>
                            </Collapsible>
                            <CharacterAttacks/>
                            <CharacterTraits/>
                            <CharacterFeatures/>
                            <CharacterSpells handleChange={handleChange}/>    
                            <CharacterBio setCharacter={setCharacter}/>
                            <button onClick={handleDeleteCharacter}>Delete Character</button>
                        </div>
                        <div id="sidebar">
                            <StickyBox>
                                <div id="sidebar-content">
                                    {saving ? <>
                                        <Oval
                                            width='25'
                                            height="25"
                                            color="green"
                                            ariaLabel="oval-loading"
                                            wrapperStyle={{}}
                                            wrapperClass=""/> 
                                        <p><button disabled>Saving Character</button></p></>
                                    : <p><button onClick={saveCharacter}>Save Character</button></p>}
                                    <CharacterSticky/>
                                </div>
                                <div id="roll-cont">
                                    {rollList.map((attack)=>(
                                        <AttackRollBox attack={attack} key={uuidv4()}/>
                                    ))}
                                </div>
                            </StickyBox>
                        </div>
                    </div>
                    }
            </RollContext.Provider>
        </CharacterContext.Provider>
    )
}

export default Character;