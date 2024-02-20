import React, {useState, useContext} from "react";
import NewAttackForm from "./NewAttackForm";
import EditAttackForm from "./EditAttackForm";
import CharacterAttackBox from "./CharacterAttackBox";
import CharacterContext from "./CharacterContext";
import './CharacterAttacks.css';

const CharacterAttacks = ({postAttack, patchAttack, deleteAttack})=>{

    const {character, formData, saveCharacter} = useContext(CharacterContext)


    const [showNewAttackForm, setShowNewAttackForm] = useState(false);

    const showAttackForm = () =>{
        setShowNewAttackForm(true);
    }

    const [editingAttack, setEditingAttack] = useState(null);
    const [showEditAttackForm, setShowEditAttackForm] = useState(false);

    const handleNewAttackSubmit = async (data)=>{
        data.charID = character.id;
        let resp = await postAttack(data);
        character.attacks.push(resp.data.attack);
        await saveCharacter();
        return resp;
    }

    const handleDeleteAttack = async (evt)=>{
        const attackID = parseInt(evt.target.dataset.attackid)
        let newCharacterAttacks = character.attacks.filter((attack) => (attack.id !== attackID));
        character.attacks = newCharacterAttacks;
        await saveCharacter();
        let resp = await deleteAttack(attackID);
    }

    const handleEditAttackSubmit = async (data)=>{
        data.charID = character.id;
        let resp = await patchAttack(data);
        hideEditAttackForm();
        await saveCharacter();
    }

    const showEditAttackFormFunc = (evt)=>{
        const attackID = parseInt(evt.target.dataset.attackid);
        let editAttack = character.attacks.filter((attack)=>(attack.id === attackID))[0];
        setEditingAttack(editAttack);
        setShowEditAttackForm(true);
    }

    const hideEditAttackForm = ()=>{
        setShowEditAttackForm(false);
        setEditingAttack(null);
    }

    return(
        <div id="character-attack-big-cont">
                        <h2>Attacks</h2>
                        <button onClick={showAttackForm}>Add Attack</button>
                        {showNewAttackForm ? <NewAttackForm setShowNewAttackForm={setShowNewAttackForm} handleNewAttackSubmit={handleNewAttackSubmit}/> : <></>}
                        {showEditAttackForm ? <EditAttackForm  editingAttack={editingAttack} 
                            handleEditAttackSubmit={handleEditAttackSubmit} hideEditAttackForm={hideEditAttackForm}/> : <></>}
                        <div id="character-attack-cont">
                            {character.attacks.map((attack)=>(
                                <CharacterAttackBox character={character} attack={attack} 
                                    handleDeleteAttack={handleDeleteAttack} key={attack.name} showEditAttackFormFunc={showEditAttackFormFunc}/>
                            ))}
                        </div>
                    </div>
    )

}

export default CharacterAttacks;