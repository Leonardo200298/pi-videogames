const express = require('express')
const router = express.Router()
const {getAllVideogames} = require('../controllersFunctions/apiFunctions')


router.get('/', getAllVideogames)


module.exports = router