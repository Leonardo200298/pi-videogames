const axios = require('axios');
const { response } = require('../app');
const API = 'https://api.rawg.io/api/games?key='
const APIKEY = '8df31d27f3724043a2e647ffc07e80f5'

async function getVideogamesByApi() {
    var videogamesData
    const elementsOfApi =await axios.get(API + APIKEY)
    await Promise.all([elementsOfApi])
        .then((respuesta) => {
            const [videogamesOfApi] = respuesta
            videogamesData = videogamesOfApi.data.results.map((data) => {

                return ({
                    name: data.name,
                    img: data.background_image,
                    id: data.id,
                    rating: data.rating,
                    description: data.slug,
                    genre: data.genres.map((info) => { return { name: info.name, id: info.id } }),
                    platforms: data.platforms.map((info) => { return { name: info.platform.name, id: info.platform.id } })
                })
            })
        })
        return videogamesData;
}

//solo por hoy vamos a traer 20 para probar la api
async function getAllVideogames(req, res) {
    try {
        console.log(getVideogamesByApi())
        const [api] = await Promise.all([getVideogamesByApi()])
        const allVideogames = [...api]
        res.send(allVideogames)
    } catch(error) {
        console.log(error)
    }
}

module.exports = {
    getAllVideogames
}