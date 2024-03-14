import { createHash } from "../../utils/bcrypt.js"
class Userdto{
 
    constructor(user){
        this.first_name = user.first_name,
        this.last_name = user.last_name,
        this.email = user.email,
        this.age = user.age
        this.password = createHash(user.password)
        this.cart = user.cart   
        this.role= user.role
    }


 getCurrentUSer(){
    return {
        fullName : this.first_name + " " + this.last_name,
        email : this.email,
        role : this.user.role
    }

 }

}

export default Userdto;

