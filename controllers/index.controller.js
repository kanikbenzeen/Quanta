const express = require('express');
const app = express();
const connectDB =  require("../db")

const home = async (req, res) =>{
    res.render('home')
}

const test = async (req, res) =>{
    const request = req
    const response = res
    res.render('test',{request: request, response: response})
}

module.exports = {
    home,
    test
}