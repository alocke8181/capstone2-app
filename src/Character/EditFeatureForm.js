import React, {useState} from "react";

const EditFeatureForm = ({editingFeature, hideEditFeatureForm, handleEditFeatureSubmit})=>{


    const [formData, setFormData] = useState({...editingFeature})



    const handleChange = (evt)=>{
        const {name, value} = evt.target;
        setFormData((data)=>({
            ...data,
            [name] : value
        }));
    };


    const handleSubmit = async (evt)=>{
        evt.preventDefault();
        await handleEditFeatureSubmit(formData);
        
    }

    return (
        <div className="new-feat-form-cont">
            <form>
                <ul>
                    <li key="name">
                    <label htmlFor="name">Name : </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    /></li>
                    <li key='description'>
                    <label htmlFor="description">Description : </label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                    /></li>
                </ul> 
                <p>
                    <button onClick={handleSubmit}>Submit</button>
                    <button onClick={hideEditFeatureForm}>Cancel</button>
                </p>
                
            </form>
        </div>
    )

}

export default EditFeatureForm;