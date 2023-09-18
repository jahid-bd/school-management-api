const authService = require('../../../../lib/auth');
const { generateToken } = require('../../../../lib/token');

const register = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    const user = await authService.register({ name, email, password });

    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
    };

    const accessToken = generateToken({ payload });

    const response = {
      code: 201,
      message: 'Register Successful',
      data: {
        access_token: accessToken,
      },
      links: {
        self: req.url,
        login: 'auth/login',
      },
    };

    res.status(201).json(response);
  } catch (err) {
    next(err);
  }
};

module.exports = register;
