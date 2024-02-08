import React, {useState} from "react";
import './CharacterAltResBox.css'

const CharacterAltResBox = ({resource})=>{

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
        <div className="character-altres-box">
            <h3>{resource.name}</h3>
            <form>
                <label htmlFor="max">Max : </label>
                <input
                    type="number"
                    id="max"
                    name="max"
                    min='0'
                    value={formData.max}
                    onChange={handleChange}
                />
                <label htmlFor="curr">Current : </label>
                <input
                    type="number"
                    id="curr"
                    name="curr"
                    min='0'
                    value={formData.curr}
                    onChange={handleChange}
                />
            </form>
        </div>
    )

}

export default CharacterAltResBox;