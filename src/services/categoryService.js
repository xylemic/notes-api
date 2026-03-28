const pool = require('../config/db')

const getCategories = async (userId) => {
  const result = await pool.query(
    `SELECT * FROM categories WHERE user_id = $1`,
    [userId]
  )

  return result.rows
}

const createCategory = async (name, userId) => {
  const result = await pool.query(
    `INSERT INTO categories (name, user_id)
     VALUES ($1, $2)
     RETURNING *
    `,
    [name, userId]
  )

  return result.rows[0]
}

module.exports = {
  getCategories,
  createCategory
}

