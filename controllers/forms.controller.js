const express = require('express');
const User = require('../models/createUser');
const bcrypt = require('bcryptjs')

const registerFormPost = async (req, res) =>{
    const { username, email, password } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user with hashed password
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });
        
        await newUser.save();
        // console.log(newUser);
        // req.session.user_id = newUser._id;
        // console.log(req.session.user_id);
        // req.session.save()
        res.redirect('/login-user');
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Internal erver error" });
    }
}

const loginFormPost = async (req, res) =>{
    const { username, email, password } = req.body;

    try {
        // Find user by username or email
        const user = await User.findOne({ $or: [{ username: username }, { email: email }] });
        
        if (!user) {
            return res.status(400).json({ message: "Invalid username/email or password" });
        }

        // Compare the provided password with the hashed password stored in the database
        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            return res.status(400).json({ message: "Invalid username/email or password" });
        }

        // Passwords match, login successful
        req.session.user_id = user._id;
        req.session.save(); // Save the session immediately
        res.redirect('/');
        
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Server error" });
    }
}

const adminFormPost = async (req, res) =>{
    const { username, email, password } = req.body;
    try {
        if (email == 'kaniksaini@gmail.com' && password == 'noaccess') {
            res.redirect('/admin');
        }
    } catch (error) {
        res.status(500).json({ message: "Invalid Credentials" });
    }
}

module.exports = {
    registerFormPost,
    loginFormPost,
    adminFormPost
}