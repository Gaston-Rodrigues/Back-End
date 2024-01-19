import { Router } from "express";
import productsRoutes from "./products.routes.js"
import ProdManager from "../dao/ProductManagerMongo.js";


const viewsRoutes = Router()

const prodManager = new ProdManager()

viewsRoutes.get('/', (req, res) => {
    res.render('index')
})

viewsRoutes.get('/chats', (req, res) => {
    res.render('chats')
})




viewsRoutes.get('/products', async (req, res) => {
  const { page } = req.query
  const products = await prodManager.getProducts(10, page)
  res.render('products', products)
 
})


export default viewsRoutes