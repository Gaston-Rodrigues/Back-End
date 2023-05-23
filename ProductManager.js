///const { isUtf8 } = require("buffer")
///const fs = require (`fs`)

import {promises  as fs} from "fs" 
import { stringify } from "querystring"


/*const auto = async() =>{
await fs.writeFile("Auto.txt","Mercedez")
await fs.appendFile("Auto.txt","\n BMW")

let respuesta = await fs.readFile("Auto.txt", "UTF-8")

 console.log(respuesta)
await fs.unlink("Auto.txt")
}

auto()
*/

class ProductManager {

    constructor(){
        this.patch = "productos.txt"
        this.newID = 1 
        this.products = []
    }
  

static id = 0

addProduct = async (title,description,price,thumbnail,code,stock)=>{
 
    let producto = {
        id:this.newID++,
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
    }
    this.products.push(producto);
     await fs.writeFile(this.patch, JSON.stringify(this.products))
    console.log(producto)


}
    readProducts = async () => {
    let answer= await fs.readFile(this.patch, "utf-8")

    return JSON.parse(answer)}

    getProducts = async ()=>{
        let respuesta = await this.readProducts()
        return console.log(respuesta)

    }

    getProductsById = async(id)=> { 

        let respuesta2 = await this.readProducts()

        const product = respuesta2.find((product) => product.id === id);
        const message = product ? product : "NOT FOUND";
      
        console.log(message);
       
  }  

  deleteProductsById = async (id) =>{
    let borrado= await this.readProducts()
    let filtrado = borrado.filter((product) => product.id != id)
     await fs.writeFile(this.patch, JSON.stringify(filtrado))
  console.log("Se elimino el producto")
}

        updateProducts= async({id, ...producto})=>{
       await this.deleteProductsById(id)
       let productBefore= await this.readProducts();
        let productChange= [
            {id, ...producto},...productBefore]
            await fs.writeFile(this.patch, JSON.stringify(productChange))
        }

}


  const productos= new ProductManager
  
  /*productos.addProduct('Mercedez', 'Diesel', '5000', 'Alemania', 3, 11)
  productos.addProduct('Audi', 'Diesel', '3500', 'Alemania','cod2' ,8);
  productos.addProduct('BMW', 'Nafta', '4500', 'Alemania', 'cod2', 7);
  productos.addProduct('Ford', 'Nafta', '2500', 'EE.UU', 'cod1', 4); */  

  //productos.getProducts();

  //productos.getProductsById(8);
 // productos. deleteProductsById(2)

 productos.updateProducts({  id: 4,
    title: 'Ford',
    description: 'Nafta',
    price: '3500',
    thumbnail: 'EE.UU',
    code: 'cod1',
    stock: 4})