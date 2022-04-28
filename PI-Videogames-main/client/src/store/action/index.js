export const GET_VIDEOGAMES = "GET_VIDEOGAMES";
export const GET_GAME_BY_NAME = "GET_GAME_BY_NAME";
export const GET_BY_GENRE = "GET_BY_GENRE";
export const GET_DETAIL_BY_ID = "GET_DETAIL_BY_ID";
export const FILTER_BY_GENRES = "FILTER_BY_TYPES";
export const ORDER_BY = "ORDER_BY_NAME";
export const CREATE_VIDEOGAME = "CREATE_VIDEOGAME";
export const CLEAN_STATE_DETAIL = "CLEAN_STATE_DETAIL";
export const CLEAN_STATE = "CLEAN_STATE";
const BACK = 'http://localhost:3001/api';
const axios = require('axios')

export function getVideogames() {
    try {

        return async function (dispatch) {
            const { data } = await axios.get(BACK)
            console.log(data)
            dispatch({ type: GET_VIDEOGAMES, payload: data })

        }
    } catch (error) {
        console.log(error)
    }
}
export function getVideogameByName(name) {
    try {

        return async function (dispatch) {
            const { data } = await axios.get(BACK + "?name=" + name)
            dispatch({ type: GET_GAME_BY_NAME, payload: data })
        }
    } catch (error) {
        console.log(error)
    }
}

export function getByGenre() {
    try {
        return async function (dispatch) {
            const { data } = await axios.get('http://localhost:3001/api/genres/genre')
            console.log(data)
            dispatch({ type: GET_BY_GENRE, payload: data })
        }
    } catch (error) {
        console.log(error)
    }
}
export function getDetailById(id) {
    try {
        return async function (dispatch) {
            const { data } = await axios.get("http://localhost:3001/api/" + id)
            dispatch({ type: GET_DETAIL_BY_ID, payload: data })
        }
    } catch (error) {
        console.log(error)
    }
}
export function filterByGenre(payload) {
    try {
        return async function (dispatch) {
            dispatch({ type: FILTER_BY_GENRES, payload })
        }
    } catch (error) {
        console.log(error)
    }
}
export function orderBy(payload){
    try{
        return async function (dispatch){
            dispatch({type:ORDER_BY, payload})
        }
    }catch(error){
        console.log(error)
    }
}
export function createVideogame(payload){
    try{
        return async function (){
            console.log(payload)
            await axios.post("http://localhost:3001/api/videogames",payload)
        }
    }catch(error){
        console.log(error)
    }
}
export function cleanStateDetail(){
    return function(dispatch){
        dispatch({type:CLEAN_STATE_DETAIL})
    }
}
export function cleanState(){
    return function(dispatch){
        dispatch({type:CLEAN_STATE})
    }
}