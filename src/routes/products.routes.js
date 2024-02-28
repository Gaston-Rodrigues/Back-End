import { Router } from "express";
import { deleteProduct, getProducts, getProductsById, postProduct, putProduct } from "../controllers/products.controller.js";


const productsRoutes = Router()

productsRoutes.get('/', getProducts)

productsRoutes.get('/:uId', getProductsById)

productsRoutes.post('/', postProduct)

productsRoutes.delete('/:uId', deleteProduct)

productsRoutes.put('/:uId', putProduct)

export default productsRoutes