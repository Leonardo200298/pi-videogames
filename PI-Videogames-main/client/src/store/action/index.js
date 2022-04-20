export const GET_VIDEOGAMES = "GET_VIDEOGAMES";
export const GET_GAME_BY_NAME = "GET_GAME_BY_NAME";
const BACK = 'http://localhost:3001/api';
const axios = require('axios')

export function getVideogames(){
    try{

        return async function (dispatch){
            const {data} = await axios.get(BACK)
            dispatch({type:GET_VIDEOGAMES,payload:data})
            
        }
    }catch(error){
        console.log(error)
    }
}
export function getVideogameByName(name){
    return async function (dispatch){
        const {data} = await axios.get(BACK + "?name=" + name)
        dispatch({type:GET_GAME_BY_NAME,payload:data})
    }
}