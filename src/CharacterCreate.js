import React, {useState, useEffect, useContext} from "react";
import { useNavigate } from "react-router";
import { CLASSES, RACES, BACKGROUNDS } from "./data";
import { capFirstLetter } from "./Helpers";
import UserContext from "./UserContext";

const CharacterCreate = ({postCharacter})=>{

    const {user, token, setUser} = useContext(UserContext);

    const [errorMsg, setErrorMsg] = useState('');
    const [isError, setIsError] = useState(false);


    const nav = useNavigate();

    const [formData, setFormData] = useState({
        charName : '',
        className : '',
        race : '',
        background : '',
        level : 1,
        exp : 0

    });

    useEffect(()=>{document.title = 'Create Character'; },[]);

    const handleSubmit = async (evt)=>{
        evt.preventDefault();
        setIsError(false);
        setErrorMsg('');
        if(!formData.charName || formData.charName === ''){
            setIsError(true);
            setErrorMsg('Character name cannot be blank!');
            return;
        }else if(!formData.className || formData.className === ''){
            setIsError(true);
            setErrorMsg('Character class cannot be blank!');
            return;
        }else if(!formData.race || formData.race === ''){
            setIsError(true);
            setErrorMsg('Character race cannot be blank!');
            return;
        }else if(!formData.level || formData.level === '0'){
            setIsError(true);
            setErrorMsg('Character cannot be level 0!');
            return;
        }else{
            formData.creatorID = user.id;
            formData.userID = user.id;
            const resp = await postCharacter(formData);
            const id = resp.data.id.id;
            console.log(id);
            nav(`/characters/${id}`);
        }
    }

    const handleChange = (evt)=>{
        const {name, value} = evt.target;
        setFormData((data)=>({
            ...data,
            [name] : value
        }));
    }

    return(
        <div>
            <h2>Create a New Character</h2>
            {isError ? <p className="error">{errorMsg}</p> : <></>}
            <form>
                <p key='charName'><label htmlFor="charName">Name : </label>
                <input
                    type="text"
                    id="charName"
                    name="charName"
                    value={formData.charName}
                    onChange={handleChange}
                /></p>
                
                <p key='className'><label htmlFor="className">Class : </label>
                <select
                    id="className"
                    name="className"
                    value={formData.className}
                    onChange={handleChange}
                >
                    <option value={''} key='defclass'>- Pick One -</option>
                    {CLASSES.map((eachClass)=>(
                        <option value={eachClass} key={eachClass}>{capFirstLetter(eachClass)}</option>
                    ))}
                </select></p>
                <p key='race'><label htmlFor="race">Race : </label>
                <select
                    id="race"
                    name="race"
                    value={formData.race}
                    onChange={handleChange}
                >
                    <option value={''} key='defrace'>- Pick One -</option>
                    {RACES.map((eachRace)=>(
                        <option value={eachRace} key={eachRace}>{capFirstLetter(eachRace)}</option>
                    ))}
                </select></p>
                <p key='background'><label htmlFor="background">Background : </label>
                <select
                    id="background"
                    name="background"
                    value={formData.background}
                    onChange={handleChange}
                >
                    <option value={''} key='defback'>- Pick One -</option>
                    {BACKGROUNDS.map((eachBack)=>(
                        <option value={eachBack} key={eachBack}>{eachBack}</option>
                    ))}
                </select></p>
                <p key='level'><label htmlFor="level">Level : </label>
                <input
                    type="number"
                    id="level"
                    name="level"
                    min='1'
                    value={formData.level}
                    onChange={handleChange}
                /></p>
                <p key='exp'><label htmlFor="exp">Exp : </label>
                <input
                    type="number"
                    id="exp"
                    name="exp"
                    min='0'
                    value={formData.exp}
                    onChange={handleChange}
                /></p>
                <p><button onClick={handleSubmit}>Submit</button></p>
            </form>
        </div>
    )

}

export default CharacterCreate;