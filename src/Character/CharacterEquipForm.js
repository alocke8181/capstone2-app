import React,{useState} from "react";

const CharacterEquipForm = ({setShowForm, handleAddEquipment})=>{

    const defFormData = {
        name : '',
        amount : 0
    }

    const [formData, setFormData] = useState(defFormData);

    const handleChange = (evt)=>{
        const {name, value} = evt.target;
        setFormData((data)=>({
            ...data,
            [name] : value
        }));
    }

    const hideSelf = ()=>{
        setShowForm(false);
    }

    const addItem = async (evt)=>{
        evt.preventDefault();
        if(formData.amount === 0 || formData.name==='' || !formData.name){
            alert('Missing Form Field');
            return;
        }else{
            
            await handleAddEquipment(formData);
            setFormData(defFormData);
            hideSelf()
        }
    }

    return (
        <form>
            <label htmlFor="amount">Amount </label>
            <input
                type="number"
                id="amount"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                min='0'
            />
            <br/>
            <label htmlFor="name">Name </label>
            <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
            />
            <br/>
            <button onClick={addItem}>Add Item</button>
            <button onClick={hideSelf}>Cancel</button>
        </form>
    )

}

export default CharacterEquipForm;