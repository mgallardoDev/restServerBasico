const { Schema, model } = require("mongoose");

const UserSchema = Schema({
  nombre: {
    type: String,
    required: [true, "El nombre es obligatorio"],
  },

  email: {
    type: String,
    required: [true, "El correo es obligatorio"],
    unique: true,
  },

  password: {
    type: String,
    required: [true, "La contraseña es obligatoria"],
  },

  img: {
    type: String,
  },

  role: {
    type: String,
    required: true,
    enum: ["ADMIN_ROLE", "USER_ROLE"],
  },

  status: {
    type: Boolean,
    default: true,
  },

  google: {
    type: Boolean,
    default: false,
  },

  uid: {
    type: String,
    
  }
});

UserSchema.methods.toJSON = function () {
  const { __v, password, _id, ...user } = this.toObject();
  return { uid: _id, ...user};
}

module.exports = model('User', UserSchema)
