import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:3001';

const EXTERNAL_URL = 'https://www.dnd5eapi.co/api';

class Api{


    //Register, login, and return the token and user
    static async register(data){
        console.debug('POST','/register',data.username);
        try{
            const resp = await axios.post(`${BASE_URL}/auth/register`,data);
            const token = resp.data.token;
            const user = resp.data.user;
            return {token, user};
        }catch(e){
            console.error(e.message);
            let msg = e.response.data.error.message;
            throw Array.isArray(msg) ? msg : [msg];
        }
    }

    //Login and return the token and user
    static async login(data){
        console.debug('POST','/login', data.username);
        try{
            const resp = await axios.post(`${BASE_URL}/auth/token`, data);
            const token = resp.data.token;
            const user = resp.data.user;
            return {token, user};
        }catch(e){
            console.error(e.message);
            let msg = e.response.data.error.message;
            throw Array.isArray(msg) ? msg : [msg];
        };
    };

    //Patch a user
    static async patchUser(data, id, token){
        console.debug('PATCH','/users',id);
        try{
            let resp = await axios.patch(`${BASE_URL}/users/${id}`, data, {
                headers: {Authorization: `Bearer ${token}`}
            })
            return resp;
        }catch(e){
            console.error(e.message);
            let msg = e.response.data.error.message;
            throw Array.isArray(msg) ? msg : [msg];
        };
    };

    //Delete a user
    static async deleteUser(id, token){
        console.debug('DELETE','/users',id);
        try{
            let resp = await axios.delete(`${BASE_URL}/users/${id}`,{
                headers: {Authorization: `Bearer ${token}`}
            });
            return resp;
        }catch(e){
            console.error(e.message);
            let msg = e.response.data.error.message;
            throw Array.isArray(msg) ? msg : [msg];
        };
    };

    //Get all the characters belonging to a user
    static async getCharacters(id, token){
        console.debug('GET','/characters/user', id);
        try{
            let resp = await axios.get(`${BASE_URL}/characters/user/${id}`,{
                headers : {Authorization: `Bearer ${token}`}
            });
            return resp;
        }catch(e){
            console.error(e.message);
            let msg = e.response.data.error.message;
            throw Array.isArray(msg) ? msg : [msg];
        };
    };

    //Get a character
    static async getCharacter(id, token){
        console.debug('GET','/characters', id);
        try{
            let resp = await axios.get(`${BASE_URL}/characters/${id}`,{
                headers : {Authorization: `Bearer ${token}`}
            });
            return resp;
        }catch(e){
            console.error(e.message);
            let msg = e.response.data.error.message;
            throw Array.isArray(msg) ? msg : [msg];
        };
    };

    //Patch a character
    static async patchCharacter(data, token){
        console.debug('PATCH', '/characters', data.id);
        try{
            let resp = await axios.patch(`${BASE_URL}/characters/${data.id}`, data,{
                headers : {Authorization: `Bearer ${token}`}
            });
            return resp;
        }catch(e){
            console.error(e.message);
            let msg = e.response.data.error.message;
            throw Array.isArray(msg) ? msg : [msg];
        }
    }

    //Post an attack
    static async postAttack(data, token){
        console.debug('POST','/attacks');
        try{
            let resp = await axios.post(`${BASE_URL}/attacks`, data,{
                headers:{Authorization: `Bearer ${token}`}
            });
            return resp;
        }catch(e){
            console.error(e.message);
            let msg = e.response.data.error.message;
            throw Array.isArray(msg) ? msg : [msg];
        };
    };

    //Delete an attack
    static async deleteAttack(attackID, token){
        console.debug('DELETE','/attacks',attackID);
        try{
            let resp = await axios.delete(`${BASE_URL}/attacks/${attackID}`,{
                headers:{Authorization: `Bearer ${token}`}
            });
            return resp;
        }catch(e){
            console.error(e.message);
            let msg = e.response.data.error.message;
            throw Array.isArray(msg) ? msg : [msg];
        };
    }

    //Post a custom trait
    static async postTrait(data, token){
        console.debug('POST','/traits');
        try{
            let resp = await axios.post(`${BASE_URL}/traits`, data,{
                headers:{Authorization: `Bearer ${token}`}
            });
            return resp;
        }catch(e){
            console.error(e.message);
            let msg = e.response.data.error.message;
            throw Array.isArray(msg) ? msg : [msg];
        };
    };

    //Get a trait from the external api
    static async getExternalTrait(index){
        console.debug('EXTERNAL GET','/traits');
        try{
            let resp = await axios.get(`${EXTERNAL_URL}/traits/${index}`);
            return resp;
        }catch(e){
            console.error(e.message);
            let msg = e.response.data.error.message;
            throw Array.isArray(msg) ? msg : [msg];
        };
    }

    //Delete a custom trait
    static async deleteTrait(traitID, token){
        console.debug('DELETE','/traits',traitID);
        try{
            let resp = await axios.delete(`${BASE_URL}/traits/${traitID}`,{
                headers:{Authorization: `Bearer ${token}`}
            });
            return resp;
        }catch(e){
            console.error(e.message);
            let msg = e.response.data.error.message;
            throw Array.isArray(msg) ? msg : [msg];
        };
    }



};

export default Api;