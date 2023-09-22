const {
  findAllStudentService,
  studentCountService,
} = require('../../../../lib/student');
const query = require('../../../../utils/query');

const findAllAttendance = async (req, res, next) => {
  const { class_id, student_id, date } = req.query;

  try {
    // find
    const attendance = await findAllAttendanceService({
      class_id,
      student_id,
      date,
    });

    // pagination
    const totalItems = await studentCountService({ search });
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
