import React, {useState, useEffect, useContext} from "react";
import { useParams } from "react-router";
import { Card, CardBody, CardHeader, ListGroup, ListGroupItem } from "react-bootstrap";
import CharacterContext from "./CharacterContext";

const CharacterBasic = () =>{

    let character = useContext(CharacterContext)

    const [formData, setFormData] = useState({
        charName : character.charName,
        race : character.race,
        className : character.className,
        background : character.background,
        level : character.level,
        exp : character.exp
    });

    const handleChange = (evt)=>{
        const {name, value} = evt.target;
        setFormData((data)=>({
            ...data,
            [name] : value
        }));
    };

    //Function to be called by the parent to get child information
    function passDataUp(){
        return formData;
    }

    return (
        <form>
            <Card>
                <CardBody>
                    <ListGroup horizontal>
                        <ListGroup.Item key='charName'>
                            <Card>
                                <CardBody>
                                    <label htmlFor="charName">Character Name </label>
                                    <input
                                        type="text"
                                        id="charName"
                                        name="charName"
                                        value={formData.charName}
                                        onChange={handleChange}
                                    />
                                </CardBody>
                            </Card>
                        </ListGroup.Item>
                        <ListGroup.Item key='race'>
                            <Card>
                                <CardBody>
                                    <label htmlFor="race">Race </label>
                                    <select
                                        id="race"
                                        name="race"
                                        defaultValue={formData.race}
                                        onChange={handleChange}>
                                            <option value="dragonborn">Dragonborn</option>
                                            <option value="dwarf">Dwarf</option>
                                            <option value="elf">Elf</option>
                                            <option value="gnome">Gnome</option>
                                            <option value="half-elf">Half-elf</option>
                                            <option value="half-orc">Half-orc</option>
                                            <option value="halfling">Halfling</option>
                                            <option value="human">Human</option>
                                            <option value="tiefling">Tiefling</option>
                                    </select>
                                </CardBody>
                            </Card>
                        </ListGroup.Item>
                        <ListGroup.Item key='className'>
                            <Card>
                                <CardBody>
                                    <label htmlFor="className">Class </label>
                                    <select
                                        id="className"
                                        name="className"
                                        defaultValue={formData.className}
                                        onChange={handleChange}>
                                            <option value="barbarian">Barbarian</option>
                                            <option value="bard">Bard</option>
                                            <option value="cleric">Cleric</option>
                                            <option value="druid">Druid</option>
                                            <option value="fighter">Fighter</option>
                                            <option value="monk">Monk</option>
                                            <option value="paladin">Paladin</option>
                                            <option value="ranger">Ranger</option>
                                            <option value="rogue">Rogue</option>
                                            <option value="sorcerer">Sorcerer</option>
                                            <option value="warlock">Warlock</option>
                                            <option value="wizard">Wizard</option>
                                    </select>
                                </CardBody>
                            </Card>
                        </ListGroup.Item>
                        <ListGroup.Item key='background'>
                            <Card>
                                <CardBody>
                                <label htmlFor="background">Background </label>
                                    <select
                                        id="background"
                                        name="background"
                                        defaultValue={formData.background}
                                        onChange={handleChange}>
                                            <option value="acolyte">Acolyte</option>
                                            <option value="charlatan">Charlatan</option>
                                            <option value="criminal">Criminal</option>
                                            <option value="entertainer">Entertainer</option>
                                            <option value="folk-hero">Folk Hero</option>
                                            <option value="gladiator">Gladiator</option>
                                            <option value="guild-member">Guild Member</option>
                                            <option value="hermit">Hermit</option>
                                            <option value="knight">Knight</option>
                                            <option value="noble">Noble</option>
                                            <option value="outlander">Outlander</option>
                                            <option value="pirate">Pirate</option>
                                            <option value="sage">Sage</option>
                                            <option value="sailor">Sailor</option>
                                            <option value="soldier">Soldier</option>
                                            <option value="urchin">Urchin</option>
                                    </select>
                                </CardBody>
                            </Card>
                        </ListGroup.Item>
                        <ListGroup.Item key='level'>
                            <Card>
                                <CardBody>
                                    <label htmlFor="level">Level </label>
                                    <input
                                        type="number"
                                        id="level"
                                        name="level"
                                        min="1"
                                        max="20"
                                        value={formData.level}
                                        onChange={handleChange}
                                    />
                                </CardBody>
                            </Card>
                        </ListGroup.Item>
                        <ListGroup.Item key='exp'>
                            <Card>
                                <CardBody>
                                    <label htmlFor="exp">Exp </label>
                                    <input
                                        type="number"
                                        id="exp"
                                        name="exp"
                                        min="0"
                                        value={formData.exp}
                                        onChange={handleChange}
                                    />
                                </CardBody>
                            </Card>
                        </ListGroup.Item>
                    </ListGroup>
                </CardBody>
            </Card>
        </form>
    )

}

export default CharacterBasic;