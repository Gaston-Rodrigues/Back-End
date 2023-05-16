class ProductManager {
    constructor() {
        this.products = [];
        this.newID = 1 
    }

    addProduct(title,description,price,thumbnail,code,stock){
    const productoExist =this.products.find(
        (producto) => producto.code === code
        );
    if (productoExist) {
        console.log(
            "Error, el producto ya exite "
        );
        return;
    }

    if (!title || !description || !price || !thumbnail || !code || !stock){
    console.log(
        "Debes completar todos los campos"
    );
    } else {

    const producto = {
        id:this.newID++,
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
    }
    this.products.push(producto);
    {
        console.log("el producto fue agregado correctamente");
    }
}
}
getProduct() {
    return this.products;
}
getProductById(id) {
    const productoId = this.products.find((producto) => producto.id === id); {
        if (!productoId) {
            console.log("NOT FOUND");
        }
        else {
            console.log("Producto fue encontrado");
            return productoId;
        }
    }
}
}

const producto = new ProductManager()
producto.addProduct('Mercedez', 'Diesel', '5000', 'Alemania', 3);
producto.addProduct('Audi', 'Diesel', '3500', 'Alemania','cod2' ,8);
producto.addProduct('BMW', 'Nafta', '4500', 'Alemania', 'cod2', 7);
producto.addProduct('Ford', 'Nafta', '2500', 'EE.UU', 'cod1', 4);

console.log(producto.getProduct());
producto.getProductById(8);
producto.getProductById(1);