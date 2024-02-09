import React, {useState, useEffect, useContext} from "react";
import { useParams, useNavigate } from "react-router";
import {checkAuthOrAdmin} from "../Helpers";
import { CORESTATS, SKILLS } from "../data";
import { capFirstLetter } from "../Helpers";

import StickyBox from "react-sticky-box";

import CharacterSticky from "./CharacterSticky";
import CharacterCoreStats from "./CharacterCoreStats";
import CharacterLanguages from "./CharacterLanguages";
import CharacterEquipProfs from "./CharacterEquipProfs";
import CharacterAttacks from "./CharacterAttacks";
import CharacterTraits from "./CharacterTraits";
import CharacterFeatures from "./CharacterFeatures";
import CharacterEquipment from "./CharacterEquipment";
import CharacterAltRes from "./CharacterAltRes";
import CharacterSpells from "./CharacterSpells";
import CharacterBio from "./CharacterBio";

import "./Character.css"

const Character = ({getCharacter, patchCharacter, postTrait, deleteTrait, postFeature, deleteFeature})=>{

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))
    const {id} = useParams();
    const nav = useNavigate();

    const [loading, setLoading] = useState(true);

    const [saving, setSaving] = useState(false);

    const [character, setCharacter] = useState({});

    const [formData, setFormData] = useState({});

    
    
    

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

    //Function to save the character to the db
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

    
    
    

    return(
        <>
        <p>
            Character is auto-saved when adding, changing, or deleting alt resources, equipment, attacks, traits, features, and spells.
            Upon leveling up, save the character to update proficieny bonus, spell slots, etc...
        </p>
            {loading ? <p><b>Loading Character...</b></p> : 
            <div id="character-page">
                
                <div>
                <CharacterCoreStats character={character} formData={formData} handleChange={handleChange} 
                    handleStatChange={handleStatChange} handleSkillChange={handleSkillChange} handleSavingThrowChange={handleSavingThrowChange} />
                <div id="character-profs-altres-cont">
                    <CharacterLanguages character={character} saveCharacter={saveCharacter}/>
                    <CharacterEquipProfs character={character} saveCharacter={saveCharacter}/>
                    <CharacterAltRes character={character} saveCharacter={saveCharacter}/>
                </div>
                
                <CharacterEquipment character={character} handleAddEquipment={handleAddEquipment} handleDeleteEquipment={handleDeleteEquipment} />
                <CharacterAttacks character={character} saveCharacter={saveCharacter} />
                <CharacterTraits character={character} saveCharacter={saveCharacter} postTrait={postTrait} deleteTrait={deleteTrait}/>
                <CharacterFeatures character={character} saveCharacter={saveCharacter} postFeature={postFeature} deleteFeature={deleteFeature} />
                <CharacterSpells formData={formData} character={character} handleChange={handleChange} saveCharacter={saveCharacter} />    
                <CharacterBio character={character} setCharacter={setCharacter}/>
                
                </div>
                <div id="sidebar">
                    <StickyBox>
                        <div id="sidebar-content">
                            {saving ? <p><button disabled>Saving Character</button></p> : <p><button onClick={saveCharacter}>Save Character</button></p>}
                            <CharacterSticky/>
                        </div>
                        
                    </StickyBox>
                </div>
            </div>
            } {/* This bracket is to close the loading conditional*/}
        </>
    )

}

export default Character;