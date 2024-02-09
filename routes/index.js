const express = require("express")
const indexController = require("../controllers/index.controller")
const router = express.Router()
const {isLoggedIn, isAdmin} =  require('../middleware/auth')


router.get('/',(req,res) =>{
    indexController.home(req,res)
})

router.get('/register-user', (req,res) =>{
    indexController.register(req,res)
})

router.get('/login-user', (req,res) =>{
    indexController.login(req,res)
})

router.get('/user', (req,res) =>{
    indexController.user(req,res)
})

router.get('/admin',isAdmin, (req,res) =>{
    indexController.admin(req,res)
})

router.get('/login-admin', (req,res) =>{
    indexController.adminLogin(req,res)
})

router.get('/error', (req,res) =>{
    indexController.error(req,res)
})

router.get('*', function (req, res) {
    indexController.notFound(req, res);
});


module.exports  = router