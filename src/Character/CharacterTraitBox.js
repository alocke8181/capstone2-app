import React from "react";

const CharacterTraitBox = ({trait, handleDeleteTrait})=>{

    return(
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
    )
}

export default CharacterTraitBox;