import React from "react";

const CharacterFeatureBox = ({feature, handleDeleteFeature, showEditFeatureFormFunc})=>{
    return(
        <div className="character-feat-box">
            <h3>{feature.name}</h3>
            <p>{Array.isArray(feature.description) ? feature.description.join(' ') : feature.description}</p>
            <p>
                {feature.charID ? 
                <>
                    <button data-featureid={feature.id} onClick={showEditFeatureFormFunc}>Edit</button>
                    <button data-featureid={feature.id} onClick={handleDeleteFeature}>Delete</button>
                </> 
                : 
                <>
                    <button data-featureindex={feature.index} onClick={handleDeleteFeature}>Delete</button>
                </>
                }
            </p>
        </div>
    )
}

export default CharacterFeatureBox;