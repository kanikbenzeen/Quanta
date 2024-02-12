const express = require('express');
const Users = require( '../models/createUser' );


const home = async (req, res) =>{
    res.render('index')
}

const register = async (req, res) =>{
    const error = req.query.error
    res.render('register-user',{error})
}

const login = async (req, res) =>{
    const error = req.query.error
    res.render('login-user',{error})
}

const user = async (req, res) =>{
    res.render('user-pannel')
}

const admin = async (req, res) =>{
    const users = await Users.find({}).lean().select(["username", "email", "_id", "role"])
    // console.log(users);
    const currentUser = req.session.user_id
    // console.log(currentUser);
    res.render('admin-pannel', {users ,currentUser}) 
}

const adminLogin = async (req, res) =>{
    const error = req.query.error
    res.render('admin-login',{error})
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
    user,
    admin,
    adminLogin,
    error,
    notFound
}

