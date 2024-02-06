const express = require("express")
const indexController = require("../controllers/index.controller")
const router = express.Router()
const isLoggedIn =  require('../middleware/auth')


router.get('/', isLoggedIn,(req,res) =>{
    indexController.home(req,res)
})

router.get('/register-user', (req,res) =>{
    indexController.register(req,res)
})

router.get('/login-user', (req,res) =>{
    indexController.login(req,res)
})

router.get('/admin', (req,res) =>{
    indexController.admin(req,res)
})

router.get('/admin-login', (req,res) =>{
    indexController.adminLogin(req,res)
})

router.post('/register-form-post', (req,res) =>{
    indexController.registerFormPost(req,res)
})
router.post('/login-form-post', (req,res) =>{
    indexController.loginFormPost(req,res)
})

router.post('/admin-form-post', (req,res) =>{
    indexController.adminFormPost(req,res)
})

module.exports  = router