const {Genre,Videogame} = require('../db')
const axios = require('axios')

async function dbGenres() {
    try{

        const { data } = await axios.get(' https://api.rawg.io/api/genres')
        
        data.map((n) => {
            Genre.findOrCreate({
                where: {
                    name: n.name
                }
            })
        })
    }catch(error){
        console.log(error)
    }
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
        const {name, id, img, rating, description, genre, platforms} = req.body
        let videogame =await Videogame.create({
            name,
            id,
            img,
            rating,
            description,
            platforms
        })
        
        await videogame.addGenre(genre)
    }
    catch(error){
        console.log('error in post')
        console.log(error)
    }
    res.status(200).send('created')
  /*   try{

        let {       
            name,
            id,        
            description,        
            platform,
            genre,
            image,
            rating,
            released,
        } = req.body
    
        let gamesCreated = await Videogame.create({ 
            name, 
            id,       
            description,        
            platform,
            genre,
            image,
            rating,
            released,
            
            })
        
            let genresDb = await Genre.findAll({
                where: { name: genre }
            })
            await gamesCreated.addGenres(genresDb)
            res.send('Video Juego Creado')
    }catch(error){
        console.log(error)
    } */
}


module.exports = {
    allVideogamesByDb,
    dbGenres,
    videogameCreated
}