const User = require('../models/createUser')

const isLoggedIn = async (req, res, next) => {
     console.log("User")
    try {
        // Check if req.session.user_id exists
        if (!req.session.user_id) {
            return res.redirect('/login-user');
        }

        // Check if the user exists in the database
        const user = await User.findById(req.session.user_id);
        
        if (!user) {
            // User does not exist, clear the session and redirect to login
            req.session.destroy(err => {
                if (err) {
                    console.error("Error destroying session:", err);
                }
                res.redirect('/login-user');
            });
        } else {
            // User exists, so they are logged in
            next(); // Continue with the next middleware or route handler
        }
    } catch (error) {
        console.error("Error checking user session:", error);
        res.status(500).json({ message: "Server error" });
    }
};


// isAdmin middleware
const isAdmin = (req, res, next) => {
    // Check if user is authenticated and has "admin" role
    if (req.session.user_id) {
        User.findById(req.session.user_id)
            .then(user => {
                if (!user || !user.role === 'admin') {
                    // If user has "admin" role, redirect to admin page
                    res.redirect('/login-admin');
                } else {
                    // If user is not admin, continue to the next middleware or route handler
                    next();
                }
            })
            .catch(error => {
                console.error('Error checking user role:', error);
                res.status(500).json({ message: 'Server error' });
            });
    } else {
        // If user is not authenticated, redirect to login page
        res.redirect('/login-admin');
    }
};




module.exports = {isLoggedIn, isAdmin}