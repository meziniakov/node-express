import mongoose from 'mongoose';
const { Schema, Types } = mongoose;

const ProjectSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  keyword: {
    type: String,
    required: true,
  },
  count: {
    type: String,
    required: true,
    default: 3,
  },
  date: { type: Date, default: Date.now },
  owner: { type: Types.ObjectId, ref: 'User' },
  // domains: { type: Types.ObjectId, ref: 'Domain' },
});

module.exports = mongoose.model('Project', ProjectSchema);
