import mongoose from "mongoose";

const ticketColletion = "tickets"


const ticketSchema = mongoose.Schema({

code : {
    type : String,
   unique: true, 
}, 
purchase_datetime: {
    type: Date,
    required : true,
    default: Date.now()
},

amount : {
type: Number,
required : true,
default: 0
},

purchase : {
type : String,
require : true 

}
})


export const ticketModel = mongoose.model(ticketColletion,ticketSchema) 