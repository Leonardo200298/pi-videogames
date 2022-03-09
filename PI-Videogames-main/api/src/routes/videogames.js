const express = require('express')
const router = express.Router()
const {getAllVideogames} = require('../controllersFunctions/apiFunctions')
const {createVideogame} = require('../controllersFunctions/dbFunctions')


router.get('/', getAllVideogames)
router.post('/videogames', createVideogame)


module.exports = router