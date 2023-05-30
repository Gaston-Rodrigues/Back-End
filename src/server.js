import express from "express"
import ProductManager from "./ProductManager.js"

const server = express() 
server.use(express.urlencoded ({extended:true}))
const productos= new ProductManager()
const allProduct = productos.readProducts()

server.get("/products" , async (req, res)=>{
  let limit = parseInt(req.query.limit);
  if (!limit)return res.send(await allProduct)
  let read= await allProduct
  let limitProduct= read.slice(0,limit)
res.send(limitProduct)
})

server.get("/products/:id" , async (req, res)=>{
  let id = parseInt(req.params.id)
  let read= await allProduct
  let productByid = read.filter(product => product.id === id)
  res.send(productByid)
  })

const PORT = 8080;
const servidor = server.listen (PORT, () => {
  console.log(`Incializando server ${servidor.address().port}`)
})

servidor.on("error", (error)=> console.log(`Error del servidor ${error}` ))