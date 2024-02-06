const express = require('express');
const app = express();
const connectDB =  require("../db")

const home = async (req, res) =>{
    res.render('index')
}

const register = async (req, res) =>{
    res.render('register-user')
}

const login = async (req, res) =>{
    res.render('register-user')
}

const registerFormPost = async (req, res) =>{
    console.log(req.body);
    // res.render('register-user')
}

const loginFormPost = async (req, res) =>{
    console.log(req.body);
    // res.render('register-user')
}

module.exports = {
    home,
    register,
    login,
    registerFormPost,
    loginFormPost
}