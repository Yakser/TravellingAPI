const Router = require('express')
const router = new Router()
const hotelRouter = require('./hotelRouter')
const userRouter = require('./userRouter')
const cityRouter = require('./cityRouter')

router.use('/user', userRouter)
router.use('/city', cityRouter)
router.use('/hotel', hotelRouter)

module.exports = router