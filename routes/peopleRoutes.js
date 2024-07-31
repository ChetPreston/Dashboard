const { Router } = require('express')
const peopleController = require('../controllers/peopleController')

const router = Router()

router.post('/people/search', peopleController.search)
// router.get('/people', peopleController.)
router.get('/people/:id', peopleController.id)
router.post('/people/user', peopleController.user)

module.exports = router

