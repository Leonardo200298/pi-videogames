const express = require('express')
const router = express.Router()
const {genresByDbAndApi} = require('../controllersFunctions/dbFunctions')

router.get('/genre',genresByDbAndApi)


module.exports = router