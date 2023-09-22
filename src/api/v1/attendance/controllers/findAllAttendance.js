const {
  findAllAttendanceService,
  attendanceCountService,
} = require('../../../../lib/attendance');

const query = require('../../../../utils/query');

const findAllAttendance = async (req, res, next) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 10;
  const sortType = req.query.sort_type || 'dsc';
  const sortBy = req.query.sort_by || 'updatedAt';
  const search = req.query.search || '';
  const class_id = req.query.class_id || '';
  const student_id = req.query.student_id || '';
  const date = req.query.date || '';

  try {
    // find
    const data = await findAllAttendanceService({
      class_id,
      student_id,
      date,
      page,
      limit,
      sortType,
      sortBy,
      search,
    });

    // pagination
    const totalItems = await attendanceCountService({ search });
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

module.exports = findAllAttendance;
