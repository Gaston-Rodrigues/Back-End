import { ticketModel } from "../../models/ticket.model.js"

ticketModel
export default class Ticket{
 constructor(){

 }
async getTicketById (id){

try {
    const result = await ticketModel.findById(id)

        return {message: "OK" , rdo: result}

} catch (error) {
    console.log(error)
    return{mesasage : "Ticket not found"} 
}
}

async addTicket(ticket){
try {
    const create = await ticketModel.create(ticket)
    return {message: "Ticket created" , rdo: create} 

} catch (error) {
    console.log(error)
    
}
}


}