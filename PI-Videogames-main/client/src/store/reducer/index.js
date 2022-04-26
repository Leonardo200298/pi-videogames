import {
    GET_VIDEOGAMES,
    GET_GAME_BY_NAME,
    GET_BY_GENRE,
    GET_DETAIL_BY_ID,
    FILTER_BY_GENRES,
    ORDER_BY,
    CREATE_VIDEOGAME

} from '../action';

const initialState = {
    allVideogames: [],
    game: [],
    genre: [],
    detail: [],
    backUpVideogames: []
 
}

export default function rootReducer(state = initialState, { type, payload }) {
    switch (type) {
        case GET_VIDEOGAMES: return {
            ...state,
            allVideogames: payload,
            backUpVideogames: payload
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
        case FILTER_BY_GENRES:
            const allStateGames = state.backUpVideogames
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

        case ORDER_BY: {
            let orderForSort = [...state.allVideogames];
            if (payload === "A-Z") {
                orderForSort.sort((a, b) => a.name.localeCompare(b.name))
            }
            if (payload === "Z-A") {
                orderForSort.sort((a, b) => b.name.localeCompare(a.name))
            }
            if (payload === "Rating-asc") {
                orderForSort.sort((a, b) => {
                    if (a.rating > b.rating) {
                        return -1
                    }
                    if (a.rating < b.rating) {
                        return 1
                    }
                    return 0
                })
            }
            if (payload === "Rating-desc") {
                orderForSort.sort((a, b) => {
                    if (a.rating > b.rating) {
                        return 1
                    }
                    if (a.rating < b.rating) {
                        return -1
                    }
                    return 0
                })
            }
            return {
                ...state,
                allVideogames:orderForSort,
            }
        }
        case CREATE_VIDEOGAME: return{
            ...state,
            backUpVideogames:payload,
            allVideogames:payload
        }
        default: return state
    }
}