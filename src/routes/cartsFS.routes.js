import { Router } from "express";
import { CartManager } from '../dao/fs/CarritoManagerFS.js'

const cartsRoutesFS = Router()

cartsRoutesFS.get('/:cid', async (req, res) => {
    try {
        const cartManager = new CartManager('./carts.json');
        let cart = await cartManager.getCartById(parseInt(req.params.cid));
       
        if(!cart){
          return res.send('No se encontró el carrito');
        }
      
        return res.send({cart});
      } catch (error) {
        console.error('Error al obtener los carritos:', error);
        res.status(500).send('Error interno del servidor');
      }
})

cartsRoutesFS.post('/', async (req, res) => {
    const cartManager = new CartManager('./carts.json');
    const cart = req.body
    await cartManager.addCart(cart)
    res.status(201).json("Carrito creado correctamente") 
})

cartsRoutesFS.post('/:cid/product/:pid', async (req, res) => {
    const cartManager = new CartManager('./carts.json');
    await cartManager.addCartProduct(req.params.cid, req.params.pid)
    res.status(201).json("Producto agregado correctamente")
})

export default cartsRoutesFS