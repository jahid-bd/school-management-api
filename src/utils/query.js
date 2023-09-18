const getTransformedItems = ({ items = [], selection = [], path = '/' }) => {
  if (!Array.isArray(items) || !Array.isArray(selection)) {
    throw new error('Invalid Selection');
  }

  if (selection.length === 0) {
    return items.map((item) => ({
      ...item,
      link: `${path}/${item.id}`,
    }));
  }

  return items.map((item) => {
    const result = {};
    selection.forEach((key) => {
      result[key] = item[key];
    });
    result.link = `${path}/${item.id}`;

    return result;
  });
};

const getPagination = ({ limit, totalItems, page }) => {
  const totalPage = Math.ceil(totalItems / limit);

  const pagination = {
    page,
    limit,
    totalPage,
    totalItems,
  };

  if (page < totalPage) {
    pagination.next = page + 1;
  }

  if (page > 1) {
    pagination.prev = page - 1;
  }

  return pagination;
};

const generateQueryString = (query) => {
  return Object.keys(query)
    .map(
      (key) => encodeURIComponent(key) + '=' + encodeURIComponent(query[key])
    )
    .join('&');
};

const getHATEOASForAllItems = ({
  url = '/',
  path = '',
  hasNext = false,
  hasPrev = false,
  query = {},
  page = 1,
}) => {
  const links = {
    self: url,
  };

  if (hasNext) {
    const queryStr = generateQueryString({
      ...query,
      page: page + 1,
    });

    links.next = `${path}?${queryStr}`;
  }

  if (hasPrev) {
    const queryStr = generateQueryString({
      ...query,
      page: page - 1,
    });

    links.prev = `${path}?${queryStr}`;
  }

  return links;
};

module.exports = {
  getTransformedItems,
  getPagination,
  getHATEOASForAllItems,
};
