const { Schema, model } = require('mongoose');

const attendanceSchema = new Schema(
  {
    name: String,
    date: Date,
    status: {
      type: String,
      enum: ['present', 'absent', 'late'],
    },
    class_id: {
      type: Schema.ObjectId,
      ref: 'Class',
    },
    student_id: {
      type: Schema.ObjectId,
      ref: 'Student',
    },
  },
  { timestamps: true, id: true }
);

const Attendance = model('Attendance', attendanceSchema);

module.exports = Attendance;
