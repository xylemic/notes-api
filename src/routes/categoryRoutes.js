const express = require('express')
const router = express.Router()

const authenticate = require('../middleware/authMidleware')
const {
  getCategories,
  createCategory
} = require('../controllers/categoryController')


router.use(authenticate)

router.get('/', getCategories)
router.post('/', createCategory)


module.exports = router

