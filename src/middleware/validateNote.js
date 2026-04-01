const validateNote = (req, res, next) => {
  if (req.method === 'POST' && !req.body.title) {
    const err = new Error('title is required')
    err.status = 400
    return next(err)
  }

  next()
}

module.exports = validateNote


