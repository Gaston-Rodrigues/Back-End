class TicketDto{
    constructor(ticket){
     this.code = ticket.code,
     this.purchase_datetime = ticket.purchase_datetime
     this.amount = ticket.amount
     this.purchase = ticket.purchase
    }

}

export default TicketDto