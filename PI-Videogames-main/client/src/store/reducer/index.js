import {
    GET_VIDEOGAMES,
    GET_GAME_BY_NAME,
    GET_BY_GENRE,
    GET_DETAIL_BY_ID,
    FILTER_BY_TYPES

} from '../action';

const initialState = {
    allVideogames: [],
    game: [],
    genre: [],
    detail: []
}

export default function rootReducer(state = initialState, { type, payload }) {
    switch (type) {
        case GET_VIDEOGAMES: return {
            ...state,
            allVideogames: payload
        }
        case GET_GAME_BY_NAME: return {
            ...state,
            game: payload
        }
        case GET_BY_GENRE: return {
            ...state,
            genre: payload
        }
        case GET_DETAIL_BY_ID: return {
            ...state,
            detail: payload
        }
        case FILTER_BY_TYPES:
            const allStateGames = state.allVideogames
            const tempGames = allStateGames.filter(p => {
                if (p.genre) { // info viene como [{name:..},{name:..},{name:..}]
                    const genres = p.genre.map(p => p.name)
                    return genres.includes(payload)
                }
                if (p.genre) { 
                    return p.genre.includes(payload)
                }
            })
            return {
                ...state,
                game: payload === 'all-genres' ? allStateGames : tempGames,
            }



        default: return state
    }
}