import React from "react";
import './CharacterTraitBox.css';

const CharacterTraitBox = ({trait, handleDeleteTrait, showEditTraitFormFunc})=>{

    return(
        <div className="character-trait-box">
            <h3>{trait.name}</h3>
            <p>{Array.isArray(trait.description) ? trait.description.join(' ') : trait.description}</p>
            <p>
                {trait.charID ? 
                <>
                    <button data-traitid={trait.id} onClick={showEditTraitFormFunc}>Edit</button>
                    <button data-traitid={trait.id} onClick={handleDeleteTrait}>Delete</button>
                </> 
                : 
                <>
                    <button data-traitindex={trait.index} onClick={handleDeleteTrait}>Delete</button>
                </>
                }
            </p>
        </div>
    )
}

export default CharacterTraitBox;