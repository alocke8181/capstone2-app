import React, {useState} from "react";
import CharacterAltResBox from "./CharacterAltResBox";
import './CharacterAltRes.css'

const CharacterAltRes = ({character, saveCharacter})=>{

    const defaultForm = {
        name : '',
        max : '',
        curr : ''
    }

    const [formData, setFormData] = useState(defaultForm)

    const [showForm, setShowForm] = useState(false);

    const handleChange = (evt)=>{
        const {name, value} = evt.target;
        setFormData((data)=>({
            ...data,
            [name] : value
        }));
    }

    const handleAddAltRes = async (evt)=>{
        evt.preventDefault()
        if(character.altResources.some((resource)=>(resource.name === formData.name))){
            alert(`Cannot have duplicate Alt Resource: ${formData.name}`);
            return;
        }else{
            character.altResources.push({
                name : formData.name,
                max : formData.max,
                curr : formData.curr
            });
            setShowForm(false);
            setFormData(defaultForm);
            await saveCharacter();
        }
        
    }

    const handleDeleteAltRes = async (resName)=>{
        let newAltRes = character.altResources.filter((resource)=>(resource.name !== resName));
        character.altResources = newAltRes;
        await saveCharacter();
    }

    return(
        <div id="character-altres-cont">
            <h2>Alternate Resources</h2>
            
            {showForm ? 
            
            <p>
                <button onClick={()=>{setShowForm(false)}}>Cancel</button>
                <form>
                    <label htmlFor="name">Name : </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                    <label htmlFor="max">Max : </label>
                    <input
                        type="number"
                        min='0'
                        id="max"
                        name="max"
                        value={formData.max}
                        onChange={handleChange}
                    />
                    <label htmlFor="curr">Current : </label>
                    <input
                        type="number"
                        min='0'
                        id="curr"
                        name="curr"
                        value={formData.curr}
                        onChange={handleChange}
                    />
                <button onClick={handleAddAltRes}>Add</button>
                </form>
            </p>
            :
            <p>
                <button onClick={()=>{setShowForm(true)}}>New Resource</button>
            </p>}
            <div id="character-altres-subcont">
                {character.altResources.map((resource)=>(
                    <CharacterAltResBox resource={resource} handleDeleteAltRes={handleDeleteAltRes}/>
                ))}
            </div>
        </div>
    )


}

export default CharacterAltRes;