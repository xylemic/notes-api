const categoryService = require('../services/categoryService')
const asyncHandler = require('../middleware/asyncHandler')
const { success } = require('../utils/response')

const getCategories = asyncHandler(async (req, res) => {
  const categories = await categoryService.getCategories(req.user.id)
  
  success(res, categories)
})


const createCategory = asyncHandler(async (req, res) => {
  if (!req.body.name) {
    const err = new Error('category name is required')
    err.status = 400
    throw err
  }

  const category = await categoryService.createCategory(
    req.body.name,
    req.user.id
  )

  success(res, category, 201)
})


module.exports = {
  getCategories,
  createCategory
}


