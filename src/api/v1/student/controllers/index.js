const createStudent = require('./createStudent');
const findAllStudent = require('./findAllStudent');
const findSingleStudent = require('./findSingleStudent');
const removeStudent = require('./removeStudent');
const updateStudent = require('./updateStudent');
const updateStudentPatch = require('./updateStudentPatch');

module.exports = {
  createStudent,
  findAllStudent,
  removeStudent,
  findSingleStudent,
  updateStudent,
  updateStudentPatch,
};
