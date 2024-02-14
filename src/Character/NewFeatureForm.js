import React, {useState} from "react";
import { FEATURES } from "../data";

const NewFeatureForm = ({setShowFeatureForm, handleNewFeatureSubmit})=>{

    const defaultFormData = {
        name : '',
        description : '',
        choice : ''
    }

    const [formData, setFormData] = useState({...defaultFormData})

    const [loading, setLoading] = useState(false);

    const [isCustom, setIsCustom] = useState(false)

    const setIsCustomFalse = (evt)=>{
        evt.preventDefault();
        setIsCustom(false);
    }

    const setIsCustomTrue = (evt)=>{
        evt.preventDefault();
        setIsCustom(true);
    };

    const handleChange = (evt)=>{
        const {name, value} = evt.target;
        setFormData((data)=>({
            ...data,
            [name] : value
        }));
    };

    const hideSelf = ()=>{
        setFormData(defaultFormData);
        setShowFeatureForm(false);
    };

    const handleSubmit = async (evt)=>{
        evt.preventDefault();
        if(!isCustom && (formData.choice === '' || !formData.choice)){
            alert('Please select a feature, or enter a custom feature!');
            return;
        }else if(isCustom && (formData.name === '' || !formData.name || formData.description === '' || !formData.description)){
            alert('Please enter a name and description, or pick a standard feature!');
            return;
        }else{
            console.log(formData.choice);
            setLoading(true);
            let resp = await handleNewFeatureSubmit(formData, isCustom);
            setLoading(false);
            setShowFeatureForm(false);
            setFormData(defaultFormData);
        }
    }

    return (
        <div className="new-feature-form-cont">
            {loading ? <p><b>Loading...</b></p> : <></>}
            <form>
                {isCustom ? 
                <>
                    <p><button onClick={setIsCustomFalse}>Add Standard Feature</button></p>
                    <label htmlFor="name">Name : </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                    <br/>
                    <label htmlFor="description">Description : </label>
                    <br/>
                    <textarea
                        id="description"
                        name="description"
                        rows='4'
                        cols='50'
                        value={formData.description}
                        onChange={handleChange}
                    />
                </> 
                : 
                <>
                    <p><button onClick={setIsCustomTrue}>Add Custom Feature</button></p>
                    <label htmlFor="choice">Select Feature : </label>
                    <select
                        id="choice"
                        name="choice"
                        value={formData.choice}
                        onChange={handleChange}>
                            <option key='default' value=''>-Pick A Feature-</option>
                            {FEATURES.map((feature)=>(
                                <option key={feature.index} value={feature.index}>{feature.name}</option>
                            ))}
                        </select>
                </>}
                <p>
                    <button onClick={handleSubmit}>Submit</button>
                    <button onClick={hideSelf}>Cancel</button>
                </p>
                
            </form>
        </div>
    )
}

export default NewFeatureForm;