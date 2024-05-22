import Userdto from "../dao/dto/user.dto.js";
import { userModel } from "../models/user.model.js";
import { createHash } from "../utils/bcrypt.js";
import {User} from "../dao/mongo/UserManagerMongo.js";


const UserMongo = new User()


export const getUsers = async(req,res)=>{
    try {

        const result = await UserMongo.getUser()
        res.send({result})
    } catch (error) {
        res.status(400).send({error})
    }
}


export const getUserById = async(req,res)=>{
try {
    const {uId} = req.params
const result = await UserMongo.getUserById(uId)
res.send(result)

} catch (error) {
    res.status(400).send({error})
}
}
export const postSession = async(req,res)=>{
    req.session.user = {
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        age: req.user.age,
        email: req.user.email,
        role: req.user.role
    }
    res.redirect('/products')
}
export const postlogin =  async(req, res) => {
        if(!req.user){
            return res.status(400).send({message: 'Error en las credenciales'})
        }
        req.session.user = {
            first_name: req.user.first_name,
            last_name: req.user.last_name,
            age: req.user.age,
            email: req.user.email,
            role: req.user.role
        }
        res.redirect('/products')
}
  
export const postLogout =  async (req, res) => {
    try {
        req.session.destroy((err) => {
            if(err){
                return res.status(500).json ({message: "Fallo al realizar Logout"})
            }    
             res.send({redirect: '/login'})        
        })
       
    } catch (error) {
        res.status(400).send({error})
    }
}

export const  getGithub = (req, res) => {
    req.session.user = req.user
    res.redirect('/products')
}

export const getCurrent = async(req,res)=>{
    const user = new Userdto(req.user)
    res.send(user.getCurrentUSer())
}

export const postRecovery = async (req, res) => {
    const {email, password} = req.body;
    const user = await userModel.findOne({email});
    if(!user){
        return res.status(400).send({message: 'Error'});
    }
    user.password = createHash(password);
    user.save();
    res.send({message: 'cambio de contraseña con exito!'});
}
export const deleteUserOffline =async(req,res)=>{
    try {
        const result = await UserMongo.lastConnectionDeletedUser()
        if(result){
            return res.status(200).json(result)
        }

    } catch (error) {
        res.status(400).send({error})
    }
}

export const deleteUserById = async (req,res)=>{
   try {
     const {uId} = req.params
     const deleted = await UserMongo.deleteUser(uId)
     if(deleted){
        return res.status(200).send({message: "User deleted"})
     }
   } catch (error) {
    res.status(400).send({error})
    
   }
}

   export const changeRol = async(req,res)=>{
    const {uId} = req.params
    
    try { 
     const changes = await UserMongo.changesRol(uId)
     if(changes){
        res.send({message: "Role Modified "})
        req.logger.info('User role modified')
    }

    } catch (error) {
        res.status(400).send({error})
    }
   }

