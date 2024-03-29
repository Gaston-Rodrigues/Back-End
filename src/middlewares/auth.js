import { userModel } from "../models/user.model.js"
import { isValidPassword } from "../utils/bcrypt.js"


export const checkAuth = (req, res, next) => {
    if(!req.session.user){
        res.redirect('/login')
    }
    next()
}

export const checkExistingUser = (req, res, next) => {
    if(req.session.user){
        return res.redirect('/')
    } else{
    next()
}
}
export const checkLogin = async (req, res, next) => {
    const {email, password} = req.body;
    try {
        const user = await userModel.findOne({email});
        if(!user || !isValidPassword(user, password)){
            return res.status(401).send({message: 'Unauthorized'});
        }
        req.user = user;
        next();
    } catch (error) {
        console.error(error);
    }
}


export const checkUser = async(req,res,next)=>{
if(!req.session.user){
  return res.status(401).send({message:"User is not authenticated"}) 
}
else {
     next()
}
}

export const authorizationAdmin = async (req,res,next)=>{
    
if(req.session.user.role === "admin"){
    next()
}
else{
     return res.status(401).send({message: "Unauthorization"})
}

}

export const authorizationUser = async (req,res,next)=>{
    if(req.session.user.role === "user"){
        next()
    }
    else{
         return res.status(401).send({message: "Unauthorization"})
    }
    
    }