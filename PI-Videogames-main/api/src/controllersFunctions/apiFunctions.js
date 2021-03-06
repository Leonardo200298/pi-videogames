const axios = require('axios');
const { allVideogamesByDb } = require('../controllersFunctions/dbFunctions');
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
                description: info.slug,
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
const allVideoGames =async ()=>{
    try{
        const [db, api] = await Promise.all([allVideogamesByDb(), getVideogamesByApi()])
        /* console.log('db games', db) */
        const allVideogames = [...db, ...api]
        /* let firstGame = allVideogames.slice(0,15)
        console.log('games de api',firstGame) */
        return allVideogames
    }catch(error){
        console.log(error)
    }
}
const getAllVideogames = async (req,res) => {
    const {name} = req.query;
    const allvideogamesFunction = await allVideoGames()
    try{
        if (!name){
            return res.status(200).send(allvideogamesFunction)
        }else{
            const gameName  = allvideogamesFunction.filter((game) => {
                return game.name.toLowerCase().includes(name.toLowerCase()) 
            });
           
            return res.status(200).send(gameName)
        }

    }catch(error){
        console.log(error)
    }
}
const getVideogamesById = async (req,res)=>{
    try{
        const {id} = req.params;
        
        const totalGames = await allVideoGames()
        
        if (id.length < 7) {
            const idGames = totalGames.filter((idGame)=>{
                return idGame.id===Number(id)
            })
            
            idGames.length ?
                res.status(200).send(idGames) :
                res.status(404).send("No exist")
        }else{
            const idGames = totalGames.filter((idGame)=>{
                return idGame.id===id
            })
            /* console.log('id de videogame creado', idGames) */
            idGames.length ?
                res.status(200).send(idGames) :
                res.status(404).send("No exist")
        }
    }catch(error){
        console.log(error)
    }
}

//Como buscar por query
//http://localhost:3001/api?name=The Wchorhttp://localhost:3001/api?name=The Wchor


module.exports = {
    getAllVideogames,
    getVideogamesById
    
}
