const { Schema, model } = require('mongoose');

const studentSchema = new Schema(
  {
    name: String,
    photo: String,
    bio: String,
    user_id: {
      type: Schema.ObjectId,
      ref: 'User',
    },
    class_id: {
      type: Schema.ObjectId,
      ref: 'Class',
    },
    enrollment_status: {
      type: String,
      enum: ['active', 'inactive', 'graduated'],
      default: 'active',
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'others'],
    },
    courses: [{ type: Schema.ObjectId, ref: 'Course' }],
    father_name: String,
    mother_name: String,
    birth: Date,
    religion: String,
    class_roll: Number,
    address: String,
    phone: String,
  },
  { timestamps: true, id: true }
);

const Student = model('Student', studentSchema);

module.exports = Student;
