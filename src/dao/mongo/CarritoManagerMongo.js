
import { cartsModel } from '../../models/carts.model.js';
import mongoose from 'mongoose';


export class CartManager{
    constructor(path){
        this.path = path;
    }


    async getCarts(){
        try {       
            const result= await cartsModel.find()
            return result 
        }   
        catch (error) {
           return {message : "cart not found"}
        }
         }

    async addCart(cart){
   try {
    const result = await cartsModel.create(cart)
    return result 
   } catch (error) {
    return {message : "cart dont created", rto : error}
   }
    }


    async addProductsInCart(cId, pId, quantity) {
        try {
          const cart = await cartsModel.findOne({_id: cId});
          if(cart){
            const existingProducts = cart.products.find(product => product.product.toString() === pId);
            if(existingProducts){
              existingProducts.quantity += quantity;
            }
            else{
              cart.products.push({product: pId, quantity});
            }
            await cart.save();
            return true;
          }
          else{
            return false;
          }
        } catch (e) {
          return false;
        }
      }
   
    async deleteProductInCart(cId, pId){
        try {
            const result = await cartsModel.updateOne({_id: cId}, {
                $pull: {products: {product: new mongoose.Types.ObjectId(pId)}}
            })
            if(result.modifiedCount > 0){
                return true
            } else {
                return false
            }
            
        } catch (error) {
            req.logger.error(error)
            return false
        }
    }

    async getCartById(id){
        try {
            const cart = await cartsModel.findOne({_id: id}).populate('products.product')
            if (cart){
                return cart
            }
            else {
                return {message: "ERROR", rdo: "El carrito NO existe o no tiene productos"}
            }
        } catch (error) {
            req.logger.error(error)
            return {message: "ERROR", rdo: "Error"}
        }

    }

    async updateCart(cId, cart){
         try {
            const resultado = await cartsModel.updateOne({_id: cId}, cart)
            return resultado
         } catch (error) {
            req.logger.error(error)
            return error            
         }
    }

    async updateProductInCart(cId, pId, quantity){
        if(!quantity){
            return false
        }
        try {
            const cart = await cartsModel.findOne({_id: cId})
            if(!cart){
                return false
            }
            const product = cart.products.find(product => product.product.toString() == pId)
            console.log(product)
            if(!product){
                return false
            }
            product.quantity = quantity
            await cart.save()
            return true
        } catch (error) {
            req.logger.error(error)
            return false
        }
    }

    async deleteAllProductsInCart (id){
        try {
            const deleted = await cartsModel.updateOne({_id: id}, {
                products: []
            })
            if(deleted.modifiedCount > 0){
                return true
            }
            else{
                return false
            }
        } catch (error) {
            req.logger.error(error)
            return false
            
        }
    }
    async deleteProductByCart(cId, pId) {
        try {
          const result = await cartsModel.updateOne(
            { _id: cId },
            { $pull: { products: { product: new mongoose.Types.ObjectId(pId) } } }
          )
      
          if (result.modifiedCount > 0) {
            return { message: "OK", rdo: `Producto del carrito con ID ${cId} eliminado exitosamente.` }
          } else {
            return { message: "ERROR", rdo: `Producto con ID ${pId} no encontrado en el carrito con ID ${cId}.` }
          }
        } 
        catch (e) {
          return {message: "ERROR" , rdo: "Error al momento de eliminar el producto en el carrito"}
        }
      }

}

export default CartManager