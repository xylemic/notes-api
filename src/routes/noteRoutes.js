const express = require('express')
const router = express.Router()

const authenticate = require('../middleware/authMidleware')

const {
  getNotes,
  getNote,
  createNote,
  updateNote,
  deleteNote
} = require('../controllers/noteController')


router.use(authenticate)

router.get('/', getNotes)
router.get('/:id', getNote)
router.post('/', createNote)
router.patch('/:id', updateNote)
router.delete('/:id', deleteNote)

module.exports = router

