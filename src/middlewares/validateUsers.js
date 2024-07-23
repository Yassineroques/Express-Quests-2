const Joi = require("joi");

const userSchema = Joi.object({
    email: Joi.string().email().max(255).required(),
    firstname: Joi.string().max(255).required(),
    lastname: Joi.string().max(255).required(),
    hashPassword: Joi.string().max(255).required(),
  });
  
  const validateUsers = (req, res, next) => {
    const { firstname, lastname, email, hashPassword } = req.body;
  
    const { error } = userSchema.validate(
      { firstname, lastname, email, hashPassword },
      { abortEarly: false }
    );
  
    if (error) {
      res.status(422).json({ validationErrors: error.details });
    } else {
      next();
    }
  };

  module.exports = validateUsers;