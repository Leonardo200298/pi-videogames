const {enre,videogame} = require('../db')


async function createVideogame(req, res){
    const {name,description,releaseDate,rating,plataforms} = req.body
    let videogame = videogame.create({
        name,
        rating
    })
}

module.exports = {
    createVideogame
}