function checkAuthOrAdmin(user, id){
    return(user && (user.id == id || user.isadmin));
};

//Helper to capitalize the first letter of strings
function capFirstLetter(string){
    return (string.slice(0,1).toUpperCase() + string.slice(1));
}

function splitDiceRollString(string){
    let numDice = 0;
    let diceType = 0;
    let addMod = false;
    let splitSpaces = string.split(' + ');
    [numDice, diceType] = splitSpaces[0].split('d');
    if(splitSpaces.length === 2){
        addMod = true;
    }
    return [numDice, diceType, addMod];
}

export {checkAuthOrAdmin, capFirstLetter, splitDiceRollString};