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
        const {name, id, img, rating, description, genres, platforms} = req.body
        let videogame =await Videogame.create({
            name,
            id,
            img,
            rating,
            description,
            platforms
        })
        console.log('aca estoy',videogame)
        await videogame.addGenre(genres)
    }
    catch(error){
        console.log('error in post')
        console.log(error)
    }
    res.status(200).send('created')
}


module.exports = {
    allVideogamesByDb,
    dbGenres,
    videogameCreated
}