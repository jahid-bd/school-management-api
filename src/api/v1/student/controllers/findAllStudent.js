const { findAllStudentService } = require('../../../../lib/student');

const findAllStudent = async (req, res, next) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 10;
  const sortType = req.query.sort_type || 'dsc';
  const sortBy = req.query.sort_by || 'updatedAt';
  const search = req.query.search || '';

  try {
    const students = await findAllStudentService({
      page,
      limit,
      sortType,
      sortBy,
      search,
    });

    res.status(200).json(students);
  } catch (err) {
    next(err);
  }
};

module.exports = findAllStudent;
