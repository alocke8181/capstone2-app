import React from "react";
import { useNavigate } from "react-router";
import { mockUser, mockToken, mockCharacters } from "../../tests/MockData";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:3001';

const EXTERNAL_URL = 'https://www.dnd5eapi.co/api';

class Api{

    //Method to handle errors
    static handleErrors(e){
        if(e.response.status === 404){
            const error = new Error(e.response.data.error.message);
            error.status = 404;
            throw error;
        }else if(e.response.status === 401){
            const error = new Error(e.response.data.error.message);
            error.status = 401;
            throw error;
        }else{
            let msg = e.response.data.error.message;
            const error = new Error(msg);
            error.status = e.response.status;
            throw error;
        }
    };

    //Register, login, and return the token and user
    static async register(data){
        return {token : mockToken, user: mockUser};
    }

    //Login and return the token and user
    static async login(data){
        return {token : mockToken, user : mockUser};
    };

    //Get a user
    static async getUser(id, token){
        return {data: {user : mockUser}}
    };

    //Patch a user
    static async patchUser(data, id, token){
        return {data: {user : mockUser}}
    };

    //Delete a user
    static async deleteUser(id, token){
        return {data: {success : id}}
    };

    //Post a new character
    static async postCharacter(data, token){
        //console.debug('POST','/characters');
        try{
            let resp = await axios.post(`${BASE_URL}/characters`,data,{
                headers:{Authorization: `Bearer ${token}`}
            });
            return resp;
        }catch(e){
            this.handleErrors(e)
        };
    }

    //Get all the characters belonging to a user
    static async getCharacters(id, token){
        return {data: {characters : mockCharacters}};
    };

    //Get a character
    static async getCharacter(id, token){
        //console.debug('GET','/characters', id);
        try{
            let resp = await axios.get(`${BASE_URL}/characters/${id}`,{
                headers : {Authorization: `Bearer ${token}`}
            });
            return resp;
        }catch(e){
            this.handleErrors(e)
        };
    };

    //Patch a character
    static async patchCharacter(data, token){
        //console.debug('PATCH', '/characters', data.id);
        try{
            let resp = await axios.patch(`${BASE_URL}/characters/${data.id}`, data,{
                headers : {Authorization: `Bearer ${token}`}
            });
            return resp;
        }catch(e){
            this.handleErrors(e)
        }
    }

    //Delete a character
    static async deleteCharacter(id, data, token){
        //console.debug('DELETE','/characters',id);
        try{
            let resp = await axios.delete(`${BASE_URL}/characters/${id}`,{
                headers:{Authorization: `Bearer ${token}`}, data: data
            });
            return resp;
        }catch(e){
            this.handleErrors(e)
        }
    }

    //Post an attack
    static async postAttack(data, token){
        //console.debug('POST','/attacks');
        try{
            let resp = await axios.post(`${BASE_URL}/attacks`, data,{
                headers:{Authorization: `Bearer ${token}`}
            });
            return resp;
        }catch(e){
            this.handleErrors(e)
        };
    };

    //Patch an attack
    static async patchAttack(data, token){
        //console.debug('PATCH','/attacks',data.id);
        try{
            let resp = await axios.patch(`${BASE_URL}/attacks/${data.id}`,data,{
                headers:{Authorization: `Bearer ${token}`}
            });
            return resp;
        }catch(e){
            this.handleErrors(e)
        };
    }

    //Delete an attack
    static async deleteAttack(attackID, data, token){
        //console.debug('DELETE','/attacks',attackID);
        try{
            let resp = await axios.delete(`${BASE_URL}/attacks/${attackID}`,{
                headers:{Authorization: `Bearer ${token}`}, data : data
            });
            return resp;
        }catch(e){
            this.handleErrors(e)
        };
    }

    //Post a custom trait
    static async postTrait(data, token){
        //console.debug('POST','/traits');
        try{
            let resp = await axios.post(`${BASE_URL}/traits`, data,{
                headers:{Authorization: `Bearer ${token}`}
            });
            return resp;
        }catch(e){
            this.handleErrors(e)
        };
    };

    //Patch a custom trait
    static async patchTrait(data, token){
        //console.debug('PATCH','/traits',data.id);
        try{
            let resp = await axios.patch(`${BASE_URL}/traits/${data.id}`,data,{
                headers:{Authorization: `Bearer ${token}`}
            });
            return resp;
        }catch(e){
            this.handleErrors(e)
        };
    };

    //Get a trait from the external api
    static async getExternalTrait(index){
        //console.debug('EXTERNAL GET','/traits');
        try{
            let resp = await axios.get(`${EXTERNAL_URL}/traits/${index}`);
            return resp;
        }catch(e){
            this.handleErrors(e)
        };
    }

    //Delete a custom trait
    static async deleteTrait(traitID, data, token){
        //console.debug('DELETE','/traits',traitID);
        try{
            let resp = await axios.delete(`${BASE_URL}/traits/${traitID}`,{
                headers:{Authorization: `Bearer ${token}`}, data : data
            });
            return resp;
        }catch(e){
            this.handleErrors(e)
        };
    }

    //Post a custom feature
    static async postFeature(data, token){
        //console.debug('POST','/features');
        try{
            let resp = await axios.post(`${BASE_URL}/features`, data,{
                headers:{Authorization: `Bearer ${token}`}
            });
            return resp;
        }catch(e){
            this.handleErrors(e)
        };
    };

    //Patch a custom feature
    static async patchFeature(data, token){
        //console.debug('PATCH','/features',data.id);
        try{
            let resp = await axios.patch(`${BASE_URL}/features/${data.id}`,data,{
                headers:{Authorization: `Bearer ${token}`}
            });
            return resp;
        }catch(e){
            this.handleErrors(e)
        };
    }

    //Get a feature from the external api
    static async getExternalFeature(index){
        //console.debug('EXTERNAL GET','/features', index);
        try{
            let resp = await axios.get(`${EXTERNAL_URL}/features/${index}`);
            return resp;
        }catch(e){
            this.handleErrors(e)
        };
    }

    //Delete a custom feature
    static async deleteFeature(featureID, data,token){
        //console.debug('DELETE','/features',featureID);
        try{
            let resp = await axios.delete(`${BASE_URL}/features/${featureID}`,{
                headers:{Authorization: `Bearer ${token}`}, data : data
            });
            return resp;
        }catch(e){
            this.handleErrors(e)
        };
    }

    //Get a spell
    static async getSpell(index){
        //console.debug('EXTERNAL GET','/spells', index);
        try{
            let resp = await axios.get(`${EXTERNAL_URL}/spells/${index}`);
            let spell = {
                index : resp.data.index,
                name : resp.data.name,
                description : resp.data.desc.join(' '),
                higherLevels : resp.data.higher_level || null,
                range : resp.data.range,
                duration : resp.data.duration,
                concentration : resp.data.concentration,
                ritual : resp.data.ritual,
                school : resp.data.school,
                castingTime : resp.data.casting_time,
                attackType : resp.data.attack_type || null,
                damage : resp.data.damage || null,
                areaOfAffect : resp.data.area_of_affect || null,
                healLevels : resp.data.heal_at_slot_level || null,
                dc : resp.data.dc || null
            }
            return spell;
        }catch(e){
            this.handleErrors(e)
        };
    };


};

export default Api;