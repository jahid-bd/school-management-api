const { register } = require('../../../../lib/auth');

const createUser = async (req, res, next) => {
  const { name, email, password, status } = req.body;

  try {
    const user = await register({ name, email, password, status });

    const response = {
      code: 201,
      message: 'User created successfully',
      data: {
        ...user,
      },
      links: {
        self: `/users/${user.id}`,
      },
    };

    res.status(201).json(response);
  } catch (e) {
    next(e);
  }
};

module.exports = createUser;
