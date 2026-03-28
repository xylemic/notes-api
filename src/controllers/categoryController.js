const categoryService = require('../services/categoryService')

const getCategories = async (req, res) => {
  const categories = await categoryService.getCategories(req.user.id)
  res.json(categories)
}


const createCategory = async (req, res) => {
  const category = await categoryService.createCategory(
    req.body.name,
    req.user.id
  )

  res.status(201).json(category)
}


module.exports = {
  getCategories,
  createCategory
}


