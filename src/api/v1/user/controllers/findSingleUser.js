const { findSingleUserService } = require('../../../../lib/user');

const findSingleUser = async (req, res, next) => {
  const id = req.params.id;

  try {
    const user = await findSingleUserService({ id });

    const response = {
      data: {
        ...user,
      },
      links: {
        self: req.path,
      },
    };

    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};

module.exports = findSingleUser;
