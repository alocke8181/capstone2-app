import React, {useState} from "react";
import NewAttackForm from "./NewAttackForm";
import Api from "../Api";
import CharacterAttackBox from "./CharacterAttackBox";

const CharacterAttacks = ({character, saveCharacter})=>{

    const handleNewAttackSubmit = async (data)=>{
        data.charID = character.id;
        let resp = await Api.postAttack(data);
        character.attacks.push(resp.data.attack);
        await saveCharacter();
        return resp;
    }

    const handleDeleteAttack = async (evt)=>{
        const attackID = parseInt(evt.target.dataset.attackid)
        let newCharacterAttacks = character.attacks.filter((attack) => (attack.id !== attackID));
        character.attacks = newCharacterAttacks;
        await saveCharacter();
        let resp = await Api.deleteAttack(attackID);
    }

    const [showNewAttackForm, setShowNewAttackForm] = useState(false);

    const showAttackForm = () =>{
        setShowNewAttackForm(true);
    }

    return(
        <div id="character-attack-big-cont">
                        <h2>Attacks</h2>
                        <button onClick={showAttackForm}>Add Attack</button>
                        {showNewAttackForm ? <NewAttackForm setShowAttackForm={setShowNewAttackForm} handleNewAttackSubmit={handleNewAttackSubmit}/> : <></>}
                        <div id="character-attack-cont">
                            {character.attacks.map((attack)=>(
                                <CharacterAttackBox character={character} attack={attack} handleDeleteAttack={handleDeleteAttack}/>
                            ))}
                        </div>
                    </div>
    )

}

export default CharacterAttacks;