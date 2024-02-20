import React, {useState, useContext} from "react";
import NewFeatureForm from "./NewFeatureForm";
import EditFeatureForm from "./EditFeatureForm";
import CharacterFeatureBox from "./CharacterFeatureBox";
import CharacterContext from "./CharacterContext";
import './CharacterFeats.css';

const CharacterFeatures = ({postFeature, patchFeature, deleteFeature})=>{

    const {character, formData, saveCharacter} = useContext(CharacterContext)

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

    const [editingFeature, setEditingFeature] = useState(null);
    const [showEditFeatureForm, setShowEditFeatureForm] = useState(false);

    const handleEditFeatureSubmit = async (data)=>{
        data.charID = character.id;
        let resp = await patchFeature(data);
        hideEditFeatureForm();
        await saveCharacter();
    }

    const showEditFeatureFormFunc = (evt)=>{
        const featureID = parseInt(evt.target.dataset.featureid);
        let editFeature = character.features.filter((feature)=>(feature.id !== null && feature.id === featureID))[0];
        setEditingFeature(editFeature);
        setShowEditFeatureForm(true);
    }

    const hideEditFeatureForm = ()=>{
        setShowEditFeatureForm(false);
        setEditingFeature(null);
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
            {showEditFeatureForm ? <EditFeatureForm editingFeature={editingFeature} hideEditFeatureForm={hideEditFeatureForm}
                handleEditFeatureSubmit={handleEditFeatureSubmit} />: <></>}
            <div id="character-feat-cont">
                {character.features.map((feature)=>(
                    <CharacterFeatureBox feature={feature} handleDeleteFeature={handleDeleteFeature} key={feature.name}
                        showEditFeatureFormFunc={showEditFeatureFormFunc}/>
                ))}
            </div>
        </div>
    )

}

export default CharacterFeatures;