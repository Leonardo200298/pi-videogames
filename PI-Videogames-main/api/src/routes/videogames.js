const express = require('express')
const router = express.Router()
const {getAllVideogames} = require('../controllersFunctions/apiFunctions')
const {videogameCreated} = require('../controllersFunctions/dbFunctions')


router.get('/', getAllVideogames)
router.post('/videogames', videogameCreated)


module.exports = router