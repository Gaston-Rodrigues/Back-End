import { Router } from "express";
import { deleteProduct, getProducts, getProductsById, postProduct, putProduct } from "../controllers/products.controller.js";
import { authorizationAdmin } from "../middlewares/auth.js";


const productsRoutes = Router()

productsRoutes.get('/', getProducts)

productsRoutes.get('/:uId', getProductsById)

productsRoutes.post('/', postProduct, authorizationAdmin)

productsRoutes.delete('/:uId', deleteProduct, authorizationAdmin)

productsRoutes.put('/:uId', putProduct, authorizationAdmin)



export default productsRoutes 