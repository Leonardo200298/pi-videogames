const {Genre,Videogame} = require('../db')


const allVideogamesByDb = ()=>{
    const videogames = Videogame.findAll({
        include:{
            model:Genre
        }
    })
    return videogames;
}


module.exports = {
    createVideogame
}