import ErrorEnum from "../errors/error.enum.js";

export const ErrorHandler = (error, req,res,next)=>{
    console.log(error.cause)
switch(error.code){
case ErrorEnum.INVALID_TYPES_ERROR:
    return res.status(400).send({error: error.name});
case ErrorEnum.PRODUCT_NOT_FOUND:
    return res.status(400).send({error: error.name});
case ErrorEnum.CART_NOT_FOUND :
    return res.status(400).send({error: error.name});
default :
return res.status(400).send({error: "Unhandled error"})
}
}
