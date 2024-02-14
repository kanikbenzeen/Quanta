const express = require("express")
const indexController = require("../controllers/index.controller")
const router = express.Router()

router.get('/', (req,res) =>{
    indexController.home(req,res)
})

router.post('/', (req,res) =>{
    indexController.test(req,res)
})

module.exports  = router