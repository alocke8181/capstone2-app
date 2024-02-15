import React from "react";
import './Home.css';

const Home = () =>{
    return(
        <div id="home">
            <h2>Welcome to The Starting Tavern</h2>
            <p>
                Every D&D adventure begins the same way: not with the capture of a noble, the fall of a kingdom, or the rise of an evil force, but with four or five
                adventurers sitting in some random non-descript tavern. All of them waiting for someone to burst in shouting about something. 
                Usually, it's not something major like previously mentioned, but rather the farmer's daughter was kidnapped by goblins 
                and the town guards aren't doing anything about it. They're looking for some brave souls to go rescue the girl, and will give a handsome reward for it.
            </p>
            <p>
                This website is where you can have your adventurers begin their journies. Book a room at The Starting Tavern and check-in as many characters as you like! 
                The character sheet has been reorganized for better readability and comes with many automated features. Stat modifiers are automatically calculated 
                and applied to skills and attacks to make gameplay easier. Traits, features, and spells are imported at the click of a button. No more tedious typing 
                or constant copy-pasting! Need to add a custom trait or feature? No problem, create your own in an instant! Proficieny bonuses, hit dice, and spell slots 
                all change when you level up to make it quicker.
            </p>
        </div>
    )
}

export default Home;