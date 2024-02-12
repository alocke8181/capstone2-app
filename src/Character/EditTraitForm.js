import React, {useState} from "react";

const EditTraitForm = ({editingTrait, hideEditTraitForm, handleEditTraitSubmit})=>{


    const [formData, setFormData] = useState({...editingTrait})



    const handleChange = (evt)=>{
        const {name, value} = evt.target;
        setFormData((data)=>({
            ...data,
            [name] : value
        }));
    };


    const handleSubmit = async (evt)=>{
        evt.preventDefault();
        await handleEditTraitSubmit(formData);
        
    }

    return (
        <div className="new-trait-form-cont">
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
                    <button onClick={hideEditTraitForm}>Cancel</button>
                </p>
                
            </form>
        </div>
    )

}

export default EditTraitForm;