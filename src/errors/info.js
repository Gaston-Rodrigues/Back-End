export const generateProductErrorInfo = (product)=>{
    return ` one or more properties are incomplete or invalid 
    title : needs to be sting, received ${typeof product.title}
    description: needs to be sting, received ${typeof product.description}
    code: needs to be sting, received ${typeof product.code}
    price: needs to be sting, received ${typeof product.price}
    stock: needs to be sting, received ${typeof product.stock}
    category: needs to be sting, received ${typeof product.category}
    `
}

export const productNotFound = ()=>{
 return `Product not found`
}

export const cartNotFound =()=>{
    return `Cart not found`
}