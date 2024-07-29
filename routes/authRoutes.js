const { Router } = require('express')
const authController = require('../controllers/authController')
const { requireAuth, checkUser, checkConnection } = require('../middleware/authMW')

const router = Router()

router.get('/auth', checkConnection, authController.signup_get)
router.post('/auth', authController.signup_post)
router.get('/login', authController.login_get)
router.post('/login', authController.login_post)
router.get('/logout', authController.logout_get)
router.get('/auth/admin', authController.get_admin_status)
router.post('/auth/forgot', authController.forgot_password)

module.exports = router 