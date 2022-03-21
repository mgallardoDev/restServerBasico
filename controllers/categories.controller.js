const { request, response } = require("express");
const { Category } = require("../models");

// getCategories - paginado - total - populate
const getCategories = async (req = request, res = response) => {
  let { limit = 5, page = 0 } = req.query;
  isNaN(limit) ? (limit = 5) : null;
  isNaN(page) ? (page = 0) : null;
  const query = { status: true };
  const [result, count] = await Promise.all([
    Category.find(query)
      .populate("user", "nombre")
      .skip(limit ? page * limit : page)
      .limit(limit),

    Category.count(query),
  ]);

  return res.status(200).json({
    status: "ok",
    msg: "Categorias recibidas correctamente",
    metadata: {
      count,
      result,
    },
  });
};

//getCategory - populate
const getCategory = async (req = request, res = response) => {
  const { id } = req.params;
  const category = await Category.findById(id).populate("user", "nombre");
  return res.status(200).json({
    status: "ok",
    msg: "Categorias recibidas correctamente",
    metadata: {
      category,
    },
  });
};

const createCategory = async (req = request, res = response) => {
  const name = req.body.name.toUpperCase();

  const categoryDB = await Category.findOne({ name });
  if (categoryDB) {
    return res.status(400).json({
      msg: `La categoria ${name} ya existe`,
    });
  }

  const data = {
    name,
    user: req.usuarioLogueado._id,
  };

  const category = new Category(data);

  await category.save();

  res.status(201).json(category);
};

//updateCategory -
const updateCategory = async (req = request, res = response) => {
  const { id } = req.params;
  const { _id, status, user, ...modifiedCategory } = req.body;

  modifiedCategory.user = req.usuarioLogueado._id;
  modifiedCategory.name = modifiedCategory.name.toUpperCase();

  const category = await Category.findByIdAndUpdate(id, modifiedCategory);
  res.status(201).json(category);
};

//deleteCategory -
const deleteCategory = async (req = request, res = response) => {
  const { id } = req.params;
  const category = await Category.findByIdAndUpdate(id, { status: false }, {new: true});
  res.status(202).json(category);
};

module.exports = {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
};
