import { Faker, es, en} from "@faker-js/faker";

const faker = new Faker({
    locale: [es,en]
})

export const generateProduct =()=>{
    return{
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        code: faker.string.alphanumeric({length: 10}),
        price:faker.commerce.price(),
        stock: faker.number.int(),
        category: faker.commerce.productMaterial(),
        image:faker.image.url(),
        id: faker.database.mongodbObjectId()
    }
}
export const getProductMock = async (req,res)=>{
    try {
        const products = [];
  for(let i = 0 ; i< 100; i++){
     products.push(generateProduct())
  }
   return res.send({status: "sucess", payload: products})
    } catch (error) {
      console.log(error)
    }

  }