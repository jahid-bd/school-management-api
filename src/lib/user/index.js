const { User } = require('../../model');
const { badRequest, notFoundError } = require('../../utils/error');

const findUserByEmail = async (email) => {
  const user = await User.findOne({ email });
  return user ? user : false;
};

const findUserById = async (id) => {
  const user = await User.findById(id);
  return user ? user : false;
};

const userExist = async (email) => {
  const user = await findUserByEmail(email);
  return user ? true : false;
};

const createUser = async ({ name, email, password, status = 'pending' }) => {
  if (!name || !email || !password) throw badRequest('Invalid parameters');

  const user = new User({ name, email, password, status });

  await user.save();

  return { ...user._doc, id: user.id };
};

const findAllUserService = async ({
  page,
  limit,
  sortType,
  sortBy,
  search,
}) => {
  const sortStr = `${sortType === 'dsc' ? '-' : ''}${sortBy}`;
  const filter = {
    name: { $regex: search, $options: 'i' },
  };

  return User.find(filter)
    .sort(sortStr)
    .skip(page * limit - limit)
    .limit(limit);
};

const userCountService = ({ search }) => {
  const fileter = {
    name: { $regex: search, $options: 'i' },
  };

  return User.count(fileter);
};

const findSingleUserService = async ({ id }) => {
  const user = await User.findById(id);

  if (!user) {
    throw notFoundError();
  }

  return user._doc;
};

const removeUserService = async ({ id }) => {
  const user = await User.findById(id);

  if (!user) {
    throw notFoundError();
  }

  return User.findByIdAndDelete(id);
};

const updateUserService = async (id, { name, email, password, status }) => {
  const user = await User.findById(id);

  if (!user) {
    throw notFoundError();
  }

  const payload = {
    name,
    email,
    password,
    status,
  };

  Object.keys(payload).forEach((key) => {
    user[key] = payload[key] ?? user[key];
  });

  await user.save();

  return user._doc;
};

module.exports = {
  findUserByEmail,
  userExist,
  createUser,
  findAllUserService,
  userCountService,
  findSingleUserService,
  removeUserService,
  updateUserService,
  findUserById,
};
