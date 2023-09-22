const {
  findAllCourseService,
  courseCountService,
} = require('../../../../lib/course');
const query = require('../../../../utils/query');

const findAllCourse = async (req, res, next) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 10;
  const sortType = req.query.sort_type || 'dsc';
  const sortBy = req.query.sort_by || 'updatedAt';
  const search = req.query.search || '';

  try {
    const data = await findAllCourseService({
      page,
      limit,
      sortType,
      sortBy,
      search,
    });

    // pagination
    const totalItems = await courseCountService({ search });
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
  } catch (e) {
    next(e);
  }
};

module.exports = findAllCourse;
