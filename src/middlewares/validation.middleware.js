const { z } = require('zod');

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters long'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);
  if (!result.success) {

    console.log(`result is ${result.error}`);

    return res.status(400).json({
      errors: result.error.format()
    });
  }
  next();
};

module.exports = {
  registerValidation: validate(registerSchema),
  loginValidation: validate(loginSchema),
};
