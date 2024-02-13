
import express from 'express'
import mongoose from 'mongoose'

import productsRoutesFS from './routes/productsFS.routes.js'
import cartsRoutesFS from './routes/cartsFS.routes.js'

import productsRoutes from './routes/products.routes.js'
import cartsRoutes from './routes/carts.routes.js'

import handlebars from 'express-handlebars'
import passport from 'passport'

import viewsRoutes from './routes/views.routes.js'
import chatsRoutes from './routes/chats.routes.js'
import sessionRoutes from './routes/session.routes.js'

import session from 'express-session'
import MongoStore from 'connect-mongo'
import initializePassport from './config/passport.config.js'
import { secret } from './config/consts.js'

const PORT = 8080
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))



app.use(session({
    secret: secret,
    store: MongoStore.create({
        mongoUrl: 'mongodb+srv://fabelinho5:159Chelseafc@coder.h2ztgkp.mongodb.net/ecommerce'
       
    }),
    resave: true,
    saveUninitialized: true
}))



initializePassport()
app.use(passport.initialize())
app.use(passport.session())


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

