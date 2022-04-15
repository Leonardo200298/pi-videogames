const express = require('express')
const router = express.Router()
const {getAllVideogames,getVideogamesById} = require('../controllersFunctions/apiFunctions')
const {videogameCreated} = require('../controllersFunctions/dbFunctions')


router.get('/', getAllVideogames)
router.get('/:id', getVideogamesById)
router.post('/videogames', videogameCreated)


module.exports = router