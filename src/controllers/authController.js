const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const asyncHandler = require('../middleware/asyncHandler')
const { success } = require('../utils/response')
const userService = require('../services/userService')

const register = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const existingUser = await userService.getUserByEmail(email)


  if (existingUser) {
    const err = new Error('user already exists')
    err.status = 400
    throw err
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const user = await userService.createUser(email, hashedPassword)

  success(res, { id : user.id, email : user.email }, 201)
})

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await userService.getUserByEmail(email)
  if (!user) {
    const err = new Error('invalid credentials')
    err.status = 400
    throw err
  }

  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) {
    const err = new Error('invalid credentials')
    err.status = 400
    throw err
  }

  const token = jwt.sign(
    { id: user.id },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  )

  success(res, { token })
})

module.exports = {
  register,
  login
}

