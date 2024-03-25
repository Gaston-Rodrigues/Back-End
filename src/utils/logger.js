import winston from "winston";

const customLevelOption=({
    levels : {
        fatal : 0,
        error: 1,
        warning: 2,
        info: 3,
        http:4,
        debug:5
    }

})

const devLogger = winston.createLogger({
    levels : customLevelOption.levels,
    transports:[
  new winston.transports.Console({level: "debug"})
 ]
})



const prodLogger = winston.createLogger({
    levels: customLevelOption.levels,
    transports:[
        new winston.transports.Console({level: "info"}),
        new winston.transports.File({
            filename:"./errors.log",
            level: 'error',
        format: winston.format.simple()})
    ]
})


export const addLogger = (req,res,next)=>{
switch (process.env.LOGGER_MODE){
    case "development":
        req.logger = devLogger
        req.logger.http(`${req.method} en ${req.url} - ${new Date().toLocaleTimeString()}`)
        break;
    case "production":
        req.logger= prodLogger;
        break;
        default :
        throw new Error('enviroment doesnt exist')
       
}
  next()
}