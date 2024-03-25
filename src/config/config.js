import dotenv from 'dotenv'

export const getVariables = (options) => {
    const enviroment = options.opts().mode
    
    dotenv.config({
        path: enviroment === 'production' ? './src/.env.production' : './src/.env.development'
    })

    return {
        PORT: process.env.PORT, 
        MONGO_URL: process.env.MONGO_URL,
        ADMIN_NAME: process.env.ADMIN_NAME,
        ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
        LOGGER_MODE: process.env.LOGGER_MODE
    
    }
}