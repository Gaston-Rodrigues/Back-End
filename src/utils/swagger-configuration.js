export const swaggerConfiguration = {
    definition:{
        openapi: '3.0.1',
        info:{
            title : 'Documentacion ecommerce',
            description: 'Es un ecommerce'
        }
    },
    apis :['src/docs/**/*.yaml']
}