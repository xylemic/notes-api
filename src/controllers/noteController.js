const noteService = require('../services/noteService')

const getNotes = async (req, res) => {
  const notes = await noteService.getNotes(req.user.id)
  res.json(notes)
}

const getNote = async (req, res) => {
  const note = await noteService.getNoteById(
    Number(req.params.id),
    req.user.id
  )

  if (!note) {
    return res.status(404).json({ error : 'note not found '})
  }

  res.json(note)
}


const createNote = async (req, res) => {
  const note = await noteService.createNote(req.body, req.user.id)
  res.status(201).json(note)
}

const updateNote = async (req, res) => {
  const note = await noteService.updateNote(
    Number(req.params.id),
    req.body,
    req.user.id
  )

  if (!note) {
    return res.status(404).json({ error : 'note not found' })
  }

  res.json(note)
}


const deleteNote = async (req, res) => {
  const deleted = await noteService.deleteNote(
    Number(req.params.id),
    req.user.id
  )

  if (!deleted) {
    return res.status(404).json({ error : 'note not found' })
  }

  res.json({ message : 'note deleted' })
}


module.exports = {
  getNotes,
  getNote,
  createNote,
  updateNote,
  deleteNote
}

