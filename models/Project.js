import mongoose from 'mongoose';
const { Schema, Types } = mongoose;

const ProjectSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  keywords: [
    {
      type: String,
    },
  ],
  keywordsCount: {
    type: Number,
  },
  count: {
    type: Number,
    required: true,
    default: 3,
  },
  profitPerVisitor: {
    type: Number,
    required: true,
    default: 0.1,
  },
  //stage 6 - умирание, 10 - пик, 12 - стагнация, 18 - growth
  project_stage: {
    type: String,
    default: 6,
  },
  date: { type: Date, default: Date.now },
  dateUpdate: { type: Date },
  status: String,
  owner: { type: Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Project', ProjectSchema);
