import { cartsModel } from "../models/carts.model.js"
import CartManager from "../dao/mongo/CarritoManagerMongo.js";
import Ticket from "../dao/mongo/TicketManagerMongo.js";
import ProdManager from "../dao/mongo/ProductManagerMongo.js";
import CustomerErrors from "../errors/CustomError.js";
import { cartNotFound } from "../errors/info.js";
import ErrorEnum from "../errors/error.enum.js";

const ticketService = new Ticket()
const cartService = new CartManager()
const productService = new ProdManager()

export const getCarts = async (req, res) => {
    try {
      const carts = await cartsModel.find()
      res.send({carts})
    } catch (error) {
      console.error(error)
      res.status(400).json({message: `No podemos devolver los carritos - ${error}`})
    }
}

export const getCartsById = async (req, res) => {
  try {
    const { cId } = req.params
    const products = new CartManager()
    const result = await products.getCartById(cId) 
    if(!result){
      CustomerErrors.createError({
        name : "Cart Not Found",
        cause : cartNotFound(cId),
        message: "Cart dont found",
        code: ErrorEnum.CART_NOT_FOUND
      })
    }
    if (result.message="OK"){
      return res.status(200).json(result)
    }
    else {
      res.status(400).json(result)
    }
  } catch (error) {
    res.status(400).json({message: "El carrito no existe"})
  }
}

export const postCart = async (req, res) => {
  try {
    const newCart = req.body
    const added = await cartsModel.create(newCart)
    res.status(201).json({message: 'Carrito creado exitosamente'})
  } catch (error) {
    console.error(error)
    res.status(400).json({message: `No se pudo crear el carrito - ${error}`})
  }
}

export const deleteCartById = async (req, res) => {
  const { cId, pId } = req.params
  console.log(cId)
  const cartManager = new CartManager()

  try {
    const result = await cartManager.deleteProductInCart(cId, pId)
    if(result){
      res.send({message: 'Producto eliminado'})
    } else {
      res.status(400).json({message: 'No se pudo eliminar'})
    }
  } catch (error) {
    console.error(error)
    res.status(400).json({message: 'No se pudo eliminar'})
  }
}

export const putCartById = async (req, res) => {
  const cartManager = new CartManager()
  const { cId } = req.params
  const cart = req.body
  try {
    const result = await cartManager.updateCart(cId, cart)
    if(result.modifiedCount > 0){
      res.send({message: "Carro modificado"})
    } else {
      res.status(400).send({message: "No se pudo modificar el carrito"})
    }
  } catch (error) {
    console.error(error)
    res.status(400).send({message: "No se pudo modificar el carrito"})
  }
}

export const putProductsInCart = async (req, res) => {

  const {cId, pId} = req.params
  const {quantity} = req.body

  const result = await cartService.updateProductInCart(cId, pId, quantity)
  console.log(result)

  if(result){
   return res.send({message: "Producto actualizado"})
  }
  else {
    res.status(400).send({message: "NO se pudo actualizar el producto "})
  }
}

export const deleteProductsInCart = async (req, res) => {
  try {
    const { cId } = req.params
    const carts = new CartManager()

    const deleted = await carts.deleteAllProductsInCart(cId)

    if (deleted){
      return res.status(200).json({message: 'Productos Eliminados'})
    }

    return res.status(404).json({message: "No se pudieron eliminar los productos"})
  } catch (error) {
    console.log(error)
    return res.status(400).json({message: "No se pudieron eliminar los productos"})
    
  }
}

export const postProductsInCart = async (req,res)=>{

  try{
    const {cId, pId} = req.params
    const newQuantity =  req.body.quantity
    const carts = new CartManager()
    const result = await carts.addProductsInCart(cId, pId, newQuantity)

    if (result){
      return res.status(200).json({message: 'Producto agregado'});
    }
    res.status(400).json({message: 'NO se pudo agregar el producto'});
  }
  catch(error){
    res.status(400).send({error});
  }
}

export const purchaseCart = async(req,res)=>{
try {
  
const  {cId} = req.params
const cart = await cartService.getCartById(cId)
const productNotAvailable = cart.products.filter( product => product.product.stock < product.quantity)
if (productNotAvailable.length > 0) {
  return res.send({
    message: 'Product not available',
    rto: productNotAvailable,
  });
}
const productAvailable = cart.products.filter(product => product.product.stock >= product.quantity)
const priceTotal = productAvailable.reduce((acc, product) =>{
return acc + (product.product.price * product.quantity)
},0 )

for (const product of productAvailable) {
  const result = (product.product.stock - product.quantity)
  const newStock = {
    stock : result
  }

  await productService.updateProduct(product.product._id, newStock)
}

const Ticket = {
   purchase : req.user.email,
   purchase_datetime : new Date(),
   amount : priceTotal,
   code: Math.floor(Math.random() * 500000)+300000
}
await ticketService.addTicket(Ticket);
return res.send({message: "ticket created"})

} catch (error) {
  console.log(error)
}
}

