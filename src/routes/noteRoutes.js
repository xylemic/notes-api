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

const validateNote = require('../middleware/validateNote')


router.use(authenticate)

router.get('/', getNotes)
router.get('/:id', getNote)
router.post('/', validateNote, createNote)
router.patch('/:id', validateNote, updateNote)
router.delete('/:id', deleteNote)

module.exports = router

