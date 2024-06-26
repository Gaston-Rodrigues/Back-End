import mongoose from "mongoose";

const userCollection = 'users'

const userSchema = mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
    },
    email: {
        type: String,
        required: true,

    },
    age: {
        type: Number,

    },
    password: {
        type: String,
        required: true
    },

    role: {
        type: String,
        default: "user",
        required: true
    },
    lastConnection:{
        type: Date,
        default : Date.now   
    },

    cart: {
        type : mongoose.Schema.ObjectId,
        ref : 'carts'
    },

})

export const userModel = mongoose.model(userCollection, userSchema)