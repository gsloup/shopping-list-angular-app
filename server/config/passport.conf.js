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
    passport.use('local-login', new LocalStrategy({}, (username, password, done)=>{
        // Grab user by username they provide
        pool.query("SELECT * FROM users WHERE users.username= ?", [username], (err, users)=>{
            if(err) done(err, false, "Something went wrong. Try again later.");

            if(!users[0]) done(null, false, "Invalid username or password");

        
            // Check passwords
            bcrypt.compare(password, users[0].password, (err, matches)=>{
                if(err) done(err, false, "Something went wrong. Try again later.");
                // Send back user that is logged in
                if(!matches) done(null, false, "Invalid username or password");

                done(null, {username: users[0].username, id: users[0].id}, "Welcome back!");
            })
        })
    }))


    // JWT
    passport.use('jwt', new JwtStrategy(opts, (jwt_payload, done)=>{
        pool.query("SELECT * FROM users WHERE users.id = ?", [jwt_payload.id], (err, users)=>{
            if(err) done(err, false);

            if(users[0]) done(null, users[0])

            done(null, false);
            
        })
    }))
}

module.exports = config;
