const { request, response } = require("express");
const { isValidObjectId } = require("mongoose");
const { User, Category, Product } = require("../models");

const availableCollections = ["categories", "products", "roles", "users"];

const searchUsers = async (term = "", res = response) => {
  const isMongoId = isValidObjectId(term);

  if (isMongoId) {
    const user = await User.findById(term);
    return res.status(user ? "200" : "404").json({
      count: user ? [user].length : 0,
      results: user ? [user] : [],
    });
  }

  const regExp = new RegExp(term, "i");

  const users = await User.find({
    $or: [{ nombre: regExp }, { email: regExp }],
    $and: [{ status: true }],
  });
  return res.status(users ? "200" : "404").json({
    count: users.length,
    results: users,
  });
};

const searchCategories = async (term = "", res = response) => {
  const isMongoId = isValidObjectId(term);

  if (isMongoId) {
    const category = await Category.findById(term);
    return res.status(category ? "200" : "404").json({
      count: category ? [category].length : 0,
      results: category ? [category] : [],
    });
  }

  const regExp = new RegExp(term, "i");

  const categories = await Category.find({ name: regExp, status: true });
  return res.status(categories ? "200" : "404").json({
    count: categories.length,
    results: categories,
  });
};

const searchProducts = async (term = "", res = response) => {
  const isMongoId = isValidObjectId(term);

  if (isMongoId) {
    const product = await Product.findById(term);
    return res.status(product ? "200" : "404").json({
      count: product ? [product].length : 0,
      results: product ? [product] : [],
    });
  }

  const regExp = new RegExp(term, "i");

  const products = await Product.find({ name: regExp, status: true });
  return res.status(products ? "200" : "404").json({
    count: products.length,
    results: products,
  });
};

const search = (req = request, res = response) => {
  const { collection, term } = req.params;

  if (!availableCollections.includes(collection)) {
    return res.status(400).json({
      status: "ok",
      error: `Las collections permitidas son: ${availableCollections}`,
    });
  }

  switch (collection) {
    case "categories":
      searchCategories(term, res);
      break;
    case "products":
      searchProducts(term, res);
      break;
    case "users":
      searchUsers(term, res);
      break;
    default:
      res.status(500).json({
        status: "500",
        error: "Me he olvidado de hacer esta búsqueda",
      });
  }

  // res.json({ msg: "Buscar:" + collection + " " + term });
};

module.exports = {
  search,
};
