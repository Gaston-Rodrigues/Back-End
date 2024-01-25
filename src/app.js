import express from 'express'
import mongoose from 'mongoose'

import productsRoutesFS from './routes/productsFS.routes.js'
import cartsRoutesFS from './routes/cartsFS.routes.js'

import productsRoutes from './routes/products.routes.js'
import cartsRoutes from './routes/carts.routes.js'

import handlebars from 'express-handlebars'
import viewsRoutes from './routes/views.routes.js'
import chatsRoutes from './routes/chats.routes.js'
import sessionRoutes from './routes/session.routes.js'

import session from 'express-session'
import MongoStore from 'connect-mongo'

const PORT = 8080
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))


app.use(session({
    secret: "C0d3rh0us3",
    store: MongoStore.create({
        mongoUrl: 'mongodb+srv://fabelinho5:159Chelseafc@coder.h2ztgkp.mongodb.net/ecommerce'

    }),
    resave: true,
    saveUninitialized: true
}))


const hbs = handlebars.create({
    runtimeOptions: {
        allowProtoPropertiesByDefault: true
    }
})

app.engine('handlebars', hbs.engine)
app.set('views', 'src/views')
app.set('view engine', 'handlebars')

mongoose.connect('mongodb+srv://fabelinho5:159Chelseafc@coder.h2ztgkp.mongodb.net/ecommerce')


app.use('/api/productsfs', productsRoutesFS)
app.use('/api/cartsfs', cartsRoutesFS)


app.use('/api/products', productsRoutes)
app.use('/api/carts', cartsRoutes)
app.use('/api/chats', chatsRoutes)
app.use('/api/session', sessionRoutes)

app.use('/', viewsRoutes)

app.listen(PORT, () => {
    console.log(`Escuchando en el puerto ${PORT}`)
})