const createAttendance = require('./createAttendance');
const findAllAttendance = require('./findAllAttendance');
const findSingleAttendance = require('./findSingleAttendance');
const removeAttendance = require('./removeAttendance');
const updateAttendance = require('./updateAttendance');

module.exports = {
  createAttendance,
  removeAttendance,
  updateAttendance,
  findSingleAttendance,
  findAllAttendance,
};
