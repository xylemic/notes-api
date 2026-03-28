const express = require('express')
const authRoutes = require('./routes/authRoutes')
const authenticate = require('./middleware/authMidleware')
const noteRoutes = require('./routes/noteRoutes')
const categoryRoutes = require('./routes/categoryRoutes')


const app = express()

app.use(express.json())

app.use('/auth', authRoutes)
app.use('/notes', noteRoutes)
app.use('/categories', categoryRoutes)

app.get('/protected', authenticate, (req, res) => {
  res.json({
    message : 'access granted',
    user : req.user
  })
})

module.exports = app


