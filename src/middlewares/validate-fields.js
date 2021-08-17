const { validationResult } = require("express-validator");

const validateFields = (req, res, next) => {
  //validationResult procesa los resultados del middleware de express-validator
  const errors = validationResult(req);

  //isEmpty verifica que erroes este vacio
  if (!errors.isEmpty()) {
    //mapped retorna los erroes ordenadamente
    return res.status(400).json({ ok: false, errors: errors.mapped() });
  }

  next();
};

module.exports = { validateFields };
