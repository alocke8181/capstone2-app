import React, {useState} from "react";

import NewTraitForm from "./NewTraitForm";
import CharacterTraitBox from "./CharacterTraitBox";

const CharacterTraits = ({character, saveCharacter, postTrait, deleteTrait})=>{

    const [showNewTraitForm, setShowNewTraitForm] = useState(false);

    const showTraitForm = ()=>{
        setShowNewTraitForm(true);
    };

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
            <div id="character-trait-cont">
                {character.traits.map((trait)=>(
                    <CharacterTraitBox trait={trait} handleDeleteTrait={handleDeleteTrait} key={trait.name}/>
                ))}
            </div>
        </div>
    )
}

export default CharacterTraits;