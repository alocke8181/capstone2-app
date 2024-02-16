import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router";
import { CLASSES, RACES, BACKGROUNDS } from "./data";
import { capFirstLetter } from "./Helpers";

const CharacterCreate = ({postCharacter})=>{

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))

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
        formData.creatorID = user.id;
        formData.userID = user.id;
        const resp = await postCharacter(formData);
        const id = resp.data.id.id;
        console.log(id);
        nav(`/characters/${id}`);
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