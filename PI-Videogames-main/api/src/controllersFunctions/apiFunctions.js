const axios = require('axios');
const { allVideogamesByDb, getIdByDb } = require('../controllersFunctions/dbFunctions');
const API = 'https://api.rawg.io/api/games?key='
const APIKEY = '8df31d27f3724043a2e647ffc07e80f5'

const getVideogamesByApi = async () => {

    try {
        const { data } = await axios.get(API + APIKEY)
        const videogames = data.results
        /* res.send(videogames) */
        let pageOne = await axios.get(API + APIKEY + "&page=1")
        let pageTwo = await axios.get(API + APIKEY + "&page=2")
        let pageThree = await axios.get(API + APIKEY + "&page=3")
        let pageFour = await axios.get(API + APIKEY + "&page=4")
        let pageFive = await axios.get(API + APIKEY + "&page=5")

        let allPages = await Promise.all([pageOne, pageTwo, pageThree, pageFour, pageFive])

        let page1 = allPages[0].data.results;
        let page2 = allPages[1].data.results;
        let page3 = allPages[2].data.results;
        let page4 = allPages[3].data.results;
        let page5 = allPages[4].data.results;

        const allVideogamesApi = [...page1, ...page2, ...page3, ...page4, ...page5]

        const apiInfoOfAllVideogames = allVideogamesApi.map((info) => {
            return {

                id: info.id,
                name: info.name,
                description: info.description,
                platform: info.platforms.map(info => info),
                genre: info.genres.map(info => info),
                image: info.background_image,
                released: info.released,
                rating: info.rating,
            }
        })
        return apiInfoOfAllVideogames;

    } catch (error) {
        console.log(error)
    }
}

const getAllVideogames = async (req,res) => {
    const {name} = req.query;
    
    try {
        const [db, api] = await Promise.all([allVideogamesByDb(), getVideogamesByApi()])
        const allVideogames = [...db, ...api]
      
        if (name) {
            //por lo visto no es necesario await
            const gamesName = allVideogames.filter(game => {
                return game.name === name
            });
            gamesName.length? 
                res.status(200).send(gamesName) :
                res.status(404).send('The game no exist');
        }else{
            res.status(200).send(allVideogames)
        }
       
        
    } catch (error) {
        console.log(error)
    }
}
const getVideogamesById = async (req,res)=>{
    const {id} =req.params;
    try{
        if (id < 10){
            let allVideogamesFunction = await axios.get(` https://api.rawg.io/api/games/${id}?key=` + APIKEY)
            allVideogamesFunction = allVideogamesFunction.data;
            var videogamee = {
                id: allVideogamesFunction.id,
                name: allVideogamesFunction.name,
                description: allVideogamesFunction.description,
                platform:allVideogamesFunction.platforms.map(info => info),
                genre: allVideogamesFunction.genres.map(info => info),
                image: allVideogamesFunction.background_image,
                released: allVideogamesFunction.released,
                rating: allVideogamesFunction.rating,
            }
            return res.send(videogamee)

        }
       return res.send(await getIdByDb(id))
    }catch(error){
        console.log(error)
    }
}
//Como buscar por query
//http://localhost:3001/api?name=The Wchorhttp://localhost:3001/api?name=The Wchor

//busqueda de id de la manera que lo estaba haciendo antes
/*   const allVideogamesFunction = await axios.get(` https://api.rawg.io/api/games/${id}?key=` + APIKEY)
            console.log(allVideogamesFunction)
            const gameId = await allVideogamesFunction.data.filter(idGame=>{
                return idGame.id===id
            })
            //console.log(gameId)
            gameId.length?
            res.status(200).send(gameId) :
            res.status(404).send('The id no exist') */

module.exports = {
    getAllVideogames,
    getVideogamesById
}
