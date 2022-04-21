import {
    GET_VIDEOGAMES,
    GET_GAME_BY_NAME,
    GET_BY_GENRE

} from '../action';

const initialState = {
    allVideogames:[],
    game:[],
    genre:[]
}

export default function rootReducer(state=initialState,{type,payload}){
    switch (type){
        case GET_VIDEOGAMES: return {
            ...state,
            allVideogames:payload
        }
        case GET_GAME_BY_NAME: return{
            ...state,
            game:payload
        }
        case GET_BY_GENRE: return{
            ...state,
            genre:payload
        }
        default: return state
    }
}