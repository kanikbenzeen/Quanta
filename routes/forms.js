const express = require("express")
const formsController = require("../controllers/forms.controller")
const indexController = require("../controllers/index.controller")
const router = express.Router()

router.post('/register-user', (req,res) =>{
    formsController.registerFormPost(req,res)
})
router.post('/login-user', (req,res) =>{
    formsController.loginFormPost(req,res)
})

router.post('/login-admin', (req,res) =>{
    formsController.adminFormPost(req,res)
})

router.get('*', function (req, res) {
    indexController.notFound(req, res);
});

module.exports  = router