const express = require('express')
const ProductRouter = require('./products.router')
const CartRouter = require('./carts.router')
const ViewRouter = require('./views.router')
const SessionsRouter = require('./sessions.router')
const { mockingProducts } = require('../utils/mockingProducts')
const errorHandler = require('../middlewares/errors')

const productRouter = new ProductRouter()
const cartRouter = new CartRouter()
const viewRouter = new ViewRouter()
const sessionsRouter = new SessionsRouter()

const mainRouter = express.Router()

mainRouter.use('/api/products', productRouter.getRouter())
mainRouter.use('/api/carts', cartRouter.getRouter())
mainRouter.use('/api/sessions', sessionsRouter.getRouter())
mainRouter.use('/', viewRouter.getRouter())
mainRouter.use('/mockingproducts', (req, res, next) => {
    res.send(mockingProducts())
})
mainRouter.use('/loggerTest', (req, res, next) => {
    req.logger.fatal('testing fatal log')
    req.logger.error('testing error log')
    req.logger.warning('testing warning log')
    req.logger.info('testing info log')
    req.logger.http('testing http log')
    req.logger.debug('testing debug log')
    res.send('Logger')
})
mainRouter.use('*', (req, res, next) => {
    res.status(404).send({status: "error", error: 'Requested path not found',});
})
mainRouter.use(errorHandler)

module.exports = mainRouter