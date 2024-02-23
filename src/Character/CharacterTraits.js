import React, {useState, useContext} from "react";

import NewTraitForm from "./NewTraitForm";
import EditTraitForm from "./EditTraitForm";
import CharacterTraitBox from "./CharacterTraitBox";
import CharacterContext from "./CharacterContext";
import UserContext from "../UserContext";
import Api from "../Api";
import './CharacterTraits.css';
import Collapsible from "react-collapsible";

const CharacterTraits = ()=>{

    const {character, formData, saveCharacter} = useContext(CharacterContext);
    const {user, token, setUser} = useContext(UserContext);


    const [showNewTraitForm, setShowNewTraitForm] = useState(false);

    const showTraitForm = ()=>{
        setShowNewTraitForm(true);
    };

    const [editingTrait, setEditingTrait] = useState(null);
    const [showEditTraitForm, setShowEditTraitForm] = useState(false);

    const handleNewTraitSubmit = async (data, isCustom)=>{
        let trait;
        if(isCustom){
            delete data.choice;
            data.charID = character.id;
            data.userID = user.id;
            let resp = await Api.postTrait(data, token);
            trait = resp.data.trait;
        }else{
            if(character.traits.some((trait)=>(trait.index && data.choice && (trait.index === data.choice)))){
                alert('Cannot have duplicate preset traits');
                return;
            }else{
                let resp = await Api.getExternalTrait(data.choice)
                trait = {
                    index : resp.data.index,
                    name : resp.data.name,
                    description : resp.data.desc.join(' ')
                };
            };
        };
        character.traits.push(trait);
        await saveCharacter();
    }

    const handleEditTraitSubmit = async (data)=>{
        data.charID = character.id;
        data.userID = user.id;
        let resp = await Api.patchTrait(data, token);
        hideEditTraitForm();
        await saveCharacter();
    }

    const showEditTraitFormFunc = (evt)=>{
        const traitID = parseInt(evt.target.dataset.traitid);
        let editTrait = character.traits.filter((trait)=>(trait.id !== null && trait.id === traitID))[0];
        setEditingTrait(editTrait);
        setShowEditTraitForm(true);
    }

    const hideEditTraitForm = ()=>{
        setShowEditTraitForm(false);
        setEditingTrait(null);
    }

    const handleDeleteTrait = async (evt)=>{
        if(evt.target.dataset.traitid){
            const data = {userID : user.id}
            const traitID = parseInt(evt.target.dataset.traitid);
            let newCharacterTraits = character.traits.filter((trait) =>(!trait.id || (trait.id && trait.id !== traitID)));
            character.traits = newCharacterTraits;
            await saveCharacter();
            await Api.deleteTrait(traitID, data, token);
        }else if(evt.target.dataset.traitindex){
            const traitIndex = evt.target.dataset.traitindex;
            let newCharacterTraits = character.traits.filter((trait)=>(!trait.index || (trait.index && trait.index !== traitIndex)));
            character.traits = newCharacterTraits;
            await saveCharacter();
        }
    }


    return(
        <Collapsible trigger='Racial Traits'>
            <div id="character-trait-big-cont">
                <button onClick={showTraitForm}>Add Trait</button>
                {showNewTraitForm ? <NewTraitForm setShowTraitForm = {setShowNewTraitForm} handleNewTraitSubmit={handleNewTraitSubmit} />: <></>}
                {showEditTraitForm ? <EditTraitForm editingTrait={editingTrait} hideEditTraitForm={hideEditTraitForm}
                    handleEditTraitSubmit={handleEditTraitSubmit} />: <></>}
                <div id="character-trait-cont">
                    {character.traits.map((trait)=>(
                        <CharacterTraitBox trait={trait} handleDeleteTrait={handleDeleteTrait} key={trait.name} 
                            showEditTraitFormFunc={showEditTraitFormFunc}/>
                    ))}
                </div>
            </div>
        </Collapsible>
    )
}

export default CharacterTraits;