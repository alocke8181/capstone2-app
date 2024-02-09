import React, {useState} from "react";
import NewFeatureForm from "./NewFeatureForm";
import CharacterFeatureBox from "./CharacterFeatureBox";

const CharacterFeatures = ({character, saveCharacter, postFeature, deleteFeature})=>{

    const [showNewFeatureForm, setShowNewFeatureForm] = useState(false);

    const showFeatureForm = ()=>{
        setShowNewFeatureForm(true);
    };

    const handleNewFeatureSubmit = async (data, isCustom)=>{
        if(isCustom){
            data.charID = character.id;
        }
        let resp = await postFeature(data, isCustom);
        character.features.push(resp);
        await saveCharacter();
        return resp;
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

    return(
        <div id="character-feat-big-cont">
            <h2>Class Features</h2>
            <button onClick={showFeatureForm}>Add Feature</button>
            {showNewFeatureForm ? <NewFeatureForm setShowFeatureForm = {setShowNewFeatureForm} handleNewFeatureSubmit={handleNewFeatureSubmit} />: <></>}
            <div id="character-feat-cont">
                {character.features.map((feature)=>(
                    <CharacterFeatureBox feature={feature} handleDeleteFeature={handleDeleteFeature} />
                ))}
            </div>
        </div>
    )

}

export default CharacterFeatures;