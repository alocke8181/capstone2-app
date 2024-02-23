import React, {useState, useContext} from "react";
import NewFeatureForm from "./NewFeatureForm";
import EditFeatureForm from "./EditFeatureForm";
import CharacterFeatureBox from "./CharacterFeatureBox";
import CharacterContext from "./CharacterContext";
import UserContext from "../UserContext";
import Api from "../Api";
import './CharacterFeats.css';
import Collapsible from "react-collapsible";

const CharacterFeatures = ()=>{

    const {character, formData, saveCharacter} = useContext(CharacterContext);
    const {user, token, setUser} = useContext(UserContext);

    const [showNewFeatureForm, setShowNewFeatureForm] = useState(false);
    const [editingFeature, setEditingFeature] = useState(null);
    const [showEditFeatureForm, setShowEditFeatureForm] = useState(false);

    const showFeatureForm = ()=>{
        setShowNewFeatureForm(true);
    };

    //Post a new feature to the backend OR get external data
    const handleNewFeatureSubmit = async (data, isCustom)=>{
        let feature;
        if(isCustom){
            delete data.choice
            data.charID = character.id;
            data.userID = user.id;
            const resp = await Api.postFeature(data, token);
            feature = resp.data.feature;
        }else{
            if(character.features.some((feature)=>(feature.index && data.choice && (feature.index === data.choice)))){
                alert('Cannot have duplicate preset features!');
                return;
            }else{
                const resp = await Api.getExternalFeature(data.choice);
                feature = {
                    index : resp.data.index,
                    name : resp.data.name,
                    description : resp.data.desc.join(' ')
                };
            }
        }
        character.features.push(feature);
        await saveCharacter();
    }

    //Patch a custom feature
    const handleEditFeatureSubmit = async (data)=>{
        data.charID = character.id;
        data.userID = user.id;
        let resp = await Api.patchFeature(data, token);
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

    //Delete a feature
    const handleDeleteFeature = async (evt)=>{
        if(evt.target.dataset.featureid){
            const data = {userID : user.id}
            const featureID = parseInt(evt.target.dataset.featureid);
            let newCharacterFeatures = character.features.filter((feature) =>(!feature.id || (feature.id && feature.id !== featureID)));
            character.features = newCharacterFeatures;
            await saveCharacter();
            await Api.deleteFeature(featureID, data, token);
        }else if(evt.target.dataset.featureindex){
            const featureIndex = evt.target.dataset.featureindex;
            let newCharacterFeatures = character.features.filter((feature)=>(!feature.index || (feature.index && feature.index !== featureIndex)));
            character.features = newCharacterFeatures;
            await saveCharacter();
        };
    };

    return(
        <Collapsible trigger='Class Features'>
            <div id="character-feat-big-cont">
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
        </Collapsible>
    )

}

export default CharacterFeatures;