import passport from "passport";
import local from 'passport-local';
import { userModel } from "../models/user.model.js";
import { createHash, isValidPassword } from "../utils/bcrypt.js";
import { Strategy as GithubStrategy } from "passport-github2";

const LocalStrategy = local.Strategy;

const initializePassport = () => {
    passport.use('register', new LocalStrategy(
        {passReqToCallback: true, usernameField: 'email'},
        async (req, username, password, done) => {
            const {first_name, last_name, email, age} = req.body;
            const rol = 'usuario'
            try {
                const user = await userModel.findOne({email: username});
                if(user){
                    console.log('User already exists');
                    return done(null, false);
                }
                const newUser = {
                    first_name,
                    last_name,
                    email,
                    age,
                    rol,
                    password: createHash(password)
                }

                const result = await userModel.create(newUser);
                return done(null, result);
            } catch (error) {
                return done('Error to obtain the user ' + error);
            }
        }
    ));

    passport.use('login', new LocalStrategy(
        {usernameField: 'email'},
        async (username, password, done) => {
            try {
                const user = await userModel.findOne({email: username});
                if(!user){
                    console.log('User doenst exists');
                    return done(null, false);
                }
                if(!isValidPassword(user, password)){
                    return done(null, false);
                }
                return done(null, user);
            } catch (error) {
                return done(error);
            }
        }
    )); 

    passport.use('github', new GithubStrategy(
        {
            clientID :'Iv1.7084d80b6e15be6b',
            callbackURL :'http://localhost:8080/api/session/githubcallback',
            clientSecret : '988ab94038e394b62c18fce77534052be06bd51e'
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                console.log({profile});
                const user = await userModel.findOne({email: profile._json.email});
                if(!user){
                    const newUser = {
                        first_name: profile._json.name.split(' ')[0],
                        last_name: profile._json.name.split(' ')[1],
                        email: profile._json.email,
                        rol: 'usuario',
                        password: 'GithubGenerated'
                    }
                    const result = await userModel.create(newUser);
                    return done(null, result);
                }
                return done(null, user);
            } catch (error) {
                
                return done(error);
            }
        } 
    ))

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser(async (id, done) => {
        const user = await userModel.findOne({_id: id});
        done(null, user);
    });
}

export default initializePassport;  