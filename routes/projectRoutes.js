const { Router } = require('express')
const projectController = require('../controllers/projectController')

const router = Router()

router.get('/api/projects/veex/:id', projectController.get_project_data)
router.get('/api/projects/veex', projectController.get_all_projects)
router.post('/api/projects/veex/add', projectController.add_project)
router.post('/api/projects/veex/edit/:name', projectController.edit_project)
router.get('/api/projects/veex/delete/:name', projectController.delete_project)
router.get('/api/projects/veex/comments/:id', projectController.get_project_comments)
router.get('/api/comments/getid/:name', projectController.get_project_id)
// router.post()
// router.delete()

module.exports = router 