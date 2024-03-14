import { userModel } from "../../models/user.model.js";


export class User{


   async getUser(){
    try {
        const userAll = await userModel.find()
        return userAll
    } catch (error) {
        console.log(error)
    }
   }

   async getUserById(id){
   try {
    const result = await userModel.findById(id)
    return result
   } catch (error) {
    return {message:"User not Found"}
   }
   }
   
   async addUser (user){
    try {
   const create = await userModel.create(user)
   return {message: "User created", rdo: create}
    } catch (error) {
    return {message:"User dont created"}
    }
   }



}