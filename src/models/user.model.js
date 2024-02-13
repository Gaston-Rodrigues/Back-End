import mongoose, { Schema } from "mongoose";

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
        unique: true
    },
    age: {
        type: Number,

    },
    password: {
        type: String,
        required: true
    },

    cart: {
   type : mongoose.Schema.ObjectId,
   required: false, 
   ref : 'carts'
    },

    role :{
        type: String,
        default:'user'}
})

export const userModel = mongoose.model(userCollection, userSchema)