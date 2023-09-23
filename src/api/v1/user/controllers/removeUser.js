const { removeUserService } = require('../../../../lib/user');

const removeUser = async (req, res, next) => {
  const id = req.params.id;

  try {
    await removeUserService({ id });

    res.status(204).json({ message: 'User deleted successfully' });
  } catch (err) {
    next(err);
  }
};

module.exports = removeUser;
