const { Router } = require('express')
const libraryController = require('../controllers/libraryController')

const router = Router()

router.get('/library/content/:file', libraryController.open_pp)
// router.get('/logsdin', commentController.login_get)

module.exports = router 