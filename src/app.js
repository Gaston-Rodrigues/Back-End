
import express from 'express'
import mongoose from 'mongoose'

import productsRoutes from './routes/products.routes.js'
import cartsRoutes from './routes/carts.routes.js'

import handlebars from 'express-handlebars'
import passport from 'passport'

import viewsRoutes from './routes/views.routes.js'
import chatsRoutes from './routes/chats.routes.js'
import sessionRoutes from './routes/session.routes.js'

import cartsRoutesFS from './routes/cartsFS.routes.js'
import productsRoutesFS from './routes/productsFS.routes.js'

import session from 'express-session'
import MongoStore from 'connect-mongo'
import initializePassport from './config/passport.config.js'
import { secret } from './config/consts.js'
import { getVariables } from './config/config.js'

import { Command } from 'commander'
import mockingRoutes from './routes/mocking.routes.js'
import { ErrorHandler } from './middlewares/error.js'


const app = express()

const program = new Command()
program.option('--mode <mode>', 'Modo de trabajo', 'production')
const options = program.parse()
const { PORT, MONGO_URL } = getVariables(options)

console.log(PORT)
console.log(MONGO_URL)

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))



app.use(session({
    secret: secret,
    store: MongoStore.create({
        mongoUrl: MONGO_URL
       
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


mongoose.connect(MONGO_URL)

app.use('/api/productFS', productsRoutesFS)
app.use('/api/cartsFS', cartsRoutesFS)
app.use('/api/products', productsRoutes)
app.use('/api/carts', cartsRoutes)
app.use('/api/chats', chatsRoutes)
app.use('/api/session', sessionRoutes)
app.use('/api/mockingProduct', mockingRoutes)
app.use('/', viewsRoutes)
app.use(ErrorHandler)
app.listen(PORT, () => {
    console.log(`Escuchando en el puerto ${PORT}`)
})

