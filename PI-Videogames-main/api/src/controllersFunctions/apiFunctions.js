const axios = require('axios');
const { response } = require('../app');
const API = 'https://api.rawg.io/api/games?key='
const APIKEY = '8df31d27f3724043a2e647ffc07e80f5'

//solo por hoy vamos a traer 20 para probar la api
async function getAllVideogames(req, res, next) {
    var twentyVideogames = [];
    var videogamesByRequest;

    const { data } = axios.get(API + APIKEY)
    twentyVideogames.push(data)
    const algo = await Promise.all(twentyVideogames)
    videogamesByRequest = algo.map((data) => {
        console.log('soy data', data)
        return ({
            nombre: data.results.map((info) = {
                name: info.name
            }),

            img: data.results.background_image

        })

    })
    return res.send(videogamesByRequest)
}

module.exports = {
    getAllVideogames
}