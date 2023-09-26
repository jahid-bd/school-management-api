const { removeClassService } = require('../../../../lib/class');

const removeClass = async (req, res, next) => {
  const id = req.params.id;

  try {
    await removeClassService({ id });
    res.status(204).json({ message: 'Class deleted successfully' });
  } catch (err) {
    next(err);
  }
};

module.exports = removeClass;
