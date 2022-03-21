const { request, response } = require("express");
const { Product, Category } = require("../models");

const getProducts = async (req = request, res = response) => {
  let { limit = 5, page = 0 } = req.query;
  isNaN(limit) ? (limit = 5) : null;
  isNaN(page) ? (page = 0) : null;
  const query = { status: true };
  const [result, count] = await Promise.all([
    Product.find(query)
      .populate("user", "nombre")
      .populate("category", "name")
      .skip(limit ? page * limit : page)
      .limit(limit),

    Product.count(query),
  ]);

  return res.status(200).json({
    status: "ok",
    msg: "Productos recibidos correctamente",
    metadata: {
      count,
      result,
    },
  });
};

const getProduct = async (req = request, res = response) => {
  const { id } = req.params;
  const product = await Product.findById(id)
    .populate("user", "nombre")
    .populate("category", "name");
  return res.status(200).json({
    status: "ok",
    msg: "Producto recibido correctamente",
    metadata: {
      product: product,
    },
  });
};

const createProduct = async (req = request, res = response) => {
  const { name, category } = req.body;

  const productDB = await Product.findOne({ name });
  if (productDB) {
    return res.status(400).json({
      msg: `El producto ${name} ya existe`,
    });
  }

  const data = {
    name,
    category,
    user: req.usuarioLogueado._id,
  };

  const product = new Product(data);

  const savedProduct = await product.save();

  res.status(201).json(savedProduct);
};

const updateProduct = async (req = request, res = response) => {
  const { id } = req.params;
  const { _id, status, user, ...modifiedProduct } = req.body;

  modifiedProduct.user = req.usuarioLogueado._id;

  const product = await Product.findByIdAndUpdate(id, modifiedProduct);
  res.status(201).json(product);
};

const deleteProduct = async (req = request, res = response) => {
  const { id } = req.params;
  const product = await Product.findByIdAndUpdate(
    id,
    { status: false },
    { new: true }
  );
  res.status(202).json(product);
};

module.exports = {
  getProducts,
  getProduct,
  updateProduct,
  createProduct,
  deleteProduct,
};
