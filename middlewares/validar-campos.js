const { validationResult } = require("express-validator");


const validarCampos = (req, response, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return response
      .status(400)
      .json( errors );
    }
    
    next();
};

module.exports = {
  validarCampos,
};
