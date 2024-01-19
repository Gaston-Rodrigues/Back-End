import { Router } from "express";
import { chatsModel } from "../models/chats.model.js"


const chatsRoutes = Router()


chatsRoutes.post('/', async (req, res) => {
  console.log(req.body)
  try {
    const newMessage = req.body
    const added = await chatsModel.create(newMessage)
    console.log("Mensaje creado")
    res.status(201).json({message: 'Mensaje creado exitosamente'})
  } catch (error) {
    console.error(error)
    res.status(400).json({message: `No se pudo agregar el mensaje - ${error}`})
  }
})


export default chatsRoutes;