const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");

// Signup
router.post('/signup', (req, res)=> {
    // check to make sure username and pswd exist on the request and match criteria
    const username = req.body.username;
    const password = req.body.password;
    if(!username || username.length < 2 || username.length > 20 ||
        !password || password.length < 8 || password.length > 20) {
            return res.send({success: false, 
                msg: 'Invalid user information. Usernames between 2 & 20 characters and passwords between 8 & 20 characters.'})
    }
    passport.authenticate('local-signup', (err, user, info)=>{
        // if there's a user send a success response
        if (user){ // will not create jwt since they aren't auto logged in.
            return res.send({success: true, msg: info})
        }
        // else send back failed message w/appropriate info
        return res.send({success: false, msg: info});
    })(req, res);

})
// Login
router.post('/login', (req, res)=> {
    const username = req.body.username;
    const password = req.body.password;
    if(!username || username.length < 2 || username.length > 20 ||
        !password || password.length < 8 || password.length > 20) {
            return res.send({success: false, 
                msg: 'Invalid user information.'})
    }
    passport.authenticate('local-login', (err, user, info)=>{
        // if there's a user, create jwt and send a success response
        if (user){ 
            const token = jwt.sign({id: user.id}, process.env.SECRET_KEY);
            return res.send({success: true, msg: info, user: user, jwt: token});
        }
        // else send back failed message w/appropriate info
        return res.send({success: false, msg: info});
    })(req, res);
})

module.exports = router;