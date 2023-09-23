const {
  userCountService,
  findAllUserService,
} = require('../../../../lib/user');

const query = require('../../../../utils/query');

const findAllUser = async (req, res, next) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 10;
  const sortType = req.query.sort_type || 'dsc';
  const sortBy = req.query.sort_by || 'updatedAt';
  const search = req.query.search || '';

  try {
    // find
    const data = await findAllUserService({
      page,
      limit,
      sortType,
      sortBy,
      search,
    });

    // pagination
    const totalItems = await userCountService({ search });
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

module.exports = findAllUser;
