const noteService = require('../services/noteService')
const asyncHandler = require('../middleware/asyncHandler')
const { success } = require('../utils/response')


const getNotes = asyncHandler(async (req, res) => {
  const filters = {
    search: req.query.search,
    category: req.query.category
  }

  const page = parseInt(req.query.page) || 1
  const limit = parseInt(req.query.limit) || 10

  const result = await noteService.getNotes(
    req.user.id,
    filters,
    page,
    limit
  )

  success(res, {
    data: result.data,
    page,
    limit,
    total: result.total
  })
})

const getNote = asyncHandler(async (req, res) => {
  const note = await noteService.getNoteById(
    Number(req.params.id),
    req.user.id
  )

  if (!note) {
    const err = new Error('note not found')
    err.status = 404
    throw err
  }

  success(res, note)
})


const createNote = asyncHandler(async (req, res) => {
  const note = await noteService.createNote(req.body, req.user.id)
  
  success(res, note, 201)
})

const updateNote = asyncHandler(async (req, res) => {
  const note = await noteService.updateNote(
    Number(req.params.id),
    req.body,
    req.user.id
  )

  if (!note) {
    const err = new Error('note not found')
    err.status = 404
    throw err
  }

  success(res, note)
})


const deleteNote = asyncHandler(async (req, res) => {
  const deleted = await noteService.deleteNote(
    Number(req.params.id),
    req.user.id
  )

  if (!deleted) {
    const err = new Error('note not found')
    err.status = 404
    throw err
  }

  success(res, { message : 'note deleted' })
})


module.exports = {
  getNotes,
  getNote,
  createNote,
  updateNote,
  deleteNote
}

