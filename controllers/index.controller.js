const express = require('express');
const app = express();
const connectDB =  require("../db")

const home = async (req, res) =>{
    res.render('index')
}

module.exports = {
    home
}