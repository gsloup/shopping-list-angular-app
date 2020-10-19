const pool = require("./mysql.config");
const bcrypt = require("bcrypt");
const JwtStrategy = require("passport-jwt").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

function config(passport){
    const opt = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
        secretOrKey: process.env.SECRET_KEY
    }

    // SIGNUP
    passport.use('local-signup', new LocalStrategy({}, (username, password, done)=>{
        // Is username in use?
        pool.query("SELECT * FROM users WHERE users.username= ?", [username], (err, users)=>{
            if(err) done(err, false, "Something went wrong. Try again later.");

            // If it's in use, tell them that it already exists
            if (users[0]) done(null, false, "Username already in use");

            bcrypt.hash(passport, 8, (err, encrypted)=>{
                if(err) done(err, false, "Something went wrong. Try again later");

                pool.query("INSERT INTO users (username, password) VALUES (?, ?)", [username, encrypted], (err)=>{
                    if(err) done(err, false, "Something went wrong. Try again later");
                    done(null, {username: username}, "Successfully signed up, please log in!");
                })
            })
        })
    }))


    // LOGIN
    passport.use('local-login')


    // JWT
    passport.use('jwt')
}

module.exports = config;
