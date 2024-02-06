const express = require('express');


const home = async (req, res) =>{
    res.render('index')
}

const register = async (req, res) =>{
    
    res.render('register-user')
}

const login = async (req, res) =>{
    res.render('register-user')
}

const admin = async (req, res) =>{
    res.render('admin-pannel')
}

const adminLogin = async (req, res) =>{
    res.render('admin-login')
}

const error = async (req, res) =>{
    res.render('error')
}

const notFound = async (req, res) =>{
    res.render('not-found')
}


module.exports = {
    home,
    register,
    login,
    admin,
    adminLogin,
    error,
    notFound
}

