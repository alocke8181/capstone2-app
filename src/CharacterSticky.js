import React from "react";
import { Navbar } from "react-bootstrap";

const CharacterSticky = ()=>{
    return(
        <Navbar className="fixed-top" bg="light" expand="lg">
            <a href="#character-basic-cont"> Core Stats & Skills </a> | 
            <a href="#character-equip-cont"> Equipment </a> | 
            <a href="#character-attack-big-cont"> Attacks </a> | 
            <a href="#character-trait-big-cont"> Traits </a> | 
            <a href="#character-feat-big-cont"> Features </a> | 
            <a href="#character-spell-big-cont"> Spells </a> | 
            <a href="#character-bio-cont"> Bio </a>
        </Navbar>
    )
}

export default CharacterSticky;