import { Router } from "express";

const loggerRoutes = Router()

loggerRoutes.get('/', (req,res)=>{
console.log('Estoy en logger')
req.logger.debug('Esto es un debug')
req.logger.http('Esto es un http')
req.logger.info('Esto es un info')
req.logger.warning('Esto es un warning')
req.logger.error('Esto es un error')
req.logger.fatal('Esto es un error fatal')
res.send({message: 'Niveles de errores'})

})


export default loggerRoutes;