const axios = require('axios');
const { response } = require('../app');
const API = 'https://api.rawg.io/api/games?key='
const APIKEY = '8df31d27f3724043a2e647ffc07e80f5'

//solo por hoy vamos a traer 20 para probar la api
function getAllVideogames(req, res, next) {


    const elementsOfApi = axios.get(API + APIKEY)
   
    Promise.all([elementsOfApi])
    .then((respuesta)=>{
        const [videogamesOfApi] = respuesta
        //console.log(videogamesOfApi.data)
        var tipo = videogamesOfApi.data.results.map((data)=>{
            return ({
                name:data.name,
                img:data.background_image,
                id:data.id,
                rating:data.rating,
                description:data.slug,
                genre:'esta en la api',
                platforms:data.platforms.map((info)=>{return {name:info.platform.name, id:info.platform.id}})
            })
        })
        let allData = [...tipo]
        res.send(allData)
    })
   
}

module.exports = {
    getAllVideogames
}