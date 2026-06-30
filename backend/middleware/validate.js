const { check, body, validationResult } = require('express-validator');

const validate = (method) => {
  switch (method) {
    case 'register': {
      return [
        body('nombre', 'El nombre es obligatorio').exists(),
        body('apellido', 'El apellido es obligatorio').exists(),
        body('email', 'El email es obligatorio y debe ser válido').exists().isEmail(),
        body('password', 'La contraseña es obligatoria y debe tener al menos 8 caracteres').exists().isLength({ min: 8 }),
      ];
    }
    case 'login': {
      return [
        body('email', 'El email es obligatorio y debe ser válido').exists().isEmail(),
        body('password', 'La contraseña es obligatoria').exists(),
      ];
    }
    default:
      return [];
  }
};

const validateResult = (req, res, next) => {
  try {
    validationResult(req).throw();
    return next();
  } catch (err) {
    return res.status(400).json({ errors: err.array() });
  }
};

module.exports = { validate, validateResult };