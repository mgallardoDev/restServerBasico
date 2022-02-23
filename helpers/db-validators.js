const Role = require("../models/role");
const usuario = require("../models/usuario");

const isRoleValid = async (role = "") => {
  if (role !== "") {
    const existeRol = await Role.findOne({ role });
    if (!existeRol)
      throw new Error(`El rol ${role} no está registrado en la base de datos`);
  }
};

const isEmailAvailable = async (email) => {
  const userByEmail = await usuario.findOne({ email });
  if (userByEmail)
    throw new Error(`El usuario ya está registrado en la base de datos`);
};

const idExistsInDB = async (id, model) => {
  const checked = await model.findById(id);
  if (!checked) throw new Error(`El id ${id} no existe en la base de datos`);
};

const idState = async (id, model) => {
  const checked = await model.findById(id);
  if (checked.state == false) { 
    throw new Error ("El elemento ya ha sido eliminado de la base de datos")
  }
}
module.exports = {
  isRoleValid,
  isEmailAvailable,
  idExistsInDB,
  idState
};
