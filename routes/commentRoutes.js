const { Router } = require('express')
const commentController = require('../controllers/commentController')

const router = Router()

router.get('/comments', commentController.comment_get)
router.post('/comments/post', commentController.comment_post)
// router.get('/logsdin', commentController.login_get)

module.exports = router 