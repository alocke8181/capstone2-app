import React, {useState, useContext} from "react";
import NewAttackForm from "./NewAttackForm";
import EditAttackForm from "./EditAttackForm";
import CharacterAttackBox from "./CharacterAttackBox";
import CharacterContext from "./CharacterContext";
import UserContext from "../UserContext";
import Api from "../Api";
import './CharacterAttacks.css';
import Collapsible from "react-collapsible";

const CharacterAttacks = ()=>{

    const {character, formData, saveCharacter} = useContext(CharacterContext)
    const {user, token, setUser} = useContext(UserContext);

    const [showNewAttackForm, setShowNewAttackForm] = useState(false);

    const showAttackForm = () =>{
        setShowNewAttackForm(true);
    }

    const [editingAttack, setEditingAttack] = useState(null);
    const [showEditAttackForm, setShowEditAttackForm] = useState(false);

    //Post a new attack to the database
    const handleNewAttackSubmit = async (data)=>{
        data.charID = character.id;
        data.userID = user.id;
        let resp = await Api.postAttack(data, token);
        character.attacks.push(resp.data.attack);
        await saveCharacter();
        return resp;
    }

    //Delete an attack
    const handleDeleteAttack = async (evt)=>{
        const attackID = parseInt(evt.target.dataset.attackid)
        let newCharacterAttacks = character.attacks.filter((attack) => (attack.id !== attackID));
        character.attacks = newCharacterAttacks;
        await saveCharacter();
        const data ={userID : user.id}
        let resp = await Api.deleteAttack(attackID, data, token);
    }

    //Edit an attack
    const handleEditAttackSubmit = async (data)=>{
        data.charID = character.id;
        data.userID = user.id;
        let resp = await Api.patchAttack(data, token);
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
        <Collapsible trigger={(<h2>Attacks ▼</h2>)} triggerWhenOpen={(<h2>Attacks ▲</h2>)}>
            <div id="character-attack-big-cont">
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
        </Collapsible>
    )

}

export default CharacterAttacks;