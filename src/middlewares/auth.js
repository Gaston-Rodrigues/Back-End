import ProdManager from "../dao/mongo/ProductManagerMongo.js"
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
if(req.session?.user?.role !== "user" ){
    
  return res.status(401).send({message:"User is not authenticated"}) 
}
else {
     next()
}
}

export const authorizationAdmin = async (req,res,next)=>{
   const role = req.session.user.role 
   console.log(role)
if(req.session?.user?.role !== "admin"){
   return res.status(401).send({message: "Unauthorization"})
}
else{
     next() 
}

}

export const authorizationPremium = async(req,res,next)=>{

if(req.session?.user?.role !== "Premium"){
    return res.status(401).send({message: "You are not premium"})
}
else{
    next()
}
}
export const property = async (req, res, next) => {
    try {
      const productId = req.params.uId
      const userRole = req.session?.user?.role
      const userId = req.session?.user.email
  
      if (userRole ==="Admin" || userRole === "Premium")
      {
        if (!userId) {
          return res.status(403).send({ error: 'Usuario no logueado' })
        }
  
        const productManager = new ProdManager()
        const product = await productManager.getProductById(productId)
  
        if (!product) {
          return res.status(404).send({ error: 'Producto no encontrado' })
        }
  
        if (String(product.owner) !== String(userId)) {
          return res.status(403).send({ error: 'El usuario no tiene permiso para agregar el producto al carrito' })
        }
       }
      next()
    } catch (error) {
      return res.status(500).send({ error: 'Error interno del servidor' })
    }
  }

export const authorizationUser = async (req,res,next)=>{
    if(req.session.user.role !== "user"){
        return res.status(401).send({message: "Unauthorization"})
    }
    else{
         next()
    }
    
    }
    export const authorizeAdminAndPremium = (req, res, next) => {
      if (req.session?.user?.role === "admin" || req.session?.user?.role === "Premium" ) {
          next();
      } else {
          return res.status(403).json({ error: 'No tienes permiso para acceder a esta funcionalidad.' });
      }
  };