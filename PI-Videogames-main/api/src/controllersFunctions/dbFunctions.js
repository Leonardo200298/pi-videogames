const {Genre,Videogame} = require('../db')
const axios = require('axios')

async function dbTemperaments() {
    const { data } = await axios.get(' https://api.rawg.io/api/genres')
    data.map((n) => {
        Genre.findOrCreate({
            where: {
                name: n.name
            }
        })
    })
}

const allVideogamesByDb = ()=>{
    const videogames = Videogame.findAll({
        include:{
            model:Genre
        }
    })
    return videogames;
}


module.exports = {
    allVideogamesByDb
}