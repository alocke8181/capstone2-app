import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:3001';

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

};

export default Api;