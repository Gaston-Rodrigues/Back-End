import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2'

const productsCollection = 'products'

const productsSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    } ,
    description:  {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: false
    },
    available: {
        type: Boolean,
        required: true,
        default: 1
    },
    stock: {
        type: Number,
        required: true,
        default: 0
    },
    category: {
        type: String,
        enum: ['calle','enduro'],
        required: true,
    },
    thumbnail: {
        type: [],
        required: false
    } ,

    owner : String,
      
})

productsSchema.plugin(mongoosePaginate)

export const productsModel = mongoose.model(productsCollection, productsSchema)