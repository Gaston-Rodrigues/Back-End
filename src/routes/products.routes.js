import { Router } from "express";
import { deleteProduct, getProducts, getProductsById, postProduct, putProduct } from "../controllers/products.controller.js";
import { authorizationAdmin, authorizationPremium, authorizeAdminAndPremium, property } from "../middlewares/auth.js";


const productsRoutes = Router()

productsRoutes.get('/', getProducts)

productsRoutes.get('/:uId', getProductsById)

productsRoutes.post('/',postProduct ) 

productsRoutes.delete('/:uId',property,deleteProduct)

productsRoutes.put('/:uId', authorizationAdmin,putProduct )



export default productsRoutes 