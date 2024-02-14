import React, {useState, useContext} from "react";
import CharacterAltResBox from "./CharacterAltResBox";
import './CharacterAltRes.css'
import CharacterContext from "./CharacterContext";

const CharacterAltRes = ()=>{

    const {character, formData, saveCharacter} = useContext(CharacterContext)


    const defaultForm = {
        name : '',
        max : '',
        curr : ''
    }

    const [resFormData, setFormData] = useState(defaultForm)

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
        if(character.altResources.some((resource)=>(resource.name === resFormData.name))){
            alert(`Cannot have duplicate Alt Resource: ${resFormData.name}`);
            return;
        }else{
            character.altResources.push({
                name : resFormData.name,
                max : resFormData.max,
                curr : resFormData.curr
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
                
                <form>
                    <label htmlFor="name">Name : </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={resFormData.name}
                        onChange={handleChange}
                    />
                    <br/>
                    <label htmlFor="max">Max : </label>
                    <input
                        type="number"
                        min='0'
                        id="max"
                        name="max"
                        value={resFormData.max}
                        onChange={handleChange}
                    />
                    <br/>
                    <label htmlFor="curr">Current : </label>
                    <input
                        type="number"
                        min='0'
                        id="curr"
                        name="curr"
                        value={resFormData.curr}
                        onChange={handleChange}
                    />
                    <br/>
                <button onClick={handleAddAltRes}>Add</button>
                <button onClick={()=>{setShowForm(false)}}>Cancel</button>
                </form>
            </p>
            :
            <p>
                <button onClick={()=>{setShowForm(true)}}>New Resource</button>
                
            </p>}
            <div id="character-altres-subcont">
                {character.altResources.map((resource)=>(
                    <CharacterAltResBox resource={resource} handleDeleteAltRes={handleDeleteAltRes} key={resource.name}/>
                ))}
            </div>
        </div>
    )


}

export default CharacterAltRes;