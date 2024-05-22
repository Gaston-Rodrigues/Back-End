import ProdManager from "../dao/mongo/ProductManagerMongo.js";
import { productsModel } from "../models/products.model.js"
import ProductDto from "../dao/dto/product.dto.js";
import CustomerErrors from "../errors/CustomError.js";
import { generateProductErrorInfo, productNotFound } from "../errors/info.js";
import ErrorEnum from "../errors/error.enum.js";
import { User } from "../dao/mongo/UserManagerMongo.js";
import Mailing from "../utils/mailing.js";


const products = new ProdManager()
const user = new User()

export const getProducts = async (req, res) => {
    try {
      const { limit=10, page=1, query='', sort= ''} = req.query
      const products = new ProdManager()
      const resultado = await products.getProducts(limit, page, query, sort)
  
      if(resultado){
       return  res.send(resultado)
      } else {
        res.status(400).json(resultado)
      }
      req.logger.info('Get Product ok ')
    } catch (error) {
      res.status(400).json({message: `No podemos devolver los productos - ${error}`})
    }
  }

export const getProductsById = async (req, res,next) => {
    const { uId } = req.params
    try {
      const product = await products.getProductById({_id: uId})
      if(!product){
        CustomerErrors.createError({
          name: "Product Dont Found",
          casue: productNotFound(uId),
          message: "Product not Found",
          code: ErrorEnum.PRODUCT_NOT_FOUND,
        })
      req.logger.warning('Product found fail')
      }
      res.send({product})
    } catch (error) {
      next(error)
    }
}
export const postProduct = async (req, res,next) => {
  try {
    const newProduct = req.body
  
 
    if(!newProduct.title || !newProduct.description||!newProduct.code || !newProduct.price || !newProduct.stock || !newProduct.category ){
    CustomerErrors.createError({
      name: "Product creation fails",
      cause: generateProductErrorInfo(newProduct),
      message:"Error triying create product",
      code: ErrorEnum.INVALID_TYPES_ERROR

    });  
    
  req.logger.fatal('Product incompleted')}
    newProduct.owner = req.user.email;
    const added = await products.addProduct(newProduct)
    const result = new ProductDto(added)
    res.status(201).json({message: 'Producto añadido',newProduct})
  } catch (error) {

    next(error)
  }
}




export const deleteProduct = async (req, res) => {
    const {uId} = req.params;
      const mail = req.user.email
      const role = req.user.role
      console.log(role)
    try {
      let product
      product = await products.getProductById({_id: uId})
        console.log(product.owner)
      if (product.owner === mail) { 
       console.log(typeof(product.owner))
       console.log(typeof(mail))
      const mailingServices = new Mailing()
      const emailContent = `<p>el producto con id ${uId},se ha eliminado de la base de datos.</p>`
       await mailingServices.sendMail({
         from: "Ecommerce CoderHouse",
         to: mail,
         subject: "Notificacion de Eliminacion de Producto",
         html: emailContent,
       })
      }

      
     product= await products.deleteProduct({_id: uId})

    return res.send({message: "Product deleted"});

  
   }
    catch (error) {
      res.status(400).json({message: `No se pudo eliminar el producto - ${error}`})
      
   }
}

export const putProduct = async (req, res) => {
    const { uId } = req.params
    const productToUpdate = req.body
    
    try {
      const update = await productsModel.updateOne({_id: uId}, productToUpdate)
      if(update.modifiedCount > 0){
        return res.send({message: `Producto modificado exitosamente - Id: ${uId}`})
      } else {
        res.status(404).json({message: `Producto NO modificado - Id: ${uId}`})
        req.logger.error('Product dont modified')
      }
    } catch (error) {
      res.status(400).json({message: `No se pudo modificar el producto - ${error}`})
    }
  }    
