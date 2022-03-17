import mongoose from 'mongoose';
const { Schema, Types } = mongoose;

const DomainSchema = new Schema({
  domain: {
    type: String,
    required: true,
    unique: true,
  },
  link: {
    type: String,
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  blacklist: {
    type: Boolean,
    default: false,
  },
  dateCreate: { type: Date, default: Date.now },
  dateUpdate: { type: Date },
  projects: [{ type: Types.ObjectId, ref: 'Project' }],
  traffic: Number,
  organic: Number,
  direct: Number,
  traffic_season: Number,
  project_stage: Number,
  profit_await: Number,
  evaluate_min: Number,
  evaluate_middle: Number,
  evaluate_max: Number,
  IKS: Number,
  effectiveness: Number,
  articles_num: Number,
  index_Y: Number,
  index_G: Number,
  CMS: String,
});

module.exports = mongoose.model('Domain', DomainSchema);
