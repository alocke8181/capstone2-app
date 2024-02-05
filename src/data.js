import React from "react";

//This file contains raw data to mostly be used for mapping purposes(eg mapping to selection options)

const CORESTATS = ['strength','dexterity','constitution','intelligence','wisdom','charisma'];

const SKILLS = [
    {
        name : 'acrobatics',
        title : 'Acrobatics',
        skillAbility : 'dex'
    },
    {
        name : 'animal-handling',
        title : 'Animal Handling',
        skillAbility : 'wis'
    },
    {
        name : 'arcana',
        title : 'Arcana',
        skillAbility : 'int'
    },
    {
        name : 'athletics',
        title : 'Athletics',
        skillAbility : 'str'
    },
    {
        name : 'deception',
        title : 'Deception',
        skillAbility : 'cha'
    },
    {
        name : 'history',
        title : 'History',
        skillAbility : 'int'
    },
    {
        name : 'insight',
        title : 'Insight',
        skillAbility : 'wis'
    },
    {
        name : 'intimidation',
        title : 'Intimidation',
        skillAbility : 'cha'
    },
    {
        name : 'investigation',
        title : 'Investigation',
        skillAbility : 'int'
    },
    {
        name : 'medicine',
        title : 'Medicine',
        skillAbility : 'wis'
    },
    {
        name : 'nature',
        title : 'Nature',
        skillAbility : 'int'
    },
    {
        name : 'perception',
        title : 'Perception',
        skillAbility : 'wis'
    },
    {
        name : 'performance',
        title : 'Performance',
        skillAbility : 'cha'
    },
    {
        name : 'persuasion',
        title : 'Persuasion',
        skillAbility : 'cha'
    },
    {
        name : 'religion',
        title : 'Religion',
        skillAbility : 'int'
    },
    {
        name : 'sleight-of-hand',
        title : 'Sleight of Hand',
        skillAbility : 'dex'
    },
    {
        name : 'stealth',
        title : 'Stealth',
        skillAbility : 'dex'
    },
    {
        name : 'survival',
        title : 'Survival',
        skillAbility : 'wis'
    },
]

const TRAITS = [
    {"index":"brave","name":"Brave","url":"/api/traits/brave"},
    {"index":"artificers-lore","name":"Artificer's Lore","url":"/api/traits/artificers-lore"},
    {"index":"breath-weapon","name":"Breath Weapon","url":"/api/traits/breath-weapon"},
    {"index":"damage-resistance","name":"Damage Resistance","url":"/api/traits/damage-resistance"},
    {"index":"darkvision","name":"Darkvision","url":"/api/traits/darkvision"},
    {"index":"draconic-ancestry","name":"Draconic Ancestry","url":"/api/traits/draconic-ancestry"},
    {"index":"draconic-ancestry-black","name":"Draconic Ancestry (Black)","url":"/api/traits/draconic-ancestry-black"},
    {"index":"draconic-ancestry-blue","name":"Draconic Ancestry (Blue)","url":"/api/traits/draconic-ancestry-blue"},
    {"index":"draconic-ancestry-brass","name":"Draconic Ancestry (Brass)","url":"/api/traits/draconic-ancestry-brass"},
    {"index":"draconic-ancestry-bronze","name":"Draconic Ancestry (Bronze)","url":"/api/traits/draconic-ancestry-bronze"},
    {"index":"draconic-ancestry-copper","name":"Draconic Ancestry (Copper)","url":"/api/traits/draconic-ancestry-copper"},
    {"index":"draconic-ancestry-gold","name":"Draconic Ancestry (Gold)","url":"/api/traits/draconic-ancestry-gold"},
    {"index":"draconic-ancestry-green","name":"Draconic Ancestry (Green)","url":"/api/traits/draconic-ancestry-green"},
    {"index":"draconic-ancestry-red","name":"Draconic Ancestry (Red)","url":"/api/traits/draconic-ancestry-red"},
    {"index":"draconic-ancestry-silver","name":"Draconic Ancestry (Silver)","url":"/api/traits/draconic-ancestry-silver"},
    {"index":"draconic-ancestry-white","name":"Draconic Ancestry (White)","url":"/api/traits/draconic-ancestry-white"},
    {"index":"dwarven-combat-training","name":"Dwarven Combat Training","url":"/api/traits/dwarven-combat-training"},
    {"index":"dwarven-resilience","name":"Dwarven Resilience","url":"/api/traits/dwarven-resilience"},
    {"index":"dwarven-toughness","name":"Dwarven Toughness","url":"/api/traits/dwarven-toughness"},
    {"index":"elf-weapon-training","name":"Elf Weapon Training","url":"/api/traits/elf-weapon-training"},
    {"index":"extra-language","name":"Extra Language","url":"/api/traits/extra-language"},
    {"index":"fey-ancestry","name":"Fey Ancestry","url":"/api/traits/fey-ancestry"},
    {"index":"gnome-cunning","name":"Gnome Cunning","url":"/api/traits/gnome-cunning"},
    {"index":"halfling-nimbleness","name":"Halfling Nimbleness","url":"/api/traits/halfling-nimbleness"},
    {"index":"hellish-resistance","name":"Hellish Resistance","url":"/api/traits/hellish-resistance"},
    {"index":"high-elf-cantrip","name":"High Elf Cantrip","url":"/api/traits/high-elf-cantrip"},
    {"index":"infernal-legacy","name":"Infernal Legacy","url":"/api/traits/infernal-legacy"},
    {"index":"keen-senses","name":"Keen Senses","url":"/api/traits/keen-senses"},
    {"index":"lucky","name":"Lucky","url":"/api/traits/lucky"},
    {"index":"menacing","name":"Menacing","url":"/api/traits/menacing"},
    {"index":"naturally-stealthy","name":"Naturally Stealthy","url":"/api/traits/naturally-stealthy"},
    {"index":"relentless-endurance","name":"Relentless Endurance","url":"/api/traits/relentless-endurance"},
    {"index":"savage-attacks","name":"Savage Attacks","url":"/api/traits/savage-attacks"},
    {"index":"skill-versatility","name":"Skill Versatility","url":"/api/traits/skill-versatility"},
    {"index":"stonecunning","name":"Stonecunning","url":"/api/traits/stonecunning"},
    {"index":"tinker","name":"Tinker","url":"/api/traits/tinker"},
    {"index":"tool-proficiency","name":"Tool Proficiency","url":"/api/traits/tool-proficiency"},
    {"index":"trance","name":"Trance","url":"/api/traits/trance"}]



export {CORESTATS,
        SKILLS,
        TRAITS};