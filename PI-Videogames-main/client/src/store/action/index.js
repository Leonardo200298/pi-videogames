export const GET_VIDEOGAMES = "GET_VIDEOGAMES";
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