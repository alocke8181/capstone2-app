function checkAuthOrAdmin(user, username){
    return(user && (user.username == username || user.isAdmin));
};

export default checkAuthOrAdmin;