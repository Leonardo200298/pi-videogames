const express = require('express')
const router = express.Router()
const {getGenresByDb,genresByDbAndApi} = require('../controllersFunctions/dbFunctions')

router.get('/',genresByDbAndApi)


module.exports = router