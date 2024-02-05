function checkAuthOrAdmin(user, id){
    return(user && (user.id == id || user.isAdmin));
};

//Helper to capitalize the first letter of strings
function capFirstLetter(string){
    return (string.slice(0,1).toUpperCase() + string.slice(1));
}

export {checkAuthOrAdmin, capFirstLetter};