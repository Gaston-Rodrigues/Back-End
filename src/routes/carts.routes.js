import { Router } from "express";
import { getCarts, getCartsById, postCart,deleteCartById, putCartById, putProductsInCart, deleteProductsInCart,
   postProductsInCart } from "../controllers/carts.controller.js";


const cartsRoutes = Router()

cartsRoutes.get('/', getCarts)

cartsRoutes.get('/:cId', getCartsById)

cartsRoutes.post('/', postCart)


cartsRoutes.delete('/:cId/products/:pId', deleteCartById) 


cartsRoutes.put('/:cId', putCartById)

cartsRoutes.put('/:cId/products/:pId', putProductsInCart)

cartsRoutes.delete('/:cId', deleteProductsInCart)


cartsRoutes.post("/:cId/product/:pId", postProductsInCart)


export default cartsRoutes