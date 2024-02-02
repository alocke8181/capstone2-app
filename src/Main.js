import React from "react";
import { useState, useEffect, useContext } from "react";
import { Routes, Route, redirect } from "react-router";

import UserContext from './UserContext';
import Api from "./Api";

import HeaderMenu from './HeaderMenu';
import FooterMenu from "./FooterMenu";
import Home from "./Home";
import Login from './Login';
import Logout from './Logout';
import Register from './Register';
import UserPage from "./UserPage";
import UserEdit from './UserEdit';
import UserDelete from './UserDelete';
import Character from "./Character";
import NotFound from './NotFound';
import Forbidden from './Forbidden';

const Main = () =>{

    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    //Check for info in local storage
    useEffect(()=>{
        if(localStorage.getItem('user') != null){
            setUser(JSON.parse(localStorage.getItem('user')));
            setToken(localStorage.getItem('token'));
        };
    },[]);

    //Functions to be passed to child components
    //===================================================================
    //Send a login request to the backend, set user/token, add to localStorage
    async function login(data){
        const {token, user} = await Api.login(data);
        setUser(user);
        setToken(token);
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);
        return user.id;
    }

    //Logout by clearing token, user, and localStorage
    function logout(){
        setToken(null);
        setUser(null);
        localStorage.clear();
    }

    //Send a register request to the backend, set user/token, add to localStorage
    async function register(data){
        const {token, user} = await Api.register(data);
        setUser(user);
        setToken(token);
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);
        return user.id;
    }

    //Send a patch request to the backend, update user and localStorage
    async function editUser(data, id){
        const resp = await Api.patchUser(data, id, token);
        const user = resp.data.user;
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
        return user.id;
    }

    //Send a delete request to the backend, logout, clear localStorage
    async function deleteUser(id){
        const resp = await Api.deleteUser(id, token);
        logout();
        return resp;
    }

    //Send a request to the backend to get a list of characters for a user
    async function getCharacters(userID){
        const resp = await Api.getCharacters(userID, token);
        return resp;
    }

    //Get a character from the backend
    async function getCharacter(charID){
        const resp = await Api.getCharacter(charID, token);
        return resp;
    }

    return(
        <UserContext.Provider value={{user, setUser}}>
            <HeaderMenu />
            <br/>
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/login" element={<Login login={login}/>}/>
                <Route path="/logout" element={<Logout logout={logout}/>}/>
                <Route path="/register" element={<Register register={register}/>}/>
                <Route path="/users/:id" element={<UserPage getCharacters={getCharacters}/>}/>
                <Route path="/users/:id/edit" element={<UserEdit editUser={editUser}/>}/>
                <Route path="/users/:id/delete" element={<UserDelete deleteUser={deleteUser}/>}/>
                <Route path="/characters/:id" element={<Character getCharacter={getCharacter} />}/>
                <Route path="/403" element={<Forbidden />}/>
                <Route path="*" element={<NotFound />}/>
            </Routes>
            <br/>
            <FooterMenu />
        </UserContext.Provider>
    )
}

export default Main;