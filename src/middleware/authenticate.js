const { verifyToken } = require('../lib/token');
const { findUserByEmail } = require('../lib/user');
const { authenticatonError } = require('../utils/error');

const authenticate = async (req, _res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  try {
    const decoded = verifyToken({ token });
    const user = await findUserByEmail(decoded.email);

    if (!user) next(authenticatonError());

    if (user.status !== 'approved') {
      next(authenticatonError(`Your account status is ${user.status}`));
    }

    req.user = { ...user._doc, id: user.id };

    return next();
  } catch (e) {
    next(authenticatonError());
  }
};

module.exports = authenticate;
