import React, {useState, useEffect, useContext} from "react";
import { useParams, useNavigate } from "react-router";
import {checkAuthOrAdmin} from "../Helpers";
import Api from "../Api";
import UserContext from "../UserContext";
import CharacterContext from "./CharacterContext";


import StickyBox from "react-sticky-box";

import { Oval } from "react-loader-spinner";

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
import CharacterAltRes from "./CharacterAltRes";
import CharacterSpells from "./CharacterSpells";
import CharacterBio from "./CharacterBio";

import "./Character.css"

const Character = ({getCharacter})=>{



    const {user, setUser} = useContext(UserContext);
    const [token, setToken] = useState(localStorage.getItem('token'));

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

     //Post an attack to the backend
     async function postAttack(data){
        data.userID = user.id;
        const resp = await Api.postAttack(data, token);
        return resp;
    }

    //Patch an attack
    async function patchAttack(data){
        data.userID = user.id;
        const resp = await Api.patchAttack(data, token);
        return resp;
    }

    //Delete an attack from the backend
    async function deleteAttack(attackID){
        const data ={userID : user.id}
        const resp = await Api.deleteAttack(attackID, data, token);
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

    //Post a trait to the backend OR get external data from the API
    async function postTrait(data, isCustom){
        if(isCustom){
            delete data.choice;
            data.userID = user.id;
            const resp = await Api.postTrait(data, token);
            return resp.data.trait;
        }else{
            const resp = await Api.getExternalTrait(data.choice)
            return({
                index : resp.data.index,
                name : resp.data.name,
                description : resp.data.desc.join(' ')
            });
        };
    };

    //Patch a trait to the backend
    async function patchTrait(data){
        data.userID = user.id;
        const resp = await Api.patchTrait(data, token);
        return resp;
    }

    //Delete a trait from the backend
    async function deleteTrait(traitID){
        const data = {userID : user.id}
        const resp = await Api.deleteTrait(traitID, data, token);
        return resp;
    }

     //Post a feature to the backend OR get external data from the API
     async function postFeature(data, isCustom){
        if(isCustom){
            delete data.choice;
            data.userID = user.id;
            const resp = await Api.postFeature(data, token);
            return resp.data.feature;
        }else{
            const resp = await Api.getExternalFeature(data.choice)
            return({
                index : resp.data.index,
                name : resp.data.name,
                description : resp.data.desc.join(' ')
            });
        };
    };

    async function patchFeature(data){
        data.userID = user.id
        const resp = await Api.patchFeature(data,token);
        return resp;
    };

    //Delete a feature from the backend
    async function deleteFeature(featureID){
        const data = {userID : user.id}
        const resp = await Api.deleteFeature(featureID, data, token);
        return resp;
    }

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
        <p>
            Character is auto-saved when adding, changing, or deleting alt resources, equipment, attacks, traits, features, and spells.
            Upon leveling up, save the character to update proficieny bonus, spell slots, etc...
        </p>
            {loading ? <p><b>Loading Character...</b></p> : 
            <div id="character-page">
                
                <div>
                    <CharacterBasic handleChange={handleChange} />
                    <CharacterCoreStats handleStatChange={handleStatChange} />
                    <CharacterCombatStats handleChange={handleChange} />
                    <div id="character-skill-cont">
                        <CharacterProfBonusBox handleChange={handleChange} />
                        <CharacterSaveThrows handleSavingThrowChange={handleSavingThrowChange}/>
                        <CharacterSkills handleSkillChange={handleSkillChange} />
                        <CharacterLanguages/>
                        <CharacterEquipProfs/>
                    </div>
                    <div id="character-profs-altres-cont">
                        <CharacterAltRes />
                        <CharacterEquipment handleAddEquipment={handleAddEquipment} handleDeleteEquipment={handleDeleteEquipment} />
                    </div>
                    <CharacterAttacks postAttack={postAttack} patchAttack={patchAttack} deleteAttack={deleteAttack} />
                    <CharacterTraits postTrait={postTrait} patchTrait={patchTrait} deleteTrait={deleteTrait}/>
                    <CharacterFeatures postFeature={postFeature} patchFeature={patchFeature} deleteFeature={deleteFeature} />
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
                        
                    </StickyBox>
                </div>
            </div>
            } {/* This bracket is to close the loading conditional*/}
        </CharacterContext.Provider>
    )

}

export default Character;