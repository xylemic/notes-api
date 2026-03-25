const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const userService = require('../services/userService')

const register = async (req, res) => {
  const { email, password } = req.body

  const existingUser = await userService.getUserByEmail(email)
  if (existingUser) {
    return res.status(400).json({ error : 'user already exists' })
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const user = await userService.createUser(email, hashedPassword)

  res.status(201).json({ id : user.id, email : user.email })
}

const login = async (req, res) => {
  const { email, password } = req.body

  const user = await userService.getUserByEmail(email)
  if (!user) {
    return res.status(400).json({ error : 'invalid credentials' })
  }

  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) {
    return res.status(400).json({ error : 'invalid credentials' })
  }

  const token = jwt.sign(
    { id : user.id },
    process.env.JWT_SECRET,
    { expiresIn : '1h' }
  )

  res.json({ token })
}

module.exports = {
  register,
  login
}

