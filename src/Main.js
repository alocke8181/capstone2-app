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
import Character from "./Character/Character";
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

    //Patch a character to the backend
    async function patchCharacter(data){
        const resp = await Api.patchCharacter(data, token);
        return resp;
    }

    //Post an attack to the backend
    async function postAttack(data){
        const resp = await Api.postAttack(data, token);
        return resp;
    }

    //Delete an attack from the backend
    async function deleteAttack(attackID){
        const resp = await Api.deleteAttack(attackID, token);
        return resp;
    }

    //Post a trait to the backend OR get external data from the API
    async function postTrait(data, isCustom){
        if(isCustom){
            delete data.choice;
            const resp = await Api.postTrait(data, token);
            return resp.data.trait;
        }else{
            const resp = await Api.getExternalTrait(data.choice)
            return({
                index : resp.data.index,
                name : resp.data.name,
                description : resp.data.desc.join(' ')
            });
        };
    };

    //Delete a trait from the backend
    async function deleteTrait(traitID){
        const resp = await Api.deleteTrait(traitID, token);
        return resp;
    }

    //Post a feature to the backend OR get external data from the API
    async function postFeature(data, isCustom){
        if(isCustom){
            delete data.choice;
            const resp = await Api.postFeature(data, token);
            return resp.data.feature;
        }else{
            const resp = await Api.getExternalFeature(data.choice)
            return({
                index : resp.data.index,
                name : resp.data.name,
                description : resp.data.desc.join(' ')
            });
        };
    };

    //Delete a feature from the backend
    async function deleteFeature(featureID){
        const resp = await Api.deleteFeature(featureID, token);
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
                <Route path="/characters/:id" element={<Character 
                    getCharacter={getCharacter} patchCharacter={patchCharacter} 
                    postAttack={postAttack} deleteAttack={deleteAttack}
                    postTrait={postTrait} deleteTrait={deleteTrait}
                    postFeature={postFeature} deleteFeature={deleteFeature} />}
                />
                <Route path="/403" element={<Forbidden />}/>
                <Route path="*" element={<NotFound />}/>
            </Routes>
            <br/>
            <FooterMenu />
        </UserContext.Provider>
    )
}

export default Main;