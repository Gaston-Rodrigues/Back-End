import { Router } from "express";
import productsRoutes from "./products.routes.js"
import ProdManager from "../dao/mongo/ProductManagerMongo.js";
import { checkAuth, checkExistingUser, checkLogin } from "../middlewares/auth.js";


const viewsRoutes = Router()

const prodManager = new ProdManager()

viewsRoutes.get('/', checkAuth,(req, res) => {
  const { user } = req.session
  res.render('index', user)
})

 /*para poder utilizar el middleware de checklogin, como deberia utilizarlo por que directamente cuando ingreso al endpoitm de login, me sale solo el message de la funcion checkinLogin */ 

viewsRoutes.get('/login', checkExistingUser , /*checkLogin*/ (req, res) => {
  res.render('login')
})

viewsRoutes.get('/register', checkExistingUser,(req, res) => {
  res.render('register')
})

viewsRoutes.get('/chats',checkAuth, (req, res) => {
  res.render('chats')
})



viewsRoutes.get('/products',checkAuth ,async (req, res) => {
  try {
    const { page } = req.query;
    const { user } = req.session
    const products = await prodManager.getProducts(10, page);

    res.render('products', { user, products });
  } catch (error) {
    res.status(500).send('Error interno del servidor');
  }
});

viewsRoutes.get('/failregister', (req, res) => {
  res.render('failregister')
})

viewsRoutes.get('/faillogin', (req, res) => {
  res.render('faillogin')

})




export default viewsRoutes