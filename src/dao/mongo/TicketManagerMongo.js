import { ticketModel } from "../../models/tickets.model.js"


export default class Ticket{

async getTicketById (id){

try {
    const result = await ticketModel.findById(id)

        return {message: "OK" , rdo: result}

} catch (error) {
    req.logger.error(error)
    return{mesasage : "Ticket not found"} 
}
}

async addTicket(ticket){
try {
    const create = await ticketModel.create(ticket)
    return  create

} catch (error) {
    req.logger.error(error)
    
}
}


} 