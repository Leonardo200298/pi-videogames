import {GET_VIDEOGAMES} from '../action';

const initialState = {
    allVideogames:[]
}

export default function rootReducer(state=initialState,{type,payload}){
    switch (type){
        case GET_VIDEOGAMES: return {
            ...state,
            allVideogames:payload
        }
        default: return state
    }
}