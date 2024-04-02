import { productsModel } from "../../models/products.model.js"


export class ProdManager {
    constructor(path){
        this.path = path;
    }

    async getProducts(limit=10, page=1, query='', sort=''){
        try{
            const [code, value] = query.split(':')
            const parseProducts = await productsModel.paginate({[code]: value}, {
                limit, 
                page, 
                sort: sort ? {price: sort} : {}
            })
            parseProducts.payload = parseProducts.docs
            delete parseProducts.docs
            return {message: "OK", ...parseProducts}
        } catch (error){
            return {message: "ERROR", rdo: "No hay productos"}
        }
    }

    async addProduct(product){

  try {
        const newProduct = await productsModel.create(product)
            return {message : " Product created" , rto: newProduct}
   
  } catch (error) {
    return {message : "Product didnt create"}
  }
    }

    async getProductById(pId){
        try {
                 const product = await productsModel.findOne({_id:pId})
                 return product
        } catch (error) {
            return {message : "product dont found", rto: error}
        }
   
 }
        
    async deleteProduct(id){
        try {
            const products = await productsModel.deleteOne(id)
            if(products){
                  return {message : "Product deleted"}
            }
           else {
            return {messasge : "product dont exits", rto: id}
           }
        } catch (error) {
            req.logger.error(error)
        }
      
        
    }

    async updateProduct(pId, product){
    try {
        const update = await productsModel.findOneAndUpdate({_id: pId},{$set : product})
        return {message : "Product Updated", rto : update}
    } catch (error) {
        return {message : error}
    }
}

 }
export default ProdManager