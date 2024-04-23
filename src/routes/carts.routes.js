import { Router } from "express";
import { getCarts, getCartsById, postCart,deleteCartById, putCartById, putProductsInCart, deleteProductsInCart,
   postProductsInCart, 
   purchaseCart} from "../controllers/carts.controller.js";
import { authorizationUser,checkUser,} from "../middlewares/auth.js";



const cartsRoutes = Router()

cartsRoutes.get('/', getCarts)
cartsRoutes.post('/', postCart)

cartsRoutes.get('/:cId', getCartsById)
cartsRoutes.put('/:cId', putCartById)
cartsRoutes.delete('/:cId', deleteProductsInCart)

cartsRoutes.delete('/:cId/products/:pId', deleteCartById) 
cartsRoutes.put('/:cId/products/:pId',checkUser,authorizationUser, putProductsInCart)
cartsRoutes.post("/:cId/product/:pId",checkUser,authorizationUser, postProductsInCart)

cartsRoutes.post("/:cId/purchase",checkUser,authorizationUser,purchaseCart)


export default cartsRoutes 