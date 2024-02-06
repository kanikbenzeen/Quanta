const express = require('express');


const home = async (req, res) =>{
    res.render('index')
}

const register = async (req, res) =>{
    res.render('register-user')
}

const login = async (req, res) =>{
    res.render('login-user')
}

const admin = async (req, res) =>{
    res.render('admin-pannel')
}

const adminLogin = async (req, res) =>{
    res.render('admin-login')
}

const error = async (req, res) =>{
    const errorMessage = req.query.message || 'An error occurred';
    res.render('error', { message: errorMessage });
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

