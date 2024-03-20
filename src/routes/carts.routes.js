import { Router } from "express";
import { getCarts, getCartsById, postCart,deleteCartById, putCartById, putProductsInCart, deleteProductsInCart,
   postProductsInCart, 
   purchaseCart} from "../controllers/carts.controller.js";
import { authorizationUser,checkUser,} from "../middlewares/auth.js";



const cartsRoutes = Router()

cartsRoutes.get('/', getCarts)

cartsRoutes.get('/:cId', getCartsById)

cartsRoutes.post('/', postCart)


cartsRoutes.delete('/:cId/products/:pId', deleteCartById) 


cartsRoutes.put('/:cId', putCartById)

cartsRoutes.put('/:cId/products/:pId',checkUser,authorizationUser, putProductsInCart)

cartsRoutes.delete('/:cId', deleteProductsInCart)


cartsRoutes.post("/:cId/product/:pId",checkUser,authorizationUser, postProductsInCart)

cartsRoutes.post("/:cId/purchase", purchaseCart)


export default cartsRoutes 