import React, {useState, useContext} from "react";
import './CharacterEquipment.css'
import CharacterEquipForm from "./CharacterEquipForm";
import CharacterContext from "./CharacterContext";

const CharacterEquipment = ({handleAddEquipment, handleDeleteEquipment})=>{

    const {character, formData, saveCharacter} = useContext(CharacterContext)

    const [showForm, setShowForm] = useState(false)

    const showEquipForm = (evt)=>{
        evt.preventDefault();
        setShowForm(true);
    }

    const deleteItem = async (evt)=>{
        evt.preventDefault();
        const name = evt.target.dataset.itemname;
        await handleDeleteEquipment(name);
    }



    return(
        <div id="character-equip-cont">
            <h2>Equipment</h2>
            <p>
                <button onClick={showEquipForm}>New Item</button>
            </p>
            {showForm ? 
            <CharacterEquipForm setShowForm={setShowForm} handleAddEquipment={handleAddEquipment}/>
            :<></>}
            <ul id="character-equip-list">
                {character.equipment.map((item)=>(
                    <li key={item.name}>
                        <b>{item.amount}</b> {item.name} <button data-itemname={item.name} onClick={deleteItem}>X</button>
                    </li>
                ))}
            </ul>
        </div>
    )

}

export default CharacterEquipment;