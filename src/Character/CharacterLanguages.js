import React,{useState, useContext} from "react";
import CharacterContext from "./CharacterContext";

const CharacterLanguages = ()=>{

    const {character, formData, saveCharacter} = useContext(CharacterContext)

    const [langFormData, setFormData] = useState({
        newLang : ''
    })

    const handleChange = (evt)=>{
        const {name, value} = evt.target;
        setFormData((data)=>({
            ...data,
            [name] : value
        }));
    };

    const handleAddLang = async (evt)=>{
        evt.preventDefault();
        if(!langFormData.newLang || langFormData.newLang ===''){
            alert('Enter a language');
            return;
        }else{
            character.languages.push(langFormData.newLang);
            character.languages.sort();
            setFormData({newLang : ''});
            await saveCharacter();
        }
    }

    const handleDeleteLang = async (evt)=>{
        evt.preventDefault();
        const langDel = evt.target.dataset.language;
        let newLangs = character.languages.filter((lang)=>(lang !== langDel));
        character.languages = newLangs;
        await saveCharacter();
    }

    return (
        <div id="character-languages">
            <h3>Languages</h3>
            <form>
                <input
                    type="text"
                    id="newLang"
                    name="newLang"
                    onChange={handleChange}
                    value={langFormData.newLang}
                />
                <button onClick={handleAddLang}>Add</button>
            </form>
            <ul>
                {character.languages ? <>
                {character.languages.map((language)=>(
                    <li key={language}>
                        {language} <button onClick={handleDeleteLang} data-language={language}>X</button>
                    </li>
                ))}</>
                : <></>}
            </ul>
        </div>
    )

}

export default CharacterLanguages;