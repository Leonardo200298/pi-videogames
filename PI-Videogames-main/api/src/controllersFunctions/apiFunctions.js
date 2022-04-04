const axios = require('axios');
const { response } = require('../app');
const { get } = require('../routes');
const API = 'https://api.rawg.io/api/games?key='
const APIKEY = '8df31d27f3724043a2e647ffc07e80f5'

async function getVideogamesByApi() {
    const videogamesData = await axios.get(API + APIKEY)
    /* console.log(videogamesData) */
    const apiData = await videogamesData.data.results.map((data)=>{
        return {

             name: data.name,
             img: data.background_image,
             id: data.id,
             rating: data.rating,
             description: data.slug,
             genre: data.genres.map((info) => { return { name: info.name} }),
             platforms: data.platforms.map((info) => { return { name: info.platform.name, id: info.platform.id } })
        }
    })
    return apiData 
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