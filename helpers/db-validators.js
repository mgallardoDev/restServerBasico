const Role = require("../models");
const User = require("../models");
const {Category }= require("../models");

const isRoleValid = async (role = "") => {
  if (role !== "") {
    const existeRol = await Role.findOne({ role });
    if (!existeRol)
      throw new Error(`El rol ${role} no está registrado en la base de datos`);
  }
};

const isEmailAvailable = async (email) => {
  const userByEmail = await User.findOne({ email });
  if (userByEmail)
    throw new Error(`El usuario ya está registrado en la base de datos`);
};

const idExistsInDB = async (id, model) => {
  const checked = await model.findById(id);
  if (!checked) throw new Error(`El id ${id} no existe en la base de datos`);
};

const fieldValueExistsInDB = async (field, value, model) => {
  const checked = await model.findOne({ [field]: value});
  if (checked) throw new Error(`El ${field} ${value} ya existe en la base de datos`);
};

const idStatus = async (id, model) => {
  const checked = await model.findById(id);
  if (checked.status == false) { 
    throw new Error ("El elemento ya ha sido eliminado de la base de datos")
  }
}


module.exports = {
  isRoleValid,
  isEmailAvailable,
  idExistsInDB,
  idStatus,
  fieldValueExistsInDB
};
