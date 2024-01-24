//layout for the character object

//Route 1: Do as much work as possible server side and send a lot of data <-- THIS ONE
//Route 2: Do as much work as possible client side and send as little data as possible


const character = {
    //Basic info
    name : 'Default Name',
    race : 'Elf',
    subrace : 'Wood Elf',
    classType : 'Rogue',
    sublclass : 'Theif',
    background : 'Theif',
    alignment : 'Neutral Evil',
    level : 1,
    exp : 100,


    //Core Stats
    //Can be derived from base stats
    str : 10,
    //strMod : Math.floor((this.str -10)/2),
    dex : 17, 
    //dexMod : Math.floor((this.dex -10)/2),
    con : 15,
    //conMod : Math.floor((this.con -10)/2),
    int : 8,
    //intMod : Math.floor((this.int -10)/2),
    wis : 12,
    //wisMod : Math.floor((this.wis -10)/2),
    cha : 13,
    //chaMod : Math.floor((this.cha -10)/2),

    //proficiency, saving throws, and skills
    //The modifiers can all come from the previously calculated mods
    //Some of these will come from race and class
    //profBonus : 2, class progression
    savingProfs : ['dexterity','charisma'], //init from class info, but allow custom adds
    skillProfs : ['deception','intimidation','persuasion','sleight of hand','stealth'], //Since these are player's choices it will be kept, but some added from class
    //jackOfAllTrades : false, Boolean to set if they have jack of all trades
    //passPerc : this.wisMod + 10,

    //Health, armor, and speed
    //speed is calculated based on properties from the race
    //speed : baseSpeed + (dexMod * 5),
    //initiative : this.dexMod,
    //armorClass : 10 + this.dexMod + (armor bonuses),
    hpMax : 18,
    hpCurr : 18,
    hpTemp : 18,
    //Hit dice and amount come from class and race
    //hitDice : 8, //number represents # of sides of the dice, come from class
    //hitDiceMax : 3, Same as level
    hitDiceCurr : 3,
    deathSaveSuccess : 0,
    deathSaveFail : 0,
    altResources : [
        {
            name : 'Bardic Inspiration',
            total : 4,
            remaining : 4
        }
    ],

    //Personality, Ideals, Bonds, Flaws
    personality : 'a;slkjhf;jskladjfklsadflksafd',
    ideals : 'sadfsadfsadfasdfasdfsadf',
    bonds : 'asdl;kfjhskadjhfjhsadgfsadf',
    flaws : 'as;djlkfrhsakjdhfkjsadf',

    //Traits, Other Proficiencies, and Languages
    // - the full trait object from the api already
    traits : [{},{}], //This'll half come from the api and half from player's choices
    languages : ['Common', 'Elvish'], //Half api half choice
    equipProf : ['Light Armor', 'Daggers','Thieves Tools','Trap Disarm Toolkit'], //Same

    //Equipment and Money
    equipment : [
        {name : 'Dagger',
        count : 1},
        {name : 'Rations',
        count : 10}
    ],
    copper : 50,
    silver : 17,
    gold : 20,

    //Attacks
    //Weapon attacks will have to be manually added through a form by the user to allow for magic weapons
    //Spells can have their data pulled directly from the spell lists
    //Big list of objects
    attacks : [{},{}],

    //Spellcasting stats
    //spellAbility : 'Charisma', //Pull from class, but if it doesn't exist allow it to be manually set
    //spellSaveDC : 13,
    //spellAtkBonus : 3,

    //Spells
    //Spells are broken up by level
    //The number of available spells comes from the class and level
    //slots are manually changed
    //Spell objects are directly from the api
    //Spells will have an added boolean of isPrepped, defaulting to false, to use on some classes
    spells : {
        cantrips : {
            known : 2, //Can be pulled from class and level
            spellList : [{},{}]
        },
        levelOne : {
            slotsTotal : 2, //Can be pulled from class and level
            slotsLeft : 2,
            spellList : [{},{}]
        }//and so on and so forth
    },

    //Bio
    age : 18,
    height : '1.75 m',
    weight : 'medium',
    eyes : 'brown',
    skin : 'pale',
    hair : 'blonde',
    backstory : 'a;sjhfskajhfksadbfjksadfjklasdlkf',
    appearance : 'sfdljhjsdfkjhsdjklfhshjdf',
    allies : 'sa;fdhsdkjfhsdkjhfskjdaf'
}