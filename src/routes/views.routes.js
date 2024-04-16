import { Router } from "express";
import ProdManager from "../dao/mongo/ProductManagerMongo.js";
import { checkAuth, checkExistingUser, checkLogin } from "../middlewares/auth.js";
import CartManager from "../dao/mongo/CarritoManagerMongo.js";
import Ticket from "../dao/mongo/TicketManagerMongo.js";


const viewsRoutes = Router()

const prodManager = new ProdManager()
const cartService = new CartManager()
const ticketService = new Ticket()

viewsRoutes.get('/', checkAuth,(req, res) => {
  const { user } = req.session
  res.render('index', user)
})


viewsRoutes.get('/login', checkExistingUser , (req, res) => {
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
viewsRoutes.get('/carts/:cId',checkAuth, async(req,res)=>{
try {  
  const { user } = req.session
  const{cId}= req.params
  const cart = await cartService.getCartById({_id : cId})
  res.render('carts', {cart, user})
} catch (error) {
  res.status(500).send('Cart not Found');
}
})

viewsRoutes.get('/failregister', (req, res) => {
  res.render('failregister')
})

viewsRoutes.get('/faillogin', (req, res) => {
  res.render('faillogin')

})
viewsRoutes.post('/tickets', async (req,res)=>{
  try {
    const {user} = req.session
    const{ticket}= req.body
const compra = await ticketService.addTicket({ticket})

  res.render('tickets',{user,compra})
  } catch (error) {
    res.status(500).send('Ticket not Found');
  }

})



export default viewsRoutes