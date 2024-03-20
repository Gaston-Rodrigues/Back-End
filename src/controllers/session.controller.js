import Userdto from "../dao/dto/user.dto.js";
import { userModel } from "../models/user.model.js";
import { createHash } from "../utils/bcrypt.js";



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
        })
        res.redirect({redirect: '/login'})
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
};