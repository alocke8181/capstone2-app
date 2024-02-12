import React, {useState} from "react";
import './CharacterAltResBox.css'

const CharacterAltResBox = ({resource, handleDeleteAltRes})=>{

    const [formData, setFormData] = useState({
        max : resource.max,
        curr : resource.curr
    })

    const handleChange = (evt)=>{
        const {name, value} = evt.target;
        setFormData((data)=>({
            ...data,
            [name] : value
        }));
    }

    return(
        <div className="character-altres-box" key={resource.name}>
            <h3>{resource.name}</h3>
            <form>
                <label htmlFor="max">Max : </label>
                <input
                    className="character-input-num-small"
                    type="number"
                    id="max"
                    name="max"
                    min='0'
                    value={formData.max}
                    onChange={handleChange}
                />
                <br/>
                <label htmlFor="curr">Current : </label>
                <input
                    className="character-input-num-small"
                    type="number"
                    id="curr"
                    name="curr"
                    min='0'
                    value={formData.curr}
                    onChange={handleChange}
                />
                <br/>
                <button onClick={()=>{handleDeleteAltRes(resource.name)}}>Delete</button>
            </form>
            
        </div>
    )

}

export default CharacterAltResBox;