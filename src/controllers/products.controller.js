import ProdManager from "../dao/mongo/ProductManagerMongo.js";
import { productsModel } from "../models/products.model.js"
import ProductDto from "../dao/dto/product.dto.js";
import CustomerErrors from "../errors/CustomError.js";
import { generateProductErrorInfo, productNotFound } from "../errors/info.js";
import ErrorEnum from "../errors/error.enum.js";

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

export const getProductsById = async (req, res) => {
    const { uId } = req.params
    try {
      const product = await productsModel.findOne({_id: uId})
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
      if(!newProduct.title || !newProduct.description||!newProduct.code || !newProduct.price || !newProduct.stock || !newProduct.category){
      CustomerErrors.createError({
        name: "Product creation fails",
        cause: generateProductErrorInfo(newProduct),
        message:"Error triying create product",
        code: ErrorEnum.INVALID_TYPES_ERROR

      })
    req.logger.fatal('Product incompleted')}
      const added = await productsModel.create(newProduct)
      const result = new ProductDto(added)
      res.status(201).json({message: 'Producto añadido'})
    } catch (error) {

      next(error)
    }
}

export const deleteProduct = async (req, res) => {
    const { uId } = req.params
    try {
      const productDeleted = await productsModel.deleteOne({_id: uId})
      if(productDeleted.deleteCount > 0){
        return res.send({message: `Producto eliminado correctamente - Id: ${uId}`})
      }
      res.send({message: `Producto NO encontrado - Id: ${uId}`})
    } catch (error) {
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
