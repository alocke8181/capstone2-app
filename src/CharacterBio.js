import React,{useState} from "react";
import './CharacterBio.css';


const CharacterBio = ({character, setCharacter})=>{

    const [formData, setFormData] = useState(character);

    const handleChange = (evt)=>{
        const {name, value} = evt.target;
        setFormData((data)=>({
            ...data,
            [name] : value
        }));
        setCharacter((data)=>({
            ...data,
            [name] : value
        }));
    };

    return (
        <div id="character-bio-cont">
            <form>
                <div id="character-bio-pibf">
                    <div className="character-bio-subcont">
                        <label htmlFor="personality"><h3>Personality</h3></label>
                        <p>
                            <textarea
                                id="personality"
                                name="personality"
                                value={formData.personality}
                                onChange={handleChange}
                            />
                        </p>
                    </div>
                    <div className="character-bio-subcont">
                        <label htmlFor="ideals"><h3>Ideals</h3></label>
                        <p>
                            <textarea
                                id="ideals"
                                name="ideals"
                                value={formData.ideals}
                                onChange={handleChange}
                            />
                        </p>
                    </div>
                    <div className="character-bio-subcont">
                        <label htmlFor="bonds"><h3>Bonds</h3></label>
                        <p>
                            <textarea
                                id="bonds"
                                name="bonds"
                                value={formData.bonds}
                                onChange={handleChange}
                            />
                        </p>
                    </div>
                    <div className="character-bio-subcont">
                        <label htmlFor="flaws"><h3>Flaws</h3></label>
                        <p>
                            <textarea
                                id="flaws"
                                name="flaws"
                                value={formData.flaws}
                                onChange={handleChange}
                            />
                        </p>
                    </div>
                </div>
                <div id="character-bio-ahwa">
                    <div id="character-bio-ahw">
                        <p>
                            <label htmlFor="age"><b>Age : </b></label>
                            <input
                                type="number"
                                id="age"
                                name="age"
                                value={formData.age}
                                onChange={handleChange}
                            />
                        </p>
                        <p>
                            <label htmlFor="height"><b>Height : </b></label>
                            <input
                                type="text"
                                id="height"
                                name="height"
                                value={formData.height}
                                onChange={handleChange}
                            />
                        </p>
                        <p>
                            <label htmlFor="weight"><b>Weight : </b></label>
                            <input
                                type="text"
                                id="weight"
                                name="weight"
                                value={formData.weight}
                                onChange={handleChange}
                            />
                        </p>
                    </div>
                    <div id="character-bio-appearance">
                        <label htmlFor="appearance"><h3>Appearance</h3></label>
                        <p>
                            <textarea
                                id="appearance"
                                name="appearance"
                                value={formData.appearance}
                                onChange={handleChange}
                            />
                        </p>
                    </div>
                </div>
                <div id="character-bio-backstory">
                        <label htmlFor="backstory"><h3>Backstory</h3></label>
                        <p>
                            <textarea
                                id="backstory"
                                name="backstory"
                                value={formData.backstory}
                                onChange={handleChange}
                            />
                        </p>
                    </div>
                <div id="character-bio-allies">
                    <label htmlFor="allies"><h3>Allies</h3></label>
                    <p>
                        <textarea
                            id="allies"
                            name="allies"
                            value={formData.allies}
                            onChange={handleChange}
                        />
                    </p>
                </div>
            </form>
        </div>
    )

}

export default CharacterBio;