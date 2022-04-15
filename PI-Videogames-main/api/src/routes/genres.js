const express = require('express')
const router = express.Router()
const {getGenresByDb} = require('../controllersFunctions/dbFunctions')

router.get('/',getGenresByDb)


module.exports = router