import { Router } from "express";
import passport from "passport";
import { postSession,postlogin,postRecovery,postLogout,getCurrent,getGithub, } from "../controllers/session.controller.js";

const sessionRoutes = Router()


sessionRoutes.post('/register', passport.authenticate('register', {failureRedirect: '/failregister'}), postSession ),

sessionRoutes.post('/login', passport.authenticate('login', { failureRedirect: '/faillogin'}),postlogin)

sessionRoutes.post('/logout',postLogout)

sessionRoutes.get('/github', passport.authenticate('github', {scope:['user:email']}), getGithub)

sessionRoutes.get('/githubcallback', passport.authenticate('github', {failureRedirect: '/login'}),getGithub)

sessionRoutes.post("/recovery",postRecovery )

sessionRoutes.post("/current", getCurrent )

export default sessionRoutes