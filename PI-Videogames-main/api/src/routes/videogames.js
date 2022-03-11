const express = require('express')
const router = express.Router()
const {getAllVideogames} = require('../controllersFunctions/apiFunctions')



router.get('/', getAllVideogames)
router.post('/videogames', (req,res)=>{
    return res.send('Pronto creado de videogames')
})


module.exports = router