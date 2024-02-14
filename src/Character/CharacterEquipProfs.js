import React, {useState, useContext} from "react";
import CharacterContext from "./CharacterContext";

const CharacterEquipProfs = ()=>{
    
    const {character, formData, saveCharacter} = useContext(CharacterContext)
    
    const [equipFormData, setFormData] = useState({
        newProf : ''
    })

    const handleChange = (evt)=>{
        const {name, value} = evt.target;
        setFormData((data)=>({
            ...data,
            [name] : value
        }));
    };

    const handleAddProf = async (evt)=>{
        evt.preventDefault();
        if(!equipFormData.newProf || equipFormData.newProf ===''){
            alert('Enter a proficiency');
            return;
        }else{

            character.equipProfs.push(equipFormData.newProf.replace(' ','-'));
            character.equipProfs.sort();
            setFormData({newProf : ''});
            await saveCharacter();
        }
    }

    const handleDeleteProf = async (evt)=>{
        evt.preventDefault();
        const profDel = evt.target.dataset.prof;
        let newProfs = character.equipProfs.filter((prof)=>(prof !== profDel));
        character.equipProfs = newProfs;
        await saveCharacter();
    }

    return(
        <div id="character-equip-profs">
            <h3>Equipment Proficiencies</h3>
            <form>
                <input
                    type="text"
                    id="newProf"
                    name="newProf"
                    onChange={handleChange}
                    value={equipFormData.newProf}
                />
                <button onClick={handleAddProf}>Add</button>
            </form>
                <ul>
                    {character.equipProfs.map((prof)=>(
                        <li key={prof}>
                            {prof.replace('-',' ')} <button onClick={handleDeleteProf} data-prof={prof}>X</button>
                        </li>
                    ))}
                </ul>
        </div>
    )
}

export default CharacterEquipProfs;