const {
  findAllTeacherService,
  teacherCountService,
} = require('../../../../lib/Teacher');
const query = require('../../../../utils/query');

const findAllTeacher = async (req, res, next) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 10;
  const sortType = req.query.sort_type || 'dsc';
  const sortBy = req.query.sort_by || 'updatedAt';
  const search = req.query.search || '';

  try {
    // find
    const teachers = await findAllTeacherService({
      page,
      limit,
      sortType,
      sortBy,
      search,
    });

    // data transformation
    const data = query.getTransformedItems({
      items: teachers,
      path: '/teachers',
      selection: [
        '_id',
        'name',
        'photo',
        'user_id',
        'class_id',
        'joining_date',
        'createdAt',
        'updatedAt',
      ],
    });

    // pagination
    const totalItems = await teacherCountService({ search });
    const pagination = query.getPagination({ limit, page, totalItems });

    // HEATOAS links
    const links = query.getHATEOASForAllItems({
      url: req.url,
      path: req.path,
      query: req.query,
      hasNext: !!pagination.next,
      hasPrev: !!pagination.prev,
      page,
    });

    res.status(200).json({ data, pagination, links });
  } catch (err) {
    next(err);
  }
};

module.exports = findAllTeacher;
