import React, {useState, useEffect, useContext} from "react";
import { Card, CardBody, CardHeader, ListGroup, ListGroupItem } from "react-bootstrap";
import { useParams, useNavigate } from "react-router";
import checkAuthOrAdmin from "./Helpers";
import { CORESTATS, SKILLS } from "./data";

import "./Character.css"

const Character = ({getCharacter})=>{

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))
    const {id} = useParams();
    const nav = useNavigate();

    const [loading, setLoading] = useState(true);

    const [character, setCharacter] = useState({});

    const [formData, setFormData] = useState({});

    //Fetch character data, add to state, and generate form fields from character keys
    useEffect(()=>{
        const fetchCharacter = async (charID)=>{
            setLoading(true);
            const resp = await getCharacter(charID);
            if(!checkAuthOrAdmin(user, resp.data.character.creatorID)){
                nav('/403');
            };
            setCharacter(resp.data.character);
            let startFormData = {};
            const keys = Object.keys(resp.data.character);
            keys.forEach((key)=>{
                startFormData[key] = resp.data.character[key];
            });
            setFormData(startFormData);
            setLoading(false);
        }
        fetchCharacter(id);   
    },[]);

    //Generic handler for form changes
    const handleChange = (evt)=>{
        const {name, value} = evt.target;
        setFormData((data)=>({
            ...data,
            [name] : value
        }));
    };

    //Special handler to update the core stat modifiers when the core stats change
    const handleStatChange = (evt)=>{
        const {name, value} = evt.target;
        const nameMod = name + 'Mod';
        const modValue = Math.floor((value - 10)/2);
        setFormData((data)=>({
            ...data,
            [name] : value,
        }));
        setCharacter((data)=>({
            ...data,
            [nameMod] : modValue
        }));
    };

    //Special handle to update the character saving throw proficiencies
    const handleSavingThrowChange = (evt)=>{
        const {name, value} = evt.target;
        let currSavingProfs = character.savingProfs;
        if(currSavingProfs.includes(value)){
            const idx = currSavingProfs.indexOf(value)
            currSavingProfs.splice(idx, 1);
        }else{
            currSavingProfs.push(value);
        }
        setCharacter((data)=>({
            ...data,
            savingProfs : currSavingProfs
        }));
    };

    //Special handle to update the character skill proficiencies
    const handleSkillChange = (evt)=>{
        const {name, value} = evt.target;
        console.log(name,value);
        let currSkillProfs = character.skillProfs;
        if(currSkillProfs.includes(value)){
            const idx = currSkillProfs.indexOf(value)
            currSkillProfs.splice(idx, 1);
        }else{
            currSkillProfs.push(value);
        }
        setCharacter((data)=>({
            ...data,
            skillProfs : currSkillProfs
        }));
    };

    //Helper to capitalize the first letter of strings
    function capFirstLetter(string){
        return (string.slice(0,1).toUpperCase() + string.slice(1));
    }

    return(
        <>
            {loading ? <p><b>Loading Character...</b></p> : 
            
                <form>
                    <div id="character-basic-cont">
                        <div className="character-basic-box">
                            <p><label htmlFor="charName"><b>Character Name</b></label></p>
                            <p><input
                                type="text"
                                id="charName"
                                name="charName"
                                value={formData.charName}
                                onChange={handleChange}
                            /></p>
                        </div>
                        <div className="character-basic-box"> 
                            <p><b>Race</b></p>
                            <p>{capFirstLetter(character.race)}</p>
                        </div>
                        <div className="character-basic-box">
                            <p><b>Class</b></p>
                            <p>{capFirstLetter(character.className)}</p>
                        </div>
                        <div className="character-basic-box">
                            <p><label htmlFor="level"><b>Level</b></label></p>
                            <p><input
                                type="number"
                                id="level"
                                name="level"
                                min="1"
                                max="20"
                                value={formData.level}
                                onChange={handleChange}
                            /></p>
                        </div>
                        <div className="character-basic-box">
                            <p><label htmlFor="exp"><b>Exp</b></label></p>
                            <p><input
                                type="number"
                                id="exp"
                                name="exp"
                                min="0"
                                value={formData.exp}
                                onChange={handleChange}
                            /></p>
                        </div>
                    </div>
                    <div id="character-core-stat-cont">
                        {CORESTATS.map((stat)=>(
                            <div className="character-core-stat-box">
                                <label htmlFor={stat.slice(0,3)}><b>{capFirstLetter(stat)}</b></label>
                                <br/>
                                <input
                                    className="character-core-stat-input"
                                    type="number"
                                    id={stat.slice(0,3)}
                                    name={stat.slice(0,3)}
                                    min="0"
                                    value={formData[stat.slice(0,3)]}
                                    onChange={handleStatChange}
                                />
                                <p>{character[(stat.slice(0,3)+'Mod')]}</p>
                            </div>
                        ))}
                    </div>
                    <div id="character-skill-cont">
                        <div className="character-skill-box-small">
                            <div className="character-skill-box-subbox">
                                <p><b>Proficieny Bonus</b></p>
                                <p>{character.profBonus}</p>
                            </div>
                            <div className="character-skill-box-subbox">
                                <p><b>Passive Perception</b></p>
                                <p>{character.passPerc}</p>
                            </div>
                            <div className="character-skill-box-subbox">
                                <label htmlFor="inspiration"><b>Inspiration</b></label>
                                <br/>
                                <input
                                    type="number"
                                    id="inspiration"
                                    name="inspiration"
                                    min="0"
                                    value={formData.inspiration}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="character-skill-box-small">
                            <ul id="character-saving-profs-list">
                                {CORESTATS.map((stat)=>(
                                    <li key={stat}>
                                        {character.savingProfs.includes(stat) ? 
                                            <>
                                                <input
                                                    type="checkbox"
                                                    id={stat+"Save"}
                                                    name={stat+"Save"}
                                                    value={stat}
                                                    onChange={handleSavingThrowChange}
                                                    checked
                                                />
                                                <label htmlFor={stat+"Save"}>{capFirstLetter(stat)} : </label>
                                                <b>{character[stat.slice(0,3)+"Mod"]+character.profBonus}</b>
                                            </>
                                            :
                                            <>
                                                <input
                                                    type="checkbox"
                                                    id={stat+"Save"}
                                                    name={stat+"Save"}
                                                    value={stat}
                                                    onChange={handleSavingThrowChange}
                                                />
                                                <label htmlFor={stat+"Save"}>{capFirstLetter(stat)} : </label>
                                                <b>{character[stat.slice(0,3)+"Mod"]}</b>
                                            </>
                                        }
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="character-skill-box-large">
                            <ul id="character-skill-list">
                                {SKILLS.map((skill)=>(
                                    <li key={skill.name}>
                                        {character.skillProfs.includes(skill.name) ?
                                            <>
                                                <input
                                                    type="checkbox"
                                                    id={skill.name}
                                                    name={skill.name}
                                                    value={skill.name}
                                                    onChange={handleSkillChange}
                                                    checked
                                                />
                                                <label htmlFor={skill.name}>{skill.title} </label>
                                                <i>{'(' + capFirstLetter(skill.skillAbility) + ')'} : </i>
                                                <b>{character[skill.skillAbility+"Mod"]+character.profBonus}</b>
                                            </>
                                            :
                                            <>
                                                <input
                                                    type="checkbox"
                                                    id={skill.name}
                                                    name={skill.name}
                                                    value={skill.name}
                                                    onChange={handleSkillChange}
                                                />
                                                <label htmlFor={skill.name}>{skill.title} </label>
                                                <i>{'(' + capFirstLetter(skill.skillAbility) + ')'} : </i>
                                                <b>{character[skill.skillAbility+"Mod"]}</b>
                                            </>
                                        }
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </form>
            
            }
        </>
    )

}

export default Character;