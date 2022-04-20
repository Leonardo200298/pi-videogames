import {
    GET_VIDEOGAMES,
    GET_GAME_BY_NAME

} from '../action';

const initialState = {
    allVideogames:[],
    game:[]
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
        default: return state
    }
}