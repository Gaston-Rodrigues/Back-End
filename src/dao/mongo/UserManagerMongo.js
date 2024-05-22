import { userModel } from "../../models/user.model.js";
import Mailing from "../../utils/mailing.js";


export  class User{


   async getUser(){
    try {
        const userAll = await userModel.find()
        return {message: "OK" , rdo: userAll}
    } catch (error) {
        req.logger.error(error)
    }
   }

   async getUserById(uId){
   try {
    const result = await userModel.findOne({_id: uId})
   return {message: "OK" , rdo: result}
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

  async deleteUser(Id){
    try {
         const deleted= await userModel.deleteOne({_id: Id})
         if(deleted.deletedCount === 0){
            return {message : `user ${Id} dont found`}
         }
         return {message: `User with ${Id} deleted`}
    } catch (error) {
        return {message: "error"}
    }
   
  }

  async lastConnectionDeletedUser(){
    try {
       const online = new Date() 
       online.setDate(online.getDate() - 2)
       const users = await userModel.find({lastConnection:{ $lt: online}})
        if(users){
            const serviceMailing = new Mailing()

            for(const user of users ){
                try {
                    const mail  = `<p> Hola ${user.first_name}, tu cuenta sera eliminada debido a tu inactividad en las ultimas 48 hs </p>`
                    await serviceMailing.sendMail({
                     from: "Tienda Coder",
                    to : user.email,
                    subject : "Cuenta inactiva",
                    html: mail
                    })
                    await userModel.findOneAndDelete(user._id)

                } catch (error) {
                    return {messsage: "error"}
                }
            }
            return {message: "Usuarios inactivos eliminados exitosamente"}
        }

    } 
    catch (error) {
        return {message: "Erro al eliminar el usuario"}
        
    } 
  }
 async changesRol (uId){
    try {
      
        const find = await userModel.findOne({_id:uId})
        let updateRole;
        if(find.role === "user"){
            updateRole = "Premium"
        }
        if(find.role === "Premium"){
            updateRole = "user"
        }
        const newStatus = await userModel.findOneAndUpdate({_id: uId}, {role: updateRole})
    return {message: "Rol Update", newStatus}
       } catch (error) {
        return {message: error}
    }
    
 }
}

