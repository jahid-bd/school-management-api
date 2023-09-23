const { userControllers } = require('..');
const { updateUserService } = require('../../../../lib/user');

const updateUser = async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await updateUserService(id, req.body);

    const response = {
      code: 200,
      message: 'User updated successfully',
      data: { ...user },
      links: {
        self: req.path,
      },
    };

    res.status(200).json(response);
  } catch (e) {
    next(e);
  }
};

module.exports = updateUser;
