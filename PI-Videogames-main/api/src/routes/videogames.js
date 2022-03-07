const express = require('express')
const router = express.Router()

router.get('/', (req,res,next)=>{
    res.send('entre jijiji')
})
router.post('/', (req,res,next)=>{
    res.send('entre jijiji')
})
router.put('/', (req,res,next)=>{
    res.send('entre jijiji')
})
router.delete('/', (req,res,next)=>{
    res.send('entre jijiji')
})

module.exports = router