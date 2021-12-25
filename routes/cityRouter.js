const Router = require('express')
const router = new Router()
const cityController = require('../controllers/cityController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('ADMIN'), cityController.create)
router.get('/', cityController.getAll)

module.exports = router