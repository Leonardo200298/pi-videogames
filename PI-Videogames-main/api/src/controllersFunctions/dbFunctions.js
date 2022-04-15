const {Genre,Videogame} = require('../db')
const axios = require('axios')
const APIKEY = '8df31d27f3724043a2e647ffc07e80f5'

const getGenresByDb = async (req,res)=>{
    const allGenres = await Genre.findAll({})
    res.send(allGenres)
}

const dbGenres = async ()=>{
    const {data} =await axios.get('https://api.rawg.io/api/genres?key=' + APIKEY)
    data.results.map((n)=>{
        Genre.findOrCreate({
            where:{
                name:n.name
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
const videogameCreated =async (req,res)=>{
    try{
        const {name, id, img, rating, description, genres, plataforms, releaseDate} = req.body
        
        let videogame =await Videogame.create({
            name,
            id,
            img,
            rating,
            description,
            plataforms,
            releaseDate
        })
        /* genres.map(async (id)=>await videogame.addGenre(Number(id))) */
        await videogame.addGenre(genres)
    }
    catch(error){
        console.log('error in post')
        console.log(error)
    }
    res.status(200).send('Game created')
  
}
const getIdByDb = async (id)=>{
    try{
        if (typeof id === 'string' && id.length > 10){
            const videogamebYId = await Videogame.findByPk(id, {
                include: Genre
            })
            return videogamebYId
        }
    }catch(error){
        console.log(error)
    }
}


module.exports = {
    allVideogamesByDb,
    dbGenres,
    videogameCreated,
    getGenresByDb,
    getIdByDb
    
}