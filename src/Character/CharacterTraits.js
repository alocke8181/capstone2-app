import React, {useState, useContext} from "react";

import NewTraitForm from "./NewTraitForm";
import EditTraitForm from "./EditTraitForm";
import CharacterTraitBox from "./CharacterTraitBox";
import CharacterContext from "./CharacterContext";

const CharacterTraits = ({postTrait, patchTrait, deleteTrait})=>{

    const {character, formData, saveCharacter} = useContext(CharacterContext)


    const [showNewTraitForm, setShowNewTraitForm] = useState(false);

    const showTraitForm = ()=>{
        setShowNewTraitForm(true);
    };

    const [editingTrait, setEditingTrait] = useState(null);
    const [showEditTraitForm, setShowEditTraitForm] = useState(false);

    const handleNewTraitSubmit = async (data, isCustom)=>{
        if(!isCustom){
            if(character.traits.some((trait)=>(trait.index && data.choice && (trait.index === data.choice)))){
                alert('Cannot have duplicate preset traits');
                return;
            }else{
                if(isCustom){
                    data.charID = character.id;
                }
                
                let resp = await postTrait(data, isCustom);
                character.traits.push(resp);
                await saveCharacter();
                return resp;
            }
        }else{
            if(isCustom){
                data.charID = character.id;
            }
            
            let resp = await postTrait(data, isCustom);
            character.traits.push(resp);
            await saveCharacter();
            return resp;
        }
    }

    const handleEditTraitSubmit = async (data)=>{
        data.charID = character.id;
        let resp = await patchTrait(data);
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


    return(
        <div id="character-trait-big-cont">
            <h2>Racial Traits </h2>
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
    )
}

export default CharacterTraits;