const axios = require('axios');
const { allVideogamesByDb } = require('../controllersFunctions/dbFunctions')
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
    const {name} = req.query
    console.log(name)
    try {
        const [db, api] = await Promise.all([allVideogamesByDb(), getVideogamesByApi()])
        const allVideogames = [...db, ...api]
        if (name) {
            const videogameName =await findVideogames(allVideogames,name)
            return res.send(videogameName)
        }
        res.send(allVideogames)
    } catch (error) {
        console.log(error)
    }
}
//Como buscar por query
//http://localhost:3001/api?name=The Wchorhttp://localhost:3001/api?name=The Wchor
const findVideogames =async (allVideogames,name)=>{
    try {

        var gameFilter = allVideogames.filter((game) => {
            return game.name === name
        })

        if (!gameFilter.length) {
            let dataOfEndPoint = await axios.get(`https://api.rawg.io/api/games?search=${name}`);
            dataOfEndPoint = dataOfEndPoint.data;
            return ([
                {
                    id: dataOfEndPoint.id,
                    name: dataOfEndPoint.name,
                    description: dataOfEndPoint.description,
                    platform: dataOfEndPoint.platforms.map(info => info),
                    genre: dataOfEndPoint.genres.map(info => info),
                    image: dataOfEndPoint.background_image,
                    released: dataOfEndPoint.released,
                    rating: dataOfEndPoint.rating,
                }
            ])
        }

        return gameFilter
    } catch (error) {
        console.log(error)
        console.log("No existe")
        return "No existe"
    }
}
    /* 
          const name = req.query.name; //req query busca si hay un name por query
    const gamesAll = await getAllGames();
    if (name) {
        //tolowerCase hace que la busqueda en minus/mayusc no afecte al resultado
        const gamesName = await gamesAll.filter(p => p.name.toLowerCase().includes(name.toLowerCase()));
        gamesName.length? // preguntamos si hay algo
            res.status(200).send(gamesName) :
            res.status(404).send('NO EXISTE EL JUEGO BUSCADO');
    }else{
        res.status(200).send(gamesAll)
    }
    */

/* const getAllVideogames = async (req, res) => {
    const { name } = req.query
    try {
        const [db, api] = await Promise.all([allVideogamesByDb(), getVideogamesByApi()])
        const allVideogames = [...db, ...api]
        if (name){
            var nameGame = findByGameName(allVideogames, name)
            return res.send(nameGame)
        }
        res.send(allVideogames)
    } catch (error) {
        console.log(error)
    }
}
const findByGameName = (allVideogames, name)=>{
    const gamesName = allVideogames.filter((game)=>{
        return game.name.toLowerCase().includes(name.toLowerCase())
    })
    gamesName.length? 
    res.status(200).send(gamesName) :
    res.status(404).send('NO EXISTE EL JUEGO BUSCADO');
    /* game.name.toLowerCase().includes(name.toLowerCase()) */
//} */
module.exports = {
    getAllVideogames
}
