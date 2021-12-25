const Router = require('express')
const router = new Router()
const hotelController = require('../controllers/hotelController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('ADMIN'), hotelController.create)
router.get('/', hotelController.getAll)
router.get('/:id', hotelController.getOne)

module.exports = router