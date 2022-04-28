const { Genre, Videogame } = require('../db')
const { loadApiToDb } = require('./apiFunctions')
const axios = require('axios')
const APIKEY = '8df31d27f3724043a2e647ffc07e80f5'


//Mi forma
//ruta para probar en postman http://localhost:3001/api/genres/genre
const genresByDbAndApi = async (req,res)=>{
    const allGenres = await Genre.findAll()
    res.send(allGenres)
}
//carga de data base
const dbGenres = async ()=>{
    const {data} =await axios.get(`https://api.rawg.io/api/genres?key=${APIKEY}`)
    data.results.map((n)=>{
        Genre.findOrCreate({
            where:{
                name:n.name
            }
        })
    })
} 

const allVideogamesByDb = async () => {
    const videogames = await Videogame.findAll({
        include: {
            model: Genre
        }
    })
    .then(r=>r).then(videogame=>videogame.map(e=>({id:e.id,name:e.name,image:e.image,description:e.description, released:e.releaseDate,rating:Number(e.rating),platform:e.plataforms,genre:e.genres})))
    /* console.log('videogames de database', videogames) */
    return videogames;
}
const videogameCreated = async (req, res) => {
    try {
        const { name, id, image, rating, description, genre, platforms, released } = req.body
        console.log('back', name, id, image, rating, description, genre, platforms, released)
        let videogame = await Videogame.create({
            name,
            id,
            image,
            rating,
            description,
            plataforms:platforms,
            releaseDate:released
        })
        /* genres.map(async (id)=>await videogame.addGenre(Number(id))) */
        await videogame.addGenre(genre)
    }
    catch (error) {
        console.log('error in post')
        console.log(error)
    }
    res.status(200).send('Game created')

}



module.exports = {
    allVideogamesByDb,
    videogameCreated,
    genresByDbAndApi,
    dbGenres
}