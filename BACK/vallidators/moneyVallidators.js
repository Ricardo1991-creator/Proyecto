const Joi = require("@hapi/joi");
const { generateError } = require("../helpers");

// Valida nueva entrada en el diario
const newEntrySchema = Joi.object().keys({
  price: Joi.string()
    .min(3)
    .max(100)
    .required()
    .error(
      generateError(
        "El campo price debe existir y ser mayor de 2 caracteres",
        400
      )
    ),
  locate: Joi.string().max(10000).required(),
  money_type: Joi.string().max(1000).required(),
  money_country: Joi.string().max(10000).required(),
  coments: Joi.string().max(10000).required(),
});

const editEntrySchema = Joi.object().keys({
  price: Joi.string()
    .min(3)
    .max(100)
    .required()
    .error(
      generateError(
        "El campo price debe existir y ser mayor de 2 caracteres",
        400
      )
    ),

  locate: Joi.string()
    .max(1000)
    .required()
    .error(generateError("El campo locate debe existir", 400)),
  money_type: Joi.string().max(1000).required(),
  money_country: Joi.string().max(10000).required(),

  coments: Joi.string()
    .max(10000)
    .required()
    .error(
      generateError(
        "El campo comments debe existir y ser menos de 10000 caracteres",
        400
      )
    ),
});

module.exports = {
  newEntrySchema,
  editEntrySchema,
};
