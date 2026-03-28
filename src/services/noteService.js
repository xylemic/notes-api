const pool = require('../config/db')

const getNotes = async (userId) => {
  const result = await pool.query(
    `SELECT *
     FROM notes
     WHERE user_id = $1
     ORDER BY created_at DESC
    `,
    [userId]
  )

  return result.rows
}

const getNoteById = async (id, userId) => {
  const result = await pool.query(
    `SELECT *
     FROM notes
     WHERE id = $1 AND user_id = $2
    `,
    [id, userId]
  )

  return result.rows[0]
}

const createNote = async (data, userId) => {
  const result = await pool.query(
    `INSERT INTO notes (title, content, user_id, category_id)
     VALUES ($1, $2, $3, $4)
     RETURNING *
    `,
    [
     data.title,
     data.content ?? null,
     userId,
     data.category_id ?? null
    ]
  )

  return result.rows[0]
}


const updateNote = async (id, data, userId) => {
  const fields = []
  const values = []
  let index = 1

  if (data.title !== undefined) {
    fields.push(`title = $${index++}`)
    values.push(data.title)
  }

  if (data.content !== undefined) {
    fields.push(`content = $${index++}`)
    values.push(data.content)
  }

  if (fields.length === 0) return null

  values.push(id)
  values.push(userId)

  const result = await pool.query(
    `UPDATE notes
     SET ${fields.join(', ')}
     WHERE id = $${index++} AND user_id = $${index}
     RETURNING *
    `,
    values
  )

  return result.rows[0]
}


const deleteNote = async (id, userId) => {
  const result = await pool.query(
    `DELETE FROM notes
     WHERE id = $1 AND user_id = $2
     RETURNING *
    `,
    [id, userId]
  )

  return result.rows[0]
}


module.exports = {
  getNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote
}


