import { Router } from "express";
import passport from "passport";

import { postSession,postlogin,postRecovery,postLogout,getCurrent,getGithub,getUsers, deleteUserById, changeRol, getUserById, deleteUserOffline } from "../controllers/session.controller.js";
import {  authorizationAdmin } from "../middlewares/auth.js";

const sessionRoutes = Router()

sessionRoutes.get('/', getUsers)

sessionRoutes.get('/:uId', getUserById)

sessionRoutes.post('/register', passport.authenticate('register', {failureRedirect: '/failregister'}), postSession ),

sessionRoutes.post('/login', passport.authenticate('login', { failureRedirect: '/faillogin'}),postlogin)

sessionRoutes.post('/logout',postLogout)

sessionRoutes.get('/github', passport.authenticate('github', {scope:['user:email']}), getGithub)

sessionRoutes.get('/githubcallback', passport.authenticate('github', {failureRedirect: '/login'}),getGithub)

sessionRoutes.post("/recovery",postRecovery )

sessionRoutes.post("/current", getCurrent ) 


sessionRoutes.delete("/", authorizationAdmin,deleteUserOffline)

sessionRoutes.delete("/:uId",authorizationAdmin, deleteUserById)

sessionRoutes.put("/:uId/changeRol" ,authorizationAdmin,changeRol)

export default sessionRoutes