function checkAuthOrAdmin(user, id){
    return(user && (user.id == id || user.isAdmin));
};

export default checkAuthOrAdmin;