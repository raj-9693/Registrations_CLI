
const Category = require('../models/Category');
const Note = require('../models/note');

const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    return res.status(200).json({
      success: true,
      message: 'Categories fetched successfully',
      data: categories,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const createCategory = async (req, res) => {
  try {
    const categoryName = req.body.category_name?.trim();
    if (!categoryName) {
      return res.status(400).json({
        success: false,
        message: 'category_name is required',
      });
    }

    const newCategory = new Category({ category_name: categoryName });
    await newCategory.save();
    return res.status(201).json({
      success: true,
      message: 'Category created successfully',
      data: newCategory,
    });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }

    await Note.deleteMany({ category_id: req.params.id });
    return res.status(200).json({
      success: true,
      message: 'Category and linked notes deleted successfully',
    });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = { getCategories, createCategory, deleteCategory };